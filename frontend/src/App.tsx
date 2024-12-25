import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Loginpage";
import { SignUpPage } from "./pages/Signup";
import { LandingPage } from "./pages/Landingpage";
import { Homepage } from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/home" element={<Homepage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
