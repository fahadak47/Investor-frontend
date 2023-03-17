import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  Form,
  ModalHeader,
  FormControl,
  FormLabel,
  FormGroup,
  Card,
  ProgressBar,
  InputGroup,
} from "react-bootstrap";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyVideoUrlApi } from "../../api/companyApis/companyVideosApi";
import TopSection from "../../component/Common/TopSection";
import VideoCard from "../../component/VideoCard/VideoCard";
import { getVideosHandle } from "../../redux/actions/CompayVideoActions";
import { PROGRESS_UPLOADING_VIDEO } from "../../redux/constants/presentation_progress_constant";
import { generateFilePath } from "../../utility/GenerateFIlePath";
import { Uploader } from "../../utility/Uploader";
import VideosComponent from "./VideosComponent";

const PresentationMedia = () => {
  const iscompayLevelTwo = JSON.parse(
    localStorage.getItem("IP_levelTwoProfileStatus")
  );

  const dispatch = useDispatch();
  let isDisabled = false;
  const { ProgressVideoUpload } = useSelector(
    (state) => state.PresentationProgressReducer
  );
  const { videos, isVideoLoadig, videoError } = useSelector(
    (state) => state.videoReducer
  );

  const [videoUrl, setVideoUrl] = useState(null),
    [isVideoOpen, setIsVideoOpen] = useState(false),
    [isOpen, setIsOpen] = useState(false),
    [formData, setFormData] = useState(null);

  const [isdisabled, setIsdisabled] = useState(false);
  const [uploader, setUploader] = useState(undefined);
  const [formError, setFormError] = useState({
    presentationTitle: null,
    presentationVideo: null,
    presentationThumbnail: null,
    isActive: false,
  });

  const imageInputRef = React.useRef();
  const videoInputRef = React.useRef();

  // State for Validation
  const [errors, setError] = useState(null);

  const handleValidtion = () => {
    if (
      !formData?.presentationThumbnail ||
      !formData?.presentationTitle ||
      !formData?.presentationVideo
    ) {
      return (isDisabled = true);
    } else if (
      formError?.presentationThumbnail ||
      formError?.presentationTitle ||
      formError?.presentationVideo
    ) {
      return (isDisabled = true);
    } else {
      return (isDisabled = false);
    }
  };

  const handleErrorChange = (e) => {
    const { name } = e.target;
    if (name === "presentationTitle") {
    }
    if (name === "presentationVideo") {
      let fileVideo = e.target.files[0];
      if (fileVideo !== undefined) {
        const fileExtension = fileVideo.type.split("/")[0];
        if (fileExtension !== "video") {
          setFormError({
            ...formError,
            presentationVideo: "file type must be video",
          });
        } else {
          setFormError({
            ...formError,
            presentationVideo: null,
          });
        }
      }
    }

    if (name === "presentationThumbnail") {
      let fileImage = e.target.files[0];
      if (fileImage !== undefined) {
        const fileExtension = fileImage.type.split("/")[0];
        if (fileExtension !== "image") {
          setFormError({
            ...formError,
            presentationThumbnail: "file type must be Image",
          });
        } else {
          setFormError({
            ...formError,
            presentationThumbnail: null,
          });
        }
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.files) {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleVideoToggle = () => setIsVideoOpen((prev) => !prev);

  const uploadFile = () => {
    if (formData.presentationVideo) {
      const videoUploaderOptions = {
        fileName: generateFilePath(formData.presentationVideo, "dev-video"),
        file: formData.presentationVideo,
        // chunkSize: 1024 * 1024 * 3,
        setIsOpen,
        title: formData?.presentationTitle,
        thumbnail: formData?.presentationThumbnail,
        isActive: formData?.isActive || false,
        isLevelTwo: iscompayLevelTwo ? true : formData?.isLevelTwo,
      };

      let percentage = undefined;
      handleToggle();

      const uploader = new Uploader(videoUploaderOptions);

      console.log("UPLOADER LOG FORM USEEFFECT", uploader);
      setUploader(uploader);

      uploader
        .onProgress(({ percentage: newPercentage }) => {
          // to avoid the same percentage to be logged twice
          if (newPercentage !== percentage) {
            percentage = newPercentage;
            dispatch({
              type: PROGRESS_UPLOADING_VIDEO,
              payload: percentage,
            });
            console.log(`${percentage}%`);
            if (percentage == 100) {
              // getVideosHandle(dispatch);
              setTimeout(function () {
                dispatch({
                  type: PROGRESS_UPLOADING_VIDEO,
                  payload: null,
                });
              }, 3000);
              percentage = undefined;
            }
          }
        })
        .onError((error) => {
          console.error("Uploader ERROR LOG", error);
        });

      uploader.start();
    }
  };

  const onCancel = () => {
    if (uploader) {
      uploader.abort();
    }
  };
  handleValidtion();

  // const handleVideoUrl = (id) => {
  //   getCompanyVideoUrlApi(id)
  //     .then((res) => {
  //       setVideoUrl(res.data.data[0]);
  //       handleVideoToggle();
  //     })
  //     .catch((error) => console.log("get video url", error.response));
  // };

  useEffect(() => {
    getVideosHandle(dispatch);
  }, [isOpen]);

  return (
    <>
      <Row className="my-3">
        <h2 style={{ fontFamily: "poppins", fontWeight: "bold" }}>
          Video Library
        </h2>
      </Row>
      <div style={{ color: "black" }} className="">
        <div
          className="blue_right_Border p-3"
          style={{ backgroundColor: "white" }}
        >
          <Row className="mb-3">
            <span>
              <h3 style={{ fontFamily: "poppins", fontWeight: "bold" }}>
                Upload Video
              </h3>
            </span>

            <Col>
              <div className="my-2">
                <ProgressBar
                  now={ProgressVideoUpload}
                  label={`${ProgressVideoUpload}%`}
                />
              </div>

              <div
                className="d-flex justify-content-end"
                style={{ gap: "2rem", position: "relative", top: "1rem" }}
              >
                <Button
                  style={{ backgroundColor: "rgb(0, 7, 61)" }}
                  onClick={handleToggle}
                >
                  Upload
                </Button>
                <Button
                  style={{ backgroundColor: "rgb(0, 7, 61)" }}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* video Detail compoenet  */}

        <div
          className="blue_right_Border p-3"
          style={{ backgroundColor: "white", marginTop: "2rem" }}
        >
          {videos && <VideosComponent videos={videos} />}
        </div>

        {/* video Detail compoenet  */}

        {/* Modal for Uploading Video Presentation  */}
        <Modal show={isOpen} onHide={handleToggle}>
          <ModalHeader closeButton>Upload Your Video Presentation</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup className="mb-2">
                <FormLabel htmlFor="presentationTitle">
                  Title (e.g jpg, jpeg)
                </FormLabel>
                <FormControl
                  type="text"
                  name="presentationTitle"
                  id="presentationTitle"
                  maxLength={100}
                  onChange={(e) => {
                    handleChange(e);
                    handleErrorChange(e);
                  }}
                />
                {formError.presentationTitle && (
                  <p>{formError.presentationTitle}</p>
                )}
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel htmlFor="presentationThumbnail">
                  Thumbnail (e.g jpg, jpeg)
                </FormLabel>

                <InputGroup className="mb-3">
                  <FormControl
                    type="file"
                    name="presentationThumbnail"
                    id="presentationThumbnail"
                    accept="image/*"
                    ref={imageInputRef}
                    onChange={(e) => {
                      handleChange(e);
                      handleErrorChange(e);
                    }}
                  />
                  {formData?.presentationThumbnail && (
                    <InputGroup.Text>
                      <span
                        onClick={() => {
                          imageInputRef.current.value = "";
                          setFormData({
                            ...formData,
                            presentationThumbnail: null,
                          });
                        }}
                      >
                        ✖
                      </span>
                    </InputGroup.Text>
                  )}
                </InputGroup>
                {formError.presentationThumbnail && (
                  <p
                    style={{
                      fontSize: 17,
                      color: "red",
                      margin: "4px 0 4px 0",
                    }}
                  >
                    {formError.presentationThumbnail}
                  </p>
                )}
              </FormGroup>

              <FormGroup className="mb-2">
                <FormLabel htmlFor="presentationVideo">
                  Video (e.g MP4, MOV)
                </FormLabel>
                <InputGroup>
                  <FormControl
                    type="file"
                    name="presentationVideo"
                    id="presentationVideo"
                    accept="video/*"
                    ref={videoInputRef}
                    onChange={(e) => {
                      handleChange(e);
                      handleErrorChange(e);
                    }}
                  />
                  {formData?.presentationVideo && (
                    <InputGroup.Text>
                      <span
                        onClick={() => {
                          videoInputRef.current.value = "";
                          setFormData({
                            ...formData,
                            presentationVideo: null,
                          });
                        }}
                      >
                        ✖
                      </span>
                    </InputGroup.Text>
                  )}
                </InputGroup>
                {formError.presentationVideo && (
                  <p
                    style={{
                      fontSize: 17,
                      color: "red",
                      margin: "4px 0 4px 0",
                    }}
                  >
                    {formError.presentationVideo}
                  </p>
                )}
              </FormGroup>
              <FormGroup>
                <Form.Check
                  type={"checkbox"}
                  label="Active Video"
                  id="presentatio-checkbox"
                  value={formData?.isActive}
                  onChange={(e) => {
                    setFormData({ ...formData, isActive: e.target.checked });
                  }}
                />
              </FormGroup>

              {console.log(iscompayLevelTwo)}
              {!iscompayLevelTwo ? (
                <FormGroup>
                  <Form.Check
                    type={"checkbox"}
                    label="Show Video to level two profile"
                    id="presentatio-checkbox12"
                    value={formData?.isLevelTwo}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        isLevelTwo: e.target.checked,
                      });
                    }}
                  />
                </FormGroup>
              ) : (
                <p style={{ color: "red" }}>
                  Note: Video is only visible to level 2 users
                </p>
              )}
            </Form>
          </ModalBody>
          <Modal.Footer>
            <Button
              variant={isDisabled ? "secondary" : "primary"}
              disabled={isDisabled}
              onClick={() => {
                uploadFile();
              }}
            >
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End Modal for Uploading Video Presentation  */}
      </div>
    </>
  );
};

export default PresentationMedia;
