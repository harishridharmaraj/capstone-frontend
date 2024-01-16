import React from "react";
import "./styles.css";
import main from "../assets/guru.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homecontainer">
      <div className="logobar">
        <h2>Doubt Guru</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <button>
            <Link to="/register" style={{ color: "#fff" }}>
              Register
            </Link>
          </button>
          <button>
            <Link to="/login" style={{ color: "#fff" }}>
              Login
            </Link>
          </button>
        </div>
      </div>
      <div className="maincont">
        <div>
          <h2>Unlock Your Learning Potential</h2>
        </div>
        <div className="searchbtn">
          <input placeholder="Enter your Doubts here..." type="text" />
          <button>
            <FaSearch />
          </button>
        </div>

        <div>
          <h2>Connect With Mentors Personally.</h2>
        </div>
      </div>
      <div className="guruimg">
        <div className="line">
          <div className="lines"></div>
        </div>

        <img src={main} className="gurupng" alt="Guru" />
      </div>
    </div>
  );
};

export default Home;
