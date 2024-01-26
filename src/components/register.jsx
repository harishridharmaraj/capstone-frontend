import React, { useState } from "react";
import image from "../assets/reg.jpg";
import { GrGoogle } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [passErr, setPassErr] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/register", {
        name,
        email,
        pass,
      });
      if (res.status === 200) {
        console.log("User Registered");
        setErr("Registration Successfull. Kindly Login");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      setErr("Registration Error. Please try again");
    }
  };
  return (
    <div className="regcontainer">
      {err ? (
        <div>{err}</div>
      ) : (
        <>
          <h4 className="logo">
            <Link to="/" style={{ color: "#fff", textShadow: "2px 3px #000" }}>
              Doubt Guru
            </Link>
          </h4>

          <div className="regcont">
            <div className="regimg">
              <img src={image} alt="Guru" loading="lazy" />
            </div>
            <div className="regform">
              <h2>Register</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPass}
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                    if (e.target.value === pass) {
                      setPassErr("Password Match");
                    } else {
                      setPassErr("Password does not Match");
                    }
                  }}
                />
                {passErr === "Password Match" ? (
                  ""
                ) : (
                  <div style={{ color: "red" }}>{passErr}</div>
                )}
                {email !== "" && name !== "" && passErr === "Password Match" ? (
                  <button type="submit">Submit</button>
                ) : (
                  <button disabled>Try again</button>
                )}
              </form>
              <h4>SignUp With</h4>
              <div className="signbtn">
                <button>
                  <GrGoogle />
                </button>
                <button>
                  <FaGithub />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
