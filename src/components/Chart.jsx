import React, { useMemo } from "react";
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
  LineChart,
  Line,
} from "recharts";

const Chart = ({ data }) => {
  const incomeData = useMemo(
    () =>
      data && data.length > 0
        ? data
            .filter((item) => item.type === "Income")
            .reduce((acc, cur) => acc + Number(cur.amount), 0)
        : 0,
    [data]
  );

  const expenseData = useMemo(
    () =>
      data && data.length > 0
        ? data
            .filter((item) => item.type === "Expense")
            .reduce((acc, cur) => acc + Number(cur.amount), 0)
        : 0,
    [data]
  );

  const chartData = useMemo(
    () => [
      { name: "Total Income", value: incomeData },
      { name: "Total Expense", value: expenseData },
    ],
    [incomeData, expenseData]
  );

  const barChartData = useMemo(() => {
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

    return Object.values(monthlyData);
  }, [data]);

  const spendingTrendData = useMemo(() => {
    const monthlyData = data.reduce((acc, cur) => {
      const month = new Date(cur.date).toLocaleString("default", {
        month: "long",
      });
      if (!acc[month]) {
        acc[month] = { month, Spending: 0 };
      }

      acc[month].Spending += cur.type === "Expense" ? Number(cur.amount) : 0;
      return acc;
    }, {});

    return Object.values(monthlyData);
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="text-center font-bold">No data available to display.</div>
    );
  }

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
      <h2 className="font-extrabold">Spending Trend Over Past Months</h2>
      <ResponsiveContainer width="50%" height={300}>
        <LineChart data={spendingTrendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Spending" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
