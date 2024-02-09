import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";
import EarthPage from "./pages/EarthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/:userId/:continentId" element={<GamePage />}/>
        <Route path="/:userId/earth" element={<EarthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;