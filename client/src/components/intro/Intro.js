import React from "react";
import "./intro.scss";
import Button from "@mui/material/Button";
import { ArrowRightAlt, Search } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  const handleClickToLogin = () => {
    navigate("./login");
  };

  return (
    <div className="intro">
      <img src="images/image-1.png" alt="" />
      <div className="navbar">
        <span onClick={handleClickToLogin}>SIGN IN</span>
        <span>CONTACT US</span>
        <Search fontSize="large" />
      </div>
      <div className="title">
        <h1>Let’s start our journey</h1>

        <div className="more">
          <Button
            variant="text"
            endIcon={<ArrowRightAlt />}
            className="icon"
            onClick={handleClickToLogin}
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
}
