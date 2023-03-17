import { apiHandle } from "../api/apiHandler";
import { dataWithFiles } from "../helper/common_functions";
import {
  displaySuccessToast,
  displayWorrningToast,
} from "../helper/toast_notification_function";

// original source: https://github.com/pilovm/multithreaded-uploader/blob/master/frontend/uploader.js
export class Uploader {
  constructor(options) {
    console.log("Option log in", options);
    // this must be bigger than or equal to 5MB,
    // otherwise AWS will respond with:
    // "Your proposed upload is smaller than the minimum allowed size"
    this.chunkSize = options.chunkSize || 1024 * 1024 * 5;
    // number of parallel uploads
    this.threadsQuantity = Math.min(options.threadsQuantity || 5, 15);
    this.file = options.file;
    this.isActive = options.isActive;
    this.isLevelTwo = options.isLevelTwo;
    this.videoTitle = options.title;
    this.thumbnail = options.thumbnail;
    this.fileName = options.fileName;
    this.aborted = false;
    this.uploadedSize = 0;
    this.progressCache = {};
    this.activeConnections = {};
    this.parts = [];
    this.uploadedParts = [];
    this.fileId = null;
    this.fileKey = null;
    this.onProgressFn = () => {};
    this.onErrorFn = () => {};
    // this function is for toggle Modal
    this.handleToggle = options.setIsOpen;
    this.dispatch = options.dispatch;
  }

  start() {
    this.initialize();
  }

  async initialize() {
    try {
      this.handleToggle();
      // adding the the file extension (if present) to fileName
      let fileName = this.fileName;
      const ext = this.file.name.split(".").pop();
      if (ext) {
        fileName += `.${ext}`;
      }

      // initializing the multipart request
      const videoInitializationUploadInput = {
        name: fileName,
        is_active: false,
      };

      const initializeReponse = await apiHandle().post(
        `/company/auth/presentation/video/initializeMultipartUpload`,
        videoInitializationUploadInput
      );
      //  api.request({
      //   url: "/co/presentationVideo/initializeMultipartUpload",
      //   method: "POST",
      //   data: videoInitializationUploadInput,
      // });

      console.log(
        "INITIALIZE RESPONSE LOG",
        initializeReponse.data?.message[0]
      );
      if (!initializeReponse.data?.success) {
        displayWorrningToast(initializeReponse.data?.message[0]);
      }

      const AWSFileDataOutput = initializeReponse.data.data[0];

      this.fileId = AWSFileDataOutput.fileId;
      this.fileKey = AWSFileDataOutput.fileKey;

      // retrieving the pre-signed URLs
      const numberOfparts = Math.ceil(this.file.size / this.chunkSize);

      const AWSMultipartFileDataInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: numberOfparts,
      };

      const urlsResponse = await apiHandle().post(
        `/company/auth/presentation/video/getMultipartPreSignedUrls`,
        AWSMultipartFileDataInput
      );

      // await api.request({
      //   url: "/presentationVideo/getMultipartPreSignedUrls",
      //   method: "POST",
      //   data: AWSMultipartFileDataInput,
      // });

      console.log("GET SIGNED URLS", urlsResponse.data.data);

      const newParts = urlsResponse.data.data;
      this.parts.push(...newParts);
      this.threadsQuantity = newParts.length;

      this.sendNext();
    } catch (error) {
      await this.complete(error);
    }
  }

  sendNext() {
    const activeConnections = Object.keys(this.activeConnections).length;
    console.log(
      "ACTIVE CONNECTIONS",
      this.activeConnections,
      this.threadsQuantity
    );

    if (activeConnections >= this.threadsQuantity) {
      return;
    }

    if (!this.parts.length) {
      if (!activeConnections) {
        this.complete();
      }

      return;
    }

    const part = this.parts.pop();
    if (this.file && part) {
      const sentSize = (part.PartNumber - 1) * this.chunkSize;
      const chunk = this.file.slice(sentSize, sentSize + this.chunkSize);

      console.log("sentSiz and Chunk Size", sentSize, chunk);

      const sendChunkStarted = () => {
        this.sendNext();
      };

      this.sendChunk(chunk, part, sendChunkStarted)
        .then(() => {
          this.sendNext();
        })
        .catch((error) => {
          this.parts.push(part);

          this.complete(error);
        });
    }
  }

  async complete(error) {
    if (error && !this.aborted) {
      this.onErrorFn(error);
      return;
    }

    if (error) {
      this.onErrorFn(error);
      return;
    }

    try {
      await this.sendCompleteRequest();
    } catch (error) {
      this.onErrorFn(error);
    }
  }

  async sendCompleteRequest() {
    if (this.fileId && this.fileKey) {
      const videoFinalizationMultiPartInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: JSON.stringify(this.uploadedParts),
        title: this.videoTitle,
        isActive: this.isActive,
        isLevelTwo: this.isLevelTwo || false,
        thumbnail: this.thumbnail,
      };

      console.log(
        "Send Complete Request function runs",
        videoFinalizationMultiPartInput
      );

      console.log(
        ".....Final object multipart ......",
        dataWithFiles(videoFinalizationMultiPartInput)
      );
      const fin = await apiHandle(true, true).post(
        "/company/auth/presentation/video/finalizeMultipartUpload",
        dataWithFiles(videoFinalizationMultiPartInput)
      );

      if (fin.data.success) {
        displaySuccessToast(fin.data.message[0]);
        this.handleToggle(false);
      }
      // await api.request({
      //   url: "/presentationVideo/finalizeMultipartUpload",
      //   method: "POST",
      //   data: videoFinalizationMultiPartInput,
      // });
    }
  }

  sendChunk(chunk, part, sendChunkStarted) {
    return new Promise((resolve, reject) => {
      this.upload(chunk, part, sendChunkStarted)
        .then((status) => {
          console.log("FUNTION LOG IN UPLOAD CALL back status", status);
          if (status !== 200) {
            reject(new Error("Failed chunk upload"));
            return;
          }

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  handleProgress(part, event) {
    if (this.file) {
      if (
        event.type === "progress" ||
        event.type === "error" ||
        event.type === "abort"
      ) {
        this.progressCache[part] = event.loaded;
      }

      if (event.type === "uploaded") {
        this.uploadedSize += this.progressCache[part] || 0;
        delete this.progressCache[part];
      }

      const inProgress = Object.keys(this.progressCache)
        .map(Number)
        .reduce((memo, id) => (memo += this.progressCache[id]), 0);

      const sent = Math.min(this.uploadedSize + inProgress, this.file.size);

      const total = this.file.size;

      const percentage = Math.round((sent / total) * 100);

      this.onProgressFn({
        sent: sent,
        total: total,
        percentage: percentage,
      });
    }
  }

  upload(file, part, sendChunkStarted) {
    // uploading each part with its pre-signed URL
    return new Promise((resolve, reject) => {
      if (this.fileId && this.fileKey) {
        const xhr = (this.activeConnections[part.PartNumber - 1] =
          new XMLHttpRequest());

        console.log("XHR REQUEST IN UPLOAD FUNTION", xhr);

        sendChunkStarted();

        const progressListener = this.handleProgress.bind(
          this,
          part.PartNumber - 1
        );

        xhr.upload.addEventListener("progress", progressListener);

        xhr.addEventListener("error", progressListener);
        xhr.addEventListener("abort", progressListener);
        xhr.addEventListener("loadend", progressListener);

        xhr.open("PUT", part.signedUrl);

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const ETag = xhr.getResponseHeader("ETag");
            console.log("XHR Responese Etag", ETag);

            if (ETag) {
              const uploadedPart = {
                PartNumber: part.PartNumber,
                ETag: ETag.replaceAll('"', ""),
              };
              console.log("XHR Responese condition", uploadedPart);

              this.uploadedParts.push(uploadedPart);

              resolve(xhr.status);
              delete this.activeConnections[part.PartNumber - 1];
            }
          }
        };

        xhr.onerror = (error) => {
          reject(error);
          delete this.activeConnections[part.PartNumber - 1];
        };

        xhr.onabort = () => {
          reject(new Error("Upload canceled by user"));
          console.log("CONECTIOOOONNNNN ABORT xhrrr ........");
          delete this.activeConnections[part.PartNumber - 1];
        };

        xhr.send(file);
      }
    });
  }

  onProgress(onProgress) {
    this.onProgressFn = onProgress;
    return this;
  }

  onError(onError) {
    this.onErrorFn = onError;
    return this;
  }

  async abort() {
    Object.keys(this.activeConnections)
      .map(Number)
      .forEach((id) => {
        console.log("CONECTIOOOONNNNN ABORT ************** ........");
        this.activeConnections[id].abort();
      });

    let AWSMultipartFileDataAbort = {
      fileId: this.fileId,
      fileKey: this.fileKey,
    };

    await apiHandle().request({
      url: "/company/auth/presentation/video/abortMultipartUpload",
      method: "POST",
      data: AWSMultipartFileDataAbort,
    });

    this.aborted = true;
  }
}
