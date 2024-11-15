import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SurveyForm from "./pages/survey";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import EcoPoints from "./pages/ecopoint";
import EcoLevelSystem from "./pages/ecolevelsystem";
import LeaderBoard from "./pages/leaderboard";
import Marketplace from "./pages/marketplace";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/survey" element={<SurveyForm />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/ecopoint" element={<EcoPoints />} />
        <Route path="/ecolevelsystem" element={<EcoLevelSystem />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
