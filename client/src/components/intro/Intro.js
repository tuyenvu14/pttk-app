import React from "react";
import "./intro.scss";
import Button from "@mui/material/Button";
import { ArrowRightAlt, Search } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

export default function Intro() {
  const navigate = useNavigate();

  const handleClickToLogin = () => {
    navigate("./login");
  };

  return (
    <div className="intro">
      {/* <img src="images/image-1.png" alt="" />
      <div className="navbar">
        <span onClick={handleClickToLogin}>Đăng nhập</span>
        <span>Liên lạc với chúng tôi</span>
        <Search fontSize="large" />
      </div>
      <div className="title">
        <h3>Hãy bắt đầu cuộc hành trình của chúng ta</h3>

        <div className="more">
          <Button
            variant="text"
            endIcon={<ArrowRightAlt />}
            className="icon"
            onClick={handleClickToLogin}
          >
            Khám phá
          </Button>
        </div>
      </div> */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* <CssBaseline /> */}
        <Grid
          item
          xs={false}
          sm={12}
          md={12}
          sx={{
            backgroundImage: "url(/images/image-1.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="navbar">
          <span onClick={handleClickToLogin}>Đăng nhập</span>
          <span>Liên lạc với chúng tôi</span>
          <Search fontSize="large" />
        </div>
        <div className="title">
          {/* <h3>Hãy bắt đầu cuộc hành trình của chúng ta</h3> */}

          <div className="more">
            <Button
              variant="text"
              endIcon={<ArrowRightAlt />}
              className="icon"
              onClick={handleClickToLogin}
            >
              Khám phá
            </Button>
          </div>
        </div>
      </Grid>
    </div>
  );
}
