import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router"
import axios from "axios";
import Home from "./pages/Home"
import Races from "./pages/Races"
import Teams from "./pages/Teams"
import DriverDetails from "./pages/DriverDetails"
import RacesDetails from "./pages/RacesDetails"
import './App.css'
import Drivers from "./pages/Drivers";
import TeamDetails from "./pages/TeamDetails";
import Flag from 'react-flagkit';
import { useState, useEffect } from 'react'
import Loader from "./components/Loader"
import SmallCardView from "./pages/SmallCardView"
import BigCardView from "./pages/BigCardView"
import SelectYear from "./components/SelectYear"

function App() {
  const [flags, setFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("2026")

  useEffect(() => {
    getFlags();

  }, []);

  const getFlags = async () => {
    const url = "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json"
    const response = await axios.get(url);

    setFlags(response.data);
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loader />
  }

  const activeStyle = ({ isActive }) => ({
    color: isActive ? 'crimson' : 'white',
    fontWeight: isActive ? 'bolder' : 'normal',
    padding: '5px 10px',
    backgroundColor: isActive ? "black" : "#303030"
  });

  return (
    <BrowserRouter>
      <div className="wrapper">
        <nav>
          <SelectYear value={year} change={(e) => setYear(e.target.value)} />
          <div className="navbar">
            <div className="homeDiv">
              <Link to="/"><img src="./F1-2013-Legends-Edition.jpg" className="homeImage" /></Link>
            </div>
            <div className="linksDiv">
              <NavLink to="/drivers" style={activeStyle}><img src="./Kaciga.png" className="nav-img" /> <span>Drivers</span></NavLink>
              <NavLink to="/teams" style={activeStyle}><img src="./Teams.png" className="nav-img" /> <span>Teams</span></NavLink>
              <NavLink to="/races" className="link-races" style={activeStyle}><img src="./Races1.png" className="nav-img races" /> <span>Races</span></NavLink>
              <NavLink to="/smallCard" style={activeStyle}><img src="./Kaciga.png" className="nav-img" /> <span>SmallCard</span></NavLink>
              <NavLink to="/bigCard" style={activeStyle}><img src="./Kaciga.png" className="nav-img" /> <span>BigCard</span></NavLink>
            </div>
          </div>

        </nav>
        <Routes>
          <Route path="/" element={<Home year={year} />} />
          <Route path="/drivers" element={<Drivers flags={flags} year={year} search={search} />} />
          <Route path="/drivers/details/:driverId" element={<DriverDetails flags={flags} year={year} />} />
          <Route path="/races" element={<Races flags={flags} year={year} />} />
          <Route path="/races/details/:raceName" element={<RacesDetails flags={flags} year={year} />} />
          <Route path="/teams" element={<Teams flags={flags} year={year} />} />
          <Route path="/teams/details/:constructorId" element={<TeamDetails flags={flags} year={year} />} />
          <Route path="/smallCard" element={<SmallCardView flags={flags} search={search} year={year} />} />
          <Route path="/bigCard" element={<BigCardView flags={flags} search={search} year={year} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App