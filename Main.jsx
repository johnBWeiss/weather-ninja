import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Home  from "./src/pages/Home/Home";
import Header from "./src/components/Header/Header";
const Main = () => {
  return (
    <div className="app">
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
