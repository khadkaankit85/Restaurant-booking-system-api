import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Loginpage";
import { SignUpPage } from "./pages/Signup";
import { LandingPage } from "./pages/Landingpage";
import { Homepage } from "./pages/Homepage";
import { Protected } from "./utils/Protected";
import Contact from "./pages/contact"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<Contact />} /> {/* Correctly imported */}
        <Route
          path="/home"
          element={
            <Protected role="user">
              <Homepage />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
