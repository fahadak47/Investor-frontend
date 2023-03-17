import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Spinner,FormGroup,Form } from "react-bootstrap";
import {
  GetUserLeveltwoProfileApi,
  UpdateUserLeveltwoProfileApi,
} from "../../api/UserProfileApi";
import { displaySuccessToast } from "../../helper/toast_notification_function";
import { BiEdit } from 'react-icons/bi';
import checkmark from "../../images/checkMark.png";
import {ImCross} from "react-icons/im"


const AccountLevelTwo = () => {
  const [show2, setShow2] = useState(false);
  const [userState2, setUser2] = useState(null);
  const [formData2, setformData2] = useState(null);

  const [isLoading, setLoading] = useState(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  function handleChange2(evt) {
    const value = evt.target.value;

    setformData2({
      ...formData2,
      [evt.target.name]: value,
    });
  }

  const handleGetProfile = () => {
    GetUserLeveltwoProfileApi()
      .then((res) => {
        setUser2(res.data?.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Profile error log", err);
      });
  };
  const handleSubmintLevel2 = (e) => {
    e.preventDefault();

    console.log(formData2, "ppp");

    let data = !formData2 ? userState2 : formData2;

    if (userState2) {
      setLoading(true);
      UpdateUserLeveltwoProfileApi(data)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            handleGetProfile();
            handleClose2();
            displaySuccessToast(" Profile Update to Level 2");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);


  console.log(userState2,"ppppp")

  if (isLoading) {
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
    <>
    <div className="ProfileView">

        <div
          style={{
            justifyContent: "space-between  ",
            display: "flex",
            marginTop:"1rem",
            paddingBottom:"7px"
          }}
          className="col">
             <div className="head justify-content-space-between align-items-flex-end">
            <h5 style={{fontWeight:"700",fontFamily:"poppins"}}>Account Level Two details</h5>
             
            </div>
            <Button
                variant="btn btn-outline-primary"
                style={{ fontSize: "small" }}
                onClick={handleShow2}
              >
                 <BiEdit fontSize='17px'/>
              </Button>
         
      </div>
      
      {userState2 && (
        <div className="card my-0 ">
          <div className="card-body">
            <div className="row ">
              <div className="col-sm-5 ">
                <h6 className="mb-0">Education</h6>
              </div>
              <div className="col-sm-7 text-secondary">
                {userState2?.education}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-5">
                <h6 className="mb-0">Employment</h6>
              </div>
              <div className="col-sm-7 text-secondary">
                {userState2?.employment}
              </div>
            </div>

            <div className="row ">
              <div className="col-sm-5 ">
                <h6 className="mb-0">FINRA/SEC Affiliated</h6>
              </div>
              <div className="col-sm-7 text-secondary">
              {userState2?.finra_or_sec_affiliated ?
                          <img src={checkmark} alt="icon" width={'30px'}/>:
                          <ImCross style={{width:'22px'}}/>
                          
                          }
              
              </div>
            </div>

            <div className="row ">
              <div className="col-sm-5 ">
                <h6 className="mb-0">Identification</h6>
              </div>
              <div className="col-sm-7 text-secondary">
                {userState2?.identification}
              </div>
            </div>

            <div className="row ">
              <div className="col-sm-5 ">
                <h6 className="mb-0">Qualification</h6>
              </div>
              <div className="col-sm-7 text-secondary">
                {userState2?.qualification}
              </div>
            </div>

            <div className="row ">
              <div className="col-sm-5 ">
                <h6 className="mb-0">Trusted Contact</h6>
              </div>
              <div className="col-sm-7 text-secondary">
                {userState2?.trusted_contact_number}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

      {/* modal 2 */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile to Level 2</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="update" id="edit-form">
            <input class="form-control" type="hidden" name="id" />
            <div class="form-group">
              <label for="education">Education</label>
              <input
                class="form-control"
                defaultValue={userState2?.education}
                type="text"
                name="education"
                placeholder="property address"
                onChange={handleChange2}
              />
            </div>


            <div class="form-group">
              <label for="identification">Identification</label>
              <input
                class="form-control"
                defaultValue={userState2?.identification}
                type="text"
                name="identification"
                placeholder="passport number"
                onChange={handleChange2}
              />
            </div>

            <div class="form-group">
              <label for="employment">Employment</label>
              <input
                class="form-control"
                defaultValue={userState2?.employment}
                type="text"
                name="employment"
                placeholder="passport number"
                onChange={handleChange2}
              />
            </div>

            <div class="form-group">
              <label for="qualification">Qualification</label>
              <input
                class="form-control"
                defaultValue={userState2?.qualification}
                type="text"
                name="qualification"
                placeholder="passport number"
                onChange={handleChange2}
              />
            </div>

            {/* <div class="form-group">
              <label for="finra_or_sec_affiliated">FINRA/SEC Affiliated</label>
              <input
                class="form-control"
                defaultValue={userState2?.finra_or_sec_affiliated}
                type="text"
                name="finra_or_sec_affiliated"
                placeholder="passport number"
                onChange={handleChange2}
              />
            </div> */}

            <FormGroup>
              <Form.Check
                type={"checkbox"}
                label="FINRA/SEC Affiliated"
                id="presentatio-checkbox12"
                defaultChecked={userState2?.finra_or_sec_affiliated}
                // checked={userState2?.finra_or_sec_affiliated}
                onChange={(e) => {
                  setformData2({
                    ...formData2,
                    finra_or_sec_affiliated: e.target.checked,
                  });
                }}
              />
        </FormGroup>

            <div class="form-group">
              <label for="trusted_contact_number">Trusted Contact</label>
              <input
                class="form-control"
                defaultValue={userState2?.trusted_contact_number}
                type="text"
                name="trusted_contact_number"
                placeholder="passport number"
                onChange={handleChange2}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmintLevel2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccountLevelTwo;
