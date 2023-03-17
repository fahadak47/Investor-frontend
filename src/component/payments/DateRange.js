import React, { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { cardActiveSheduleApi } from "../../api/companyApis/CreditCardApis";
import { useEffect } from "react";

const { RangePicker } = DatePicker;

export const DateRange = ({dateRange,setDateRange,setDaysBetween,setFinalAmount,paymentPerDay}) => {



  console.log(dateRange);



   // disable past dates
   const today = moment().subtract(0, 'day')
   const disablePastDt = current => {
     return current.isBefore(today);
   };
  




 

  
  useEffect(() => {
    if (dateRange && dateRange.length > 1) {
      let startDate = dateRange[0];
      let endDate = dateRange[1];
      
      if (startDate && endDate) {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
          if (!moment.isMoment(endDate)) endDate = moment(endDate);
              let dif =  endDate.diff(startDate, "days")

              setDaysBetween(dif + 1)
              setFinalAmount(paymentPerDay * dif)
      }
//this will return to me the different between two dates with Weekend Days 
    }
  }, [dateRange])

  return (<>
  
  <RangePicker
    allowClear={true}
    autoFocus={true}
    direction="vertical"
    // size="large"
    picker="date"
    separator="||"
    // disablePastDt={}
    disabledDate={disablePastDt}
    // value={[]}
    //  onChange={(val) => handleOnchange(val)}
    // onOk={onok}
    onChange={(values) => {setDateRange(values.map(item=>{  return  moment(item).format('MM-DD-YYYY')}))}}
  />
   
  </>
  );
};

