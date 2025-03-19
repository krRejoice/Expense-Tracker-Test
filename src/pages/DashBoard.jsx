import React, { useState, useEffect } from "react";

import Chart from "../components/Chart";
import TransactionTable from "../components/TransactionTable";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transaction")) || [];
    setData(transactions);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Chart data={data} />
      <TransactionTable data={data} setData={setData} />
    </div>
  );
}
