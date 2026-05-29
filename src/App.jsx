import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router"
import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import Home from "./pages/Home"
import Races from "./pages/Races"
import Teams from "./pages/Teams"
import DriverDetails from "./pages/DriverDetails"
import RacesDetails from "./pages/RacesDetails"
import Drivers from "./pages/Drivers";
import TeamDetails from "./pages/TeamDetails";
import Flag from 'react-flagkit';
import Loader from "./components/Loader"
import SmallCardView from "./pages/SmallCardView"
import BigCardView from "./pages/BigCardView"
import SelectYear from "./components/SelectYear"
import Galery from "./pages/Galery"

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
          <div className="navbar">
            <div className="homeDiv">
              <Link to="/"><img src="/General/Formula-1.jpg" className="homeImage" /></Link>
            </div>
            <div className="linksDiv">
              <SelectYear className="selectYear" value={year} change={(e) => setYear(e.target.value)} />
              <NavLink to="/drivers" style={activeStyle} className="navButton"><img src="/galery/slika28.jpg" className="nav-img" /><span>Drivers</span></NavLink>
              <NavLink to="/teams" style={activeStyle} className="navButton"><img src="/galery/slika15.jpg" className="nav-img" /><span>Teams</span></NavLink>
              <NavLink to="/races" style={activeStyle} className="navButton"><img src="/galery/slika14.jpg" className="nav-img" /><span>Races</span></NavLink>
              <NavLink to="/galery" style={activeStyle} className="navButton"><img src="/galery/slika35.jpg" className="nav-img" /><span>Gallery</span></NavLink>
              <NavLink to="/smallCard" style={activeStyle} className="navButton"><img src="/General/smallCard.jpg" className="nav-img" /><span>Small Card</span></NavLink>
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
          <Route path="/galery" element={<Galery flags={flags} search={search} year={year} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App