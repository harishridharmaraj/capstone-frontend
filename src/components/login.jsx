import React, { useState, useEffect } from "react";
import image from "../assets/login.jpg";
import { GrGoogle } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [emailErr, setEmailErr] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handleData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      if (token) {
        const res = await axios.get("https://haribackend.onrender.com/dashboard", {
          headers: {
            "x-auth-token": token,
          },
        });
        console.log("hii", res);
        if (!res) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    setErr("");
    setEmailErr("");
  }, [email, pass]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://haribackend.onrender.com/login", {
        pass,
        email,
      });

      if (res.status === 200) {
        console.log("Successfully logged in");
        localStorage.setItem("token", res.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        console.log("Error response data:", error.response.data.error);
        console.log("Error response status:", error.response.status);
        setErr(error.response.data.error);

        if (error.response.status === 404) {
          setErr("Invalid Credentials");
          setEmailErr(true);
        } else {
          setErr("Invalid Credentials");
          setEmailErr(true);
        }
      } else if (error.request) {
        console.log("No response received:", error.request);
        setErr("Invalid Credentials");
      } else {
        console.error("Error setting up the request:", error.message);
        setErr("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="logincontainer">
      <h4 className="logo">
        <Link to="/" style={{ color: "#fff", textShadow: "2px 3px #000" }}>
          Doubt Guru
        </Link>
      </h4>
      <div className="logcont">
        <div className="logimg">
          <img src={image} alt="Guru" loading="lazy" />
        </div>
        <div className="hrline"></div>
        <div className="logform">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            {err && <div style={{ color: "red" }}>{err}</div>}
            <button type="submit">Submit</button>
          </form>
          {emailErr && <Link to="/reset">Reset Password here</Link>}
          <h4>Login With</h4>
          <div className="loginbtn">
            <button>
              <GrGoogle />
            </button>
            <button>
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
