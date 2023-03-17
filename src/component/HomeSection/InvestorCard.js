import { Row } from "antd";
import { RatingStar } from "rating-star";
import React from "react";


const InvestorCard = ({ mark }) => {
  return (
    // <div className="card mx-5  mt-3 px-0 investor_card">
    //   <img
    //     className="card-img-top"
    //     src="images/investor_1.jpg"
    //     alt="Card image cap"
    //   />
    //   <div className="card-body">
    //     <h3 className="card-title">Card title</h3>
    //     <p className="text-muted">
    //       Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur
    //       adipisicing elit. Magni illo consectetur laborum, molestias
    //       praesentium commodi recusandae alias unde expedita voluptatibus.
    //     </p>
    //     <hr />
    //     <div className="d-flex flex-row align-items-center">
    //       <img src="images/avator.jpg" className="avatar d-block" />
    //       <p className="text-muted mt-3 ms-3">
    //         Investor
    //         {mark && (
    //           <i style={{ color: "green" }} className="fa-solid fa-check"></i>
    //         )}
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div class="container ">
                              <Row gutter={[5,10]} style={{background:"#d3d3d35c",border:"1px solid #dee2e6",paddingTop:"6rem"}}>

                                <div class="col-12 col-lg-6 col-md-6 " >
                                    <img style={{width:"100%"}} src="https://invest.techlosoft.com/Images/1661707320man.png" alt="" />
                                </div>
                                <div class="col-12 col-lg-6 col-md-6  text-lg-left text-md-left text-center">
                                    <h3>AlexMoron</h3>
                                    <div class="my-2">
                             <RatingStar maxScore={10} size={20} id="123" rating={7} colors="red"/>

                                    </div>
                                    <p class="text-lg-left text-md-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam qui velit est illo? A corporis qui vitae tempora, illum cupiditate.</p>
                                    <p class="minutes mt-5 text-lg-left text-md-left">2 minutes ago</p>
                                </div>
                              </Row>
                            {/* </div> */}
                        </div>
  );
};

export default InvestorCard;


