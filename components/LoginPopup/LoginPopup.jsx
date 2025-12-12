import React, { useState } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="clerk-auth-container">
          {currState === "Login" ? (
            <SignIn 
              routing="hash"
              afterSignInUrl="/"
              appearance={{
                elements: {
                  rootBox: "clerk-root",
                  card: "clerk-card"
                }
              }}
            />
          ) : (
            <SignUp 
              routing="hash"
              afterSignUpUrl="/"
              appearance={{
                elements: {
                  rootBox: "clerk-root",
                  card: "clerk-card"
                }
              }}
            />
          )}
        </div>
        {currState === "Login" ? (
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")} style={{ color: "#FF4C24", cursor: "pointer" }}>Click here</span>
          </p>
        ) : (
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")} style={{ color: "#FF4C24", cursor: "pointer" }}>Login here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;