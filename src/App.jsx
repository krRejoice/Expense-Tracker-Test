import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashBoard = lazy(() => import("./pages/DashBoard"));
const ExpenseForm = lazy(() => import("./pages/ExpenseForm"));

function App() {
  return (
    <Router>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/expense-form" element={<ExpenseForm />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </Router>
  );
}

export default App;
