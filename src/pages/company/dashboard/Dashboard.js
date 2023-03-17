import React from "react";
import CreditCard from "../../../component/Common/CreditCard";
import Divider from "../../../component/Common/Divider";
import Analictics from "./Analictics";
import ViewsTable from "./ViewsTable";

export default function Dashboard() {
  return (
    <>
      <h1 style={{fontFamily:"poppins", fontWeight:"bold"}}>Dashboard</h1>
      <Analictics />
      <Divider space={10} />
      <ViewsTable />
      <Divider space={30} />
    </>
  );
}
