import "./app.scss";
import Intro from "./components/intro/Intro";
import Login from "./components/login/Login";
import Error from "./components/error/Error";
import Home from "./components/home/Home";
import Statistic from "./components/statistic/Statistic";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/statistic" element={<Statistic />} />
          {/* <Route
            path="/home"
            element={
              window.localStorage.getItem("token") ? (
                <Home />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/statistic"
            element={
              window.localStorage.getItem("token") ? (
                <Statistic />
              ) : (
                <Navigate to="/login" />
              )
            }
          /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/:somestring" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
