import { Grid } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { DateRange } from "../../component/payments/DateRange";
import { useState } from "react";
import { useEffect } from "react";
import {
  cardActiveSheduleHandle,
  getChargeRatePerDayHandle,
} from "../../redux/actions/creditCardActions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { getMinimumDays } from "../../api/companyApis/transactionLogsApi";
import { displayWorrningToast } from "../../helper/toast_notification_function";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Payments() {
  const dispatch = useDispatch();
  const [minimumdays, setminimumdays] = useState(null);
  const { paymentLoading, paymentPerDay, error } = useSelector(
    (state) => state.getPaymentPerDayReducer
  );

  const [dateRange, setDateRange] = useState([]);
  const [daysBetween, setDaysBetween] = useState();
  const [finalAmount, setFinalAmount] = useState();
  const [loading, setLoading] = useState(false);

  let desc = ` In publishing and graphic design, Lorem ipsum is a placeholder
  text commonly used to demonstrate the visual form of a document
  or a typeface without relying on meaningful content. Lorem ipsum
  may be used as a placeholder before final copy is available. It
  is also used to temporarily replace text in a process called
  greeking, which allows designers to consider the form of a
  webpage or publication....`;

  // useEffect(() => {
  //   if (dateRange && dateRange.length > 1) {
  //   setLoading(true)
  //     let startDate = dateRange[0];
  //     let endDate = dateRange[1];

  //     if (startDate && endDate) {
  //     setFinalAmount( paymentPerDay * daysBetween )
  //     setLoading(false)

  //     }else{displayWorrningToast("Select The Dates")}
  //   }
  // }, [dateRange])

  console.log("set days diffrence", daysBetween);

  const pay = () => {
    let startDate = dateRange[0];
    let endDate = dateRange[1];

    if (startDate && endDate) {
      let obj = {
        start_date: startDate,
        end_date: endDate,
      };
      if (daysBetween >= minimumdays) {
        setLoading(true);
        cardActiveSheduleHandle(obj, setDateRange, setLoading, setFinalAmount);
      } else {
        displayWorrningToast(`Minimum days for make payment is ${minimumdays}`);
      }
    }
  };

  useEffect(() => {
    getChargeRatePerDayHandle(dispatch, setLoading);
    getMinimumDays()
      .then((res) => {
        setminimumdays(res.data?.data[0].minimum_days_allowed);
        console.log("dasdadasdasd", res.data?.data[0].minimum_days_allowed);
      })
      .catch((error) => console.log(error.response));
  }, []);

  console.log(
    loading ? "loading..." : `Pay ${finalAmount ? finalAmount : ""}$`
  );

  return (
    <div id="paymentsPage">
      <div className="PaymentsPage_wrapper">
        <div className="blue_right_Border">
          {error ? (
            <h1>{error}</h1>
          ) : (
            <Grid container spacing={0} className="payment_right_side">
              <Grid item xs={12}>
                <h4 className="mb-3">Company Live Data</h4>

                <DateRange
                  setDateRange={setDateRange}
                  dateRange={dateRange}
                  setDaysBetween={setDaysBetween}
                  daysBetween={daysBetween}
                  setFinalAmount={setFinalAmount}
                  paymentPerDay={paymentPerDay}
                />
              </Grid>

              <Grid item xs={12} className="payment_desc_text">
                <h4>Why Invest?</h4>

                <p>{desc}</p>
                <p>{desc}</p>
              </Grid>
              <div className="mt-3 payButton">
                <Button
                  disabled={dateRange && dateRange.length > 1 ? false : true}
                  onClick={pay}
                >
                  {loading
                    ? "loading..."
                    : finalAmount
                    ? `Pay ${finalAmount}$`
                    : "Pay"}
                </Button>
              </div>
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
}
