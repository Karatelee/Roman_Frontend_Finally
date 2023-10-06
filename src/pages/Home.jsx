import React from "react";
import Navbar from "@/components/Navbar";
import logoImage from "@/images/logo.png";
import "../scss/styles.scss";

const Home = () => {
  return (
    <>
      <div className="containerStyle">
        <div className="header">
          <div className="header-line">
            <div className="header-logo">
              <img src={logoImage} alt="" />
            </div>
            <Navbar />
          </div>
        </div>
        <div className="card">
          <h1>Welcome to Our Website</h1>
          <p>
            It is my restaurant
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;