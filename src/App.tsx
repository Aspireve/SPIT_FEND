import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SurveyForm from "./pages/survey";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import EcoPoints from "./pages/ecopoint";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<SurveyForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/ecopoint" element={<EcoPoints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
