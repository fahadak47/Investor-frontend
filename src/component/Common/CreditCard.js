import React, { useEffect, useState } from "react";
import Cleave from "cleave.js/react";
import { decryption, mergedEncryption } from "../../helper/encryptData";
import {
  attachCreditCardHandle,
  getUserCardData,
  updateCardHandle,
} from "../../redux/actions/creditCardActions";
import CryptoJS from "crypto-js";
import { Button, Spinner } from "react-bootstrap";
import { displayWorrningToast } from "../../helper/toast_notification_function";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "react-bootstrap";
import JSEncrypt from "jsencrypt";

const crypt = new JSEncrypt();

// import 'animate.css';
// import './App.css';

const imageUrls = [
  "https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png",
  "https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_rev_92px_2x.png",
  "https://www.discover.com/company/images/newsroom/media-downloads/discover.png",
  "https://s1.q4cdn.com/692158879/files/design/svg/american-express-logo.svg",
  "https://cdn4.iconfinder.com/data/icons/simple-peyment-methods/512/diners_club-512.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/1280px-JCB_logo.svg.png",
];

function CreditCard() {
  const { userCardLoading, userCard, error } = useSelector(
    (state) => state.GetCardDataReducer
  );
  const [creditCardNum, setCreditCardNum] = useState("#### #### #### ####");
  // const [cardType, setCardType] = useState('')
  // const [cardHolder, setCardHolder] = useState('');
  // const [expireMonth, setExpireMonth] = useState('');
  // const [expireYear, setExpireYear] = useState('');
  const [cardTypeUrl, setCardTypeUrl] = useState(
    "https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png"
  );

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [processLoading, setProcessLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const [formData, setformData] = React.useState({
    number: "",
    expiry_year: "",
    expiry_month: "",
    cv: "",
    cardHolder: "",
  });

  // const [flip, setFlip] = useState(null);

  //   const handleNum = (e) => {
  //     setCreditCardNum(e.target.value);
  //     console.log(e.target);
  //     if(expireYear && expireMonth && e.target.value){
  //         setButtonDisabled(false)
  //     }
  //   }

  const onChangeHandle = (e) => {
    let name = e.target.name;
    let val = e.target;
    setformData({ ...formData, [name]: val.value });
    // setErrorMsg("");

    const { number, expiry_year, expiry_month } = formData;
    console.log(number.length);

    if (number.length >= 15) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { number, expiry_year, expiry_month } = formData;

    if (number && expiry_month && expiry_year) {
      let obj = {
        number: number,
        expiry_month: expiry_month,
        expiry_year: expiry_year,
      };
      console.log(obj);
      let converted = mergedEncryption(obj);

      if (!userCard) {
        attachCreditCardHandle(
          { data: converted },
          setformData,
          setButtonDisabled,
          setProcessLoading,
          dispatch
        );
      } else {
        updateCardHandle(
          { data: converted },
          setformData,
          setButtonDisabled,
          setProcessLoading,
          dispatch
        );
      }
    } else {
      displayWorrningToast("Fill the details..");
    }
  };

  useEffect(() => {
    getUserCardData(dispatch);

    if (userCard && userCard[0]?.card) {
      let obj = {
        expiry_year: userCard[0]?.card?.expiry_year
          ? userCard[0].card.expiry_year
          : "",
        expiry_month: userCard[0].card.expiry_month
          ? userCard[0].card.expiry_month
          : "",
      };

      let converted = decryption(obj);

      console.log(converted, obj);
    }
  }, []);

  //   const handleType = (type) => {
  //     setCardType(type);
  //     console.log(expireYear,expireMonth,creditCardNum);

  //     if(type === "visa") {
  //       setCardTypeUrl(imageUrls[0]);
  //       console.log("Visa")
  //     } else if(type === "mastercard") {
  //       setCardTypeUrl(imageUrls[1]);
  //       console.log("Mastercard")
  //     } else if(type === "discover") {
  //       setCardTypeUrl(imageUrls[2]);
  //       console.log("Discover")
  //     } else if(type === "amex") {
  //       setCardTypeUrl(imageUrls[3]);
  //       console.log("Amex")
  //     } else if(type === "diners") {
  //       console.log("Diners")
  //       setCardTypeUrl(imageUrls[4])
  //     } else if(type === "jcb") {
  //       console.log("JCB");
  //       setCardTypeUrl(imageUrls[5]);
  //     }
  //   }

  //   const handleCardHolder = (e) => {
  //     setCardHolder(e.target.value);
  //   }

  //   const handleExpMonth = (e) => {
  //     setExpireMonth(e.target.value);
  //   }

  //   const handleExpYear = (e) => {
  //     setExpireYear(e.target.value);
  //   }

  // cleave.js logic

  const updateState = () => {
    setOpen(!open);

    if (userCard) {
      setformData({
        number: userCard[0].card.number ? userCard[0].card.number : "",
        // expiry_year:userCard[0].card.expiry_year  ? userCard[0].card.expiry_year :  "",
        // expiry_month:userCard[0].card.expiry_month ? userCard[0].card.expiry_month : "",
        expiry_year: "",

        expiry_month: "",
        cv: "",
        cardHolder: "",
      });
    }
  };

  if (userCardLoading) {
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

  console.log(userCard);

  return (
    <div className="container">
      {/* ======================== CREDIT CARD ====================================== */}

      <form id={`form`} onSubmit={(e) => handleSubmit(e)}>
        <div id="card">
          <div className="header">
            <div className="sticker"></div>
            <div>
              <img className="logo" src={cardTypeUrl} alt="Card logo" />
            </div>
          </div>
          <div className="body">
            <h4 id="creditCardNumber">
              {userCard.length > 0
                ? userCard?.[0].card.number
                : "####################"}
            </h4>
            <Button
              onClick={() => updateState()}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              {userCard.length > 0 ? "Update" : "Add"}
            </Button>
          </div>
          <div className="footer">
            <div>
              {/* <h5>Card Holder</h5> */}
              <h4>{formData?.cardHolder}</h4>
            </div>
            <div>
              <h5>Expires</h5>
              {userCard.length ? (
                <h4>
                  {userCard[0]?.card?.expiry_month} /{" "}
                  {userCard[0]?.card?.expiry_year}
                </h4>
              ) : (
                <h4>
                  {formData?.expiry_month} / {formData?.expiry_year}
                </h4>
              )}
            </div>
          </div>
        </div>

        {/* =======================================   MAIN FORM     ========================================= */}
        <Collapse in={open}>
          <div id="example-collapse-text" className="creditFormBody">
            <div className="input-container mt" id="example-collapse-text">
              <h4>Enter card number</h4>
              <input
                name="number"
                onChange={(e) => onChangeHandle(e)}
                placeholder="Please enter your credit card number"
                maxLength={16}
                value={formData.number}
                required
              />
            </div>

            <div className="input-container">
              <h4>Card Holder</h4>
              <input
                name="cardHolder"
                value={formData.cardHolder}
                onChange={(e) => onChangeHandle(e)}
                type="text"
                placeholder="Please enter your full name..."
                required
              />
            </div>

            <div className="input-grp">
              <div className="input-container">
                <h4>Expiration Year</h4>
                <select
                  required
                  value={formData.expiry_year}
                  name="expiry_year"
                  onChange={(e) => onChangeHandle(e)}
                >
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
              </div>
              <div className="input-container">
                <h4>Month</h4>
                <select
                  required
                  value={formData.expiry_month}
                  name="expiry_month"
                  onChange={(e) => onChangeHandle(e)}
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div className="input-container">
                <h4>CVV</h4>
                <input
                  name="cv"
                  value={formData.cv}
                  type="password"
                  placeholder="CVV"
                  required
                  onChange={(e) => onChangeHandle(e)}
                />
              </div>
            </div>

            <button
              type="submit"
              className={
                !buttonDisabled
                  ? "creditCardSubmit"
                  : "creditCardButtonDisabled"
              }
              disabled={processLoading || buttonDisabled ? true : false}
            >
              {!processLoading ? (
                userCard.length > 0 ? (
                  `Update Card`
                ) : (
                  `Add Card`
                )
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
          </div>
        </Collapse>
      </form>
    </div>
  );
}

export default CreditCard;
