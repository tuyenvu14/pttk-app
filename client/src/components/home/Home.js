import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.scss";

export default function Home() {
  const [name, setName] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/users/me", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data.username);
        setName(response.data.username);
      });
  }, []);

  return (
    <div className="home">
      <div className="header">
        <img src="images/image-3.png" alt="" />
        <div className="button-home">Trang chủ</div>
        <div
          className="button-name"
          style={{ display: "flex", alignItems: "center" }}
        >
          <span>
            Xin chào, <span>{name}</span>
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "45px",
            }}
            onClick={() => {
              window.localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Đăng xuất <LogoutIcon style={{ marginLeft: "5px" }} />
          </span>
        </div>
        <h1>TuyenTravel</h1>
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          className="menu"
        >
          <Button className="icon">Tour</Button>
          <Button className="icon">Đối tác</Button>
          <Button className="icon">Nhân viên</Button>
          <Button className="icon" onClick={() => navigate("/statistic")}>
            Thống kê
          </Button>
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
