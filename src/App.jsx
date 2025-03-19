import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import ExpenseForm from "./pages/ExpenseForm";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/Expense-form" element={<ExpenseForm />} />
      </Routes>
    </Router>
  );
}

export default App;
