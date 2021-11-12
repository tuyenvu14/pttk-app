import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (value) => {
    setEmail(value);
  };

  const handleChangePassword = (value) => {
    setPassword(value);
  };

  const handleSubmit = () => {
    if (email && password) {
      axios
        .post(`http://localhost:8080/users/signin`, null, {
          params: {
            username: email,
            password,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.setItem("token", response.data);
            console.log(response.data);
            navigate("/home");
          }
        })
        .catch((err) => console.warn(err));
    }
    // navigate("/home");
  };

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/images/image-2.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Grid className="login-content">
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Login
            </Typography>
            <Grid className="login-actions">
              <TextField
                margin="normal"
                fullWidth
                value={email}
                placeholder="Email Address"
                label="Email Address"
                onChange={(e) => handleChangeEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                value={password}
                placeholder="Password"
                label="Password"
                type="password"
                onChange={(e) => handleChangePassword(e.target.value)}
              />
              <Grid className="remember-forgot-password">
                <Grid>
                  <Checkbox value="remember" color="primary" />
                  Remember me
                </Grid>
                <Grid>Forgot password?</Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="button-submit"
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
