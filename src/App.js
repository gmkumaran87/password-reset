import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Main from "./Wrapper/Main";

function App() {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
        </Routes>
      </Main>
    </Router>
  );
}

export default App;
