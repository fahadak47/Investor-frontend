import { Row } from "react-bootstrap";
import img1 from "../../images/raise1.png";
import img2 from "../../images/raise2.png";
import img3 from "../../images/raise3.png";
import HomeCommonCard from "../Common/HomeCommonCard";


export const AroundCompany = () => {
    const data = [
        {
          img:img1,
          title:"Access the startup asset class",
          desc: "We lobbied to change the rules so everyday people outside the venture bubble could finally invest in private startups, a historically high performing asset class.",
        },
        {
            img:img2,
            title:"Invest in vetted companies",
            desc: "Only a small selection of companies make it through our due diligence process. We’re not an open marketplace where anyone can just click and raise",
          }, {
            img:img3,
            title:"Diversify like a VC",
            desc: "We offer lower minimums than traditional angel investments so you can back more companies. When you diversify, you increase your odds of positive returns.",
          },
      ];
    
  return (
    <div className="container py-5 raiseAround">
      <h2 className="text-left fw-700 ol-12 col-md-5">Looking To Raise A Round For Your Company?</h2>
      
      <div className="mt-4">

      <Row gutter={[24, 16]} justify="center" align="middle">
        {data.map((val, ind) => {
          return (
            <div className="col-12 col-md-4 mt-3">

             
              <HomeCommonCard
                backgroundColor="#111A3E"
                 img={val.img}
                 desc={val.desc}
                 title={val.title}

              />
            </div>
          );
        })}
      </Row>
      </div>

    </div>
  );
};
