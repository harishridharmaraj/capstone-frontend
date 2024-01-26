import React, { useState } from "react";
import image from "../assets/forgetpass.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Forgetpass = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getusers = await axios.get("http://localhost:4000/users");
      const userdata = getusers.data;
      const finduser = userdata.some((id) => id.email === email);
      if (finduser) {
        axios.put("http://localhost:4000/forgetpass", { email });

        setSuccess("Reset Link has been sent to your Email");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        setErr("Email Id does not exist");
      }
    } catch (error) {
      setErr("Please Try Again", error);
    }
  };
  return (
    <div className="logincontainer">
      {success ? (
        success
      ) : (
        <>
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
            <div className="logform" style={{ justifyContent: "center" }}>
              <h2>Password Reset</h2>
              <br />
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {err && <div style={{ color: "red" }}>{err}</div>}
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Forgetpass;
