import { message } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "react-bootstrap";
import { FormLabel } from "react-bootstrap/esm";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { VideoViewByIdApi } from "../../api/companyApis/analyticsApi";
import { GetCompanyProfileApi } from "../../api/companyApis/CompanyProfileApis";
import {
  deleteCompanyVideoApi,
  getCompanyVideoUrlApi,
  UpdateCompanyVideoApi,
} from "../../api/companyApis/companyVideosApi";
import VideoViewsByIdChart from "../../component/charts/VideoViewsByIdChart";
import UsersWithVideoViews from "../../component/data Table/UsersWithVideoViews";
import VideoCard from "../../component/VideoCard/VideoCard";
import { dataWithFiles } from "../../helper/common_functions";
import {
  displayErrorToast,
  displaySuccessToast,
  displayWorrningToast,
} from "../../helper/toast_notification_function";
import { getVideosHandle } from "../../redux/actions/CompayVideoActions";

const modalClass = {
  height: "70%",
  width: "50%",
};

const VideosComponent = ({ videos,userState }) => {
  const dispatch = useDispatch();

  const imageInputRef = React.useRef();
  const [formData, setFormData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsdisabled] = useState(false);
  const [editVideo, setEditVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null),
    [isVideoOpen, setIsVideoOpen] = useState(false),
    [videoViews, setVideoViews] = useState(null),
    [videoId, setVideoId] = useState(null),
    [isViewsOpen, setIsViewsOpen] = useState(false);

  const handleVideoToggle = () => setIsVideoOpen((prev) => !prev);
  const handleViewsToggle = () => setIsViewsOpen((prev) => !prev);
  const handleEditVideoToggle = () => setIsOpen((prev) => !prev);
  

  const handleVideoUrl = (id) => {
    getCompanyVideoUrlApi(id)
      .then((res) => {
        setVideoUrl(res.data.data[0]);
        handleVideoToggle();
      })
      .catch((error) => console.log("get video url", error.response));
  };

  const handleVideoViews = (id) => {
    setVideoId(id);
    handleViewsToggle();
    VideoViewByIdApi(id)
      .then((res) => setVideoViews(res.data.data[0]))
      .catch((error) => console.log(error));
  };


  

  const handleVideoDelete = (id) => {
    deleteCompanyVideoApi(id)
      .then((res) => {
        console.log("delete video response", res.data);
        message.success('Video has been deleted sucessfully!');
        getVideosHandle(dispatch);
      })
      .catch((error) => console.log("delete video error", error.response.data));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (e.target.files) {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitEdit = () => {
    setIsdisabled(true);
    if (formData) {
      let body = {};
      if (formData.thumbnail) {
        body = { ...formData, AttachmentType: "image" };
      } else {
        body = { ...formData };
      }
      console.log("edit Submit form Dt", formData, dataWithFiles(body));
      UpdateCompanyVideoApi(editVideo?.id, dataWithFiles(body))
        .then((res) => {
          if (res.data.success) {
            getVideosHandle(dispatch);
            imageInputRef.current.value = "";
            setFormData(null);
            setEditVideo(null);
            handleEditVideoToggle();
            setIsdisabled(false);
            displaySuccessToast("Video updated sucessfully!")
          } else {
            displayWorrningToast(res.data.message[0]);
            setFormData(null);
            setEditVideo(null);
            handleEditVideoToggle();
            setIsdisabled(false);
          }
        })
        .catch((error) => {
          imageInputRef.current.value = "";
          setFormData(null);
          setEditVideo(null);
          handleEditVideoToggle();
          setIsdisabled(false);
          displayErrorToast(error.response.data.message[0]);
          console.log("error updating video", error.response.data);
        });
    }
  };



  return (
    <>
      <div className="video_card_wrapper">
        {videos?.map((val, ind) => {
          return (
            <VideoCard
              key={`${ind} video crd`}
              thumbnail={val.thumbnail}
              title={val.title}
              active={val?.is_active}
              views={val?.view_count}
              onClick={() => handleVideoUrl(val.id)}
              onViewClick={() => handleVideoViews(val.id)}
              onDeleteClick={() => handleVideoDelete(val.id)}
              onEditClick={() => {
                setEditVideo(val);
                handleEditVideoToggle();
              }}
            />
          );
        })}
      </div>
      <Modal show={isVideoOpen} onHide={handleVideoToggle}>
        <ModalHeader closeButton>{videoUrl?.title}</ModalHeader>
        <ModalBody>
          <ReactPlayer
            url={videoUrl?.presignedUrl}
            controls
            // light
            width={"100%"}
          />
        </ModalBody>
      </Modal>
      {/* For Views Analytics and Data Table */}
      <Modal
        dialogClassName={"my-modal"}
        show={isViewsOpen}
        onHide={handleViewsToggle}
        scrollable
      >
        <ModalHeader closeButton>{videoViews?.title}</ModalHeader>
        <ModalBody>
          <Row>
            <VideoViewsByIdChart
              title={videoViews?.title}
              data={videoViews?.views}
            />
          </Row>
          <Row className="mt-4">
            <h3 className=",mt-5">Video Views With Profile</h3>
          </Row>
          <Row>
            <UsersWithVideoViews id={videoId} />
          </Row>
        </ModalBody>
      </Modal>

      {/*  Modal Body For edit Video */}

      <Modal show={isOpen} onHide={handleEditVideoToggle}>
        <ModalHeader closeButton>Update Your Video Presentation</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="mb-2">
              <FormLabel htmlFor="title">Title (e.g jpg, jpeg)</FormLabel>
              <FormControl
                type="text"
                name="title"
                id="title"
                maxLength={100}
                defaultValue={editVideo?.title}
                onChange={(e) => {
                  handleEditChange(e);
                }}
              />
            </FormGroup>
            <FormGroup className="mb-2">
              <FormLabel htmlFor="thumbnail">
                Thumbnail (e.g jpg, jpeg)
              </FormLabel>

              <InputGroup className="mb-3">
                <FormControl
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={(e) => {
                    handleEditChange(e);
                  }}
                />
                {formData?.thumbnail && (
                  <InputGroup.Text>
                    <span
                      onClick={() => {
                        imageInputRef.current.value = "";
                        setFormData({
                          ...formData,
                          thumbnail: null,
                        });
                      }}
                    >
                      ✖
                    </span>
                  </InputGroup.Text>
                )}
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Form.Check
                type={"checkbox"}
                label="Active Video"
                id="presentatio-checkbox1"
                defaultChecked={editVideo?.is_active}
                value={formData?.is_active}
                onChange={(e) => {
                  setFormData({ ...formData, is_active: e.target.checked });
                }}
              />
            </FormGroup>
            {/* {console.log(userState ,"editVideo?.is_level_two ")} */}

            {userState?.is_level_two_profile ? 
            
             <p style={{color:"red",fontWeight:"bold",fontSize:"13px",fontFamily:"poppins"}}>Note : Video only visible two level two users</p>
             :

             <FormGroup>
              <Form.Check
                type={"checkbox"}
                label="Show Video to level two profile"
                id="presentatio-checkbox2"
                defaultChecked={editVideo?.is_level_two}
                value={formData?.is_level_two}
                onChange={(e) => {
                  setFormData({ ...formData, is_level_two: e.target.checked });
                }}
              />
            </FormGroup> 
          }

            
            

          </Form>
        </ModalBody>
        <Modal.Footer>
          <Button
            variant={isDisabled ? "secondary" : "primary"}
            disabled={isDisabled}
            onClick={() => {
              submitEdit();
            }}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

      {/* End Modal Body For edit Video */}
    </>
  );
};

export default VideosComponent;
