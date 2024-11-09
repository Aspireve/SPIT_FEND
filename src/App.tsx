import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SurveyForm from "./pages/survey";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<SurveyForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
