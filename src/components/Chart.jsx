import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center font-bold">No data available to display.</div>
    );
  }

  const incomeData = data
    .filter((item) => item.type === "Income")
    .reduce((acc, cur) => acc + Number(cur.amount), 0);
  const expenseData = data
    .filter((item) => item.type === "Expense")
    .reduce((acc, cur) => acc + Number(cur.amount), 0);

  const chartData = [
    { name: "Total Income", value: incomeData },
    { name: "Total Expense", value: expenseData },
  ];

  const monthlyData = data.reduce((acc, cur) => {
    const month = new Date(cur.date).toLocaleString("default", {
      month: "long",
    });
    if (!acc[month]) {
      acc[month] = { month, Income: 0, Expense: 0 };
    }

    acc[month][cur.type] += Number(cur.amount);
    return acc;
  }, {});

  const barChartData = Object.values(monthlyData);

  return (
    <div className="display: flex justify-center">
      <h1 className="font-extrabold">Total Income/Expense</h1>
      <ResponsiveContainer width="50%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="pink"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <h2 className="font-extrabold">Monthly Based Income/Expense</h2>
      <ResponsiveContainer width="50%" height={300}>
        <BarChart data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Income" fill="#82ca9d" />
          <Bar dataKey="Expense" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
