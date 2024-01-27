import React, { useState, useEffect } from "react";
import image from "../assets/forgetpass.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreatePass = () => {
  const { token } = useParams();
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passErr, setPassErr] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = async () => {
      const getusers = await axios.get("https://haribackend.onrender.com/users");
      const userdata = getusers.data;
      const finduser = userdata.some((id) => id.passwordtoken === token);

      if (!finduser) {
        setSuccess("Token Expired, Please try again!");
      }
    };

    checkToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getusers = await axios.get("https://haribackend.onrender.com/users");
      const userdata = getusers.data;
      const finduser = userdata.some((id) => id.passwordtoken === token);
      console.log("finduser", finduser);
      if (finduser) {
        await axios.put(`https://haribackend.onrender.com/request/${token}`, { pass });
        setSuccess("Password Reset Successfull");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        setSuccess("Token Expired, Please try again!");
      }
    } catch (error) {
      console.log("Password reset Error", error);
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
                  type="password"
                  placeholder="New Password"
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
                {passErr === "Password Match" ? (
                  <button type="submit">Submit</button>
                ) : (
                  <button disabled>Try again</button>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePass;
