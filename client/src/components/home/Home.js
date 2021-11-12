import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import "./home.scss";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="header">
        <img src="images/image-3.png" alt="" />
        <div className="button-home">Home</div>
        <h1>Your Adventure starts here</h1>
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          className="menu"
        >
          <Button className="icon" onClick={() => navigate("/statistic")}>
            Statistic
          </Button>
          <Button className="icon">Staff</Button>
          <Button className="icon">Cooperator</Button>
          <Button className="icon">Profile</Button>
        </ButtonGroup>
      </div>

      <div className="content">
        <div className="content-item">
          <img src="images/image-4.png" alt="" /> <span>Ninh Binh</span>
        </div>
        <div className="content-item">
          <img src="images/image-5.png" alt="" /> <span>HaLong Bay</span>
        </div>
        <div className="content-item">
          <img src="images/image-6.png" alt="" /> <span>Ha Noi</span>
        </div>
      </div>
    </div>
  );
}
