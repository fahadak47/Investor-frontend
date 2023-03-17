import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllIndustriesHandle } from "../../redux/actions/getAllIndustriesAction";
import { Public_contact_action } from "../../redux/actions/PublicContactAction";

const Form = () => {
  const dispatch = useDispatch();
  const { isLoading, getAllIndustries, error } = useSelector(
    (state) => state.getAllIndustriesReducer
  );
  const [processLoading, setProcessLoading] = useState(false);
  const [formError, setError] = useState();

  const [FormData, SetFormData] = useState({
    email: "",
    contact_number: "",
    industry_id: "",
    message: "",
  });
  const FormHandler = (e) => {
    const { value, name } = e.target;
    SetFormData({ ...FormData, [name]: value });
  };
  const SubmitData = (e) => {
    e.preventDefault();
    setProcessLoading(true);
    Public_contact_action(FormData, SetFormData, setProcessLoading, setError);
  };

  if (formError) {
    setTimeout(() => {
      setError("");
    }, 3000);
  }

  useEffect(() => {
    getAllIndustriesHandle(dispatch);
  }, []);

  return (
    <div className="p-5 ">
      <div className="row">
        <div className="col-lg-7 col-md-12 mx-auto d-block">
          <div className="wrapper">
            <div className="card-body">
              <form onSubmit={SubmitData}>
                <div className="form-group">
                  <input
                    type="email"
                    onChange={FormHandler}
                    value={FormData.email}
                    name="email"
                    className="form-control mt-2 px-3 py-3"
                    id="name1"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    onChange={FormHandler}
                    value={FormData.contact_number}
                    name="contact_number"
                    className="form-control mt-3 px-3 py-3"
                    id="email"
                    placeholder="Contact no"
                    required
                  />
                </div>
                <div class="form-group mt-3">
                  <select
                    onChange={FormHandler}
                    value={FormData.industry_id}
                    id="industry_type"
                    className="form-control px-3 py-3"
                    name="industry_id"
                    required
                  >
                    <option value=""> Select Category</option>
                    {getAllIndustries.length !== 0
                      ? getAllIndustries.map((val, ind) => {
                          return (
                            <>
                              <option key={ind} value={val?.id}>
                                {val?.title}
                              </option>
                            </>
                          );
                        })
                      : null}
                  </select>
                </div>

                <div className="form-group">
                  <textarea
                    onChange={FormHandler}
                    value={FormData.message}
                    className="form-control mt-3 p-2"
                    name="message"
                    rows="6"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>

                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    textAlign: "left",
                    marginTop: "10px",
                  }}
                >
                  {formError ? formError : ""}
                </p>
                <button
                  type="submit"
                  className="form_btn d-block w-100 p-2 mt-3"
                  disabled={processLoading ? true : false}
                >
                  {!processLoading ? (
                    "Send Message"
                  ) : (
                    <>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Processing...
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-12 margin_top_contant">
          {/* <div class="mb-5 mb-lg-0">
            <div class="support-service br-7 mb-4 mb-xl-0">
              <p>
                <i class="fa fa-phone"></i>
              </p>
              <div className="mx-2">
                <h6 className="text-black">+68 872-627-9735</h6>
                <p className="text-black">Free Support!</p>
              </div>
            </div>
          </div> */}
          {/* <div class=" mb-5 mb-lg-0">
            <div class="support-service align-items-center br-7 mb-4 mb-xl-0">
              <p>
                <i class="fa-solid fa-clock"></i>
              </p>
              <div className="mx-2">
                <h6 className="text-black">Mon-Sat(10:00-19:00)</h6>
                <p className="text-black">Working Hours!</p>
              </div>
            </div>
          </div> */}
          <div>
            <div class="support-service align-items-center br-7">
              <p>
                <i class="fa fa-envelope"></i>
              </p>
              <div className="mx-2">
                <h6 className="text-black">yourdomain@gmail.com</h6>
                <p className="text-black">Support us!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
