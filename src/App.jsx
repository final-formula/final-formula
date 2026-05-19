import { BrowserRouter, Routes, Route, Link } from "react-router"
import Drivers from "./pages/Drivers"
import Home from "./pages/Home"
import Races from "./pages/Races"
import Teams from "./pages/Teams"
import DriverDetails from "./pages/DriverDetails"
import './App.css'

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
          {/* <Route path="/races/details/:id" element={<RaceDetalis />} /> */}
          <Route path="/teams" element={<Teams />} />
          {/* <Route path="/teams/details/:id" element={<TeamDetalis />} /> */}

        </Routes>
      </div>


    </BrowserRouter>
  )
}

export default App
