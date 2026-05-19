import { BrowserRouter, Routes, Route, Link } from "react-router";
import Drivers from "./pages/Drivers";
import Home from "./pages/Home";
import Races from "./pages/Races";
import Teams from "./pages/Teams";
import TeamResults from "./pages/TeamResults";
import DriverDetails from "./pages/DriverDetails";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <div className="wrapper">
        <nav>
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/drivers">Drivers</Link>
            <Link to="/races">Races</Link>
            <Link to="/teams">Teams</Link>
          </div>


        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drivers/details/:driverId" element={<DriverDetails />} />
          <Route path="/races" element={<Races />} />
<<<<<<< HEAD
         
=======
          {/* <Route path="/races/details/:id" element={<RaceDetalis />} /> */}
>>>>>>> 552138f21c4d07e772d82fbc7d56855e1233ea5f
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/details/:id" element={<TeamResults />} />

        </Routes>
      </div>


    </BrowserRouter>
  )
}

export default App
