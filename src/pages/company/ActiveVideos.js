import React from "react";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import {
  ActiveCompanyVideoViewCountApi,
  getActiveCompanyVideoUrlApi,
} from "../../api/companyApis/companyVideosApi";
import VideoCard from "../../component/VideoCard/VideoCard";

export const ActiveVideos = () => {
  const { videos, isVideoLoadig, videoError } = useSelector(
    (state) => state.videoReducer
  );

  const [videoUrl, setVideoUrl] = useState(null),
    [isVideoOpen, setIsVideoOpen] = useState(false);

  console.log("Active video", videos, videoUrl);

  const handleVideoToggle = () => setIsVideoOpen((prev) => !prev);

  const handleVideoUrl = (videoId, companyId) => {
    getActiveCompanyVideoUrlApi(videoId, companyId)
      .then((res) => {
        setVideoUrl({ ...res.data.data[0], videoId, companyId });
        handleVideoToggle();
      })
      .catch((error) => console.log("get video url", error.response));
  };

  const handleVideoCount = (videoId, companyId) => {
    ActiveCompanyVideoViewCountApi(videoId, companyId)
      .then((res) => console.log(res))
      .catch((error) => console.log(error.response));
  };

  if (isVideoLoadig) {
    return (
      <>
        <div className="container">
          <div className="main-body">
            <Spinner animation="grow" size="lg" variant="primary" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      {videos ? (
        <>
          {videos.length !== 0 ? (
            <>
              <div className=" video_card_wrapper">
                {videos?.map((val, ind) => {
                  return (
                    <VideoCard
                      thumbnail={val?.thumbnail}
                      title={val.title}
                      active={val?.is_active}
                      views={val?.total_view_count}
                      onClick={() => handleVideoUrl(val.id, val?.company_id)}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="container">
                <div className="main-body">
                  <h2>No Videos yets!</h2>
                </div>
              </div>
            </>
          )}
        </>
      ) : null}

      <Modal show={isVideoOpen} onHide={handleVideoToggle}>
        <ModalHeader closeButton>{videoUrl?.title}</ModalHeader>
        <ModalBody>
          <ReactPlayer
            url={videoUrl?.presignedUrl}
            controls
            // light
            width={"100%"}
            onPlay={() =>
              handleVideoCount(videoUrl?.videoId, videoUrl?.companyId)
            }
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ActiveVideos;
