import { BrowserRouter, Routes, Route, Link } from "react-router"
import Home from "./pages/Home"
import Races from "./pages/Races"
import Teams from "./pages/Teams"
import DriverDetails from "./pages/DriverDetails"
import RacesDetails from "./pages/RacesDetails"
import './App.css'
import Drivers from "./pages/Drivers";
import TeamResults from "./pages/TeamResults";
import Flag from 'react-flagkit';
import { useState, useEffect } from 'react'
import Loader from "./components/Loader"
import SmallCardView from "./pages/SmallCardView"
import BigCardView from "./pages/BigCardView"
import SelectYear from "./components/SelectYear"

function App() {
  const [flags, setFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("2026")

  useEffect(() => {
    getFlags();

  }, []);

  const getFlags = async () => {
    const url = "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json"
    const response = await fetch(url);
    const data = await response.json()
    setFlags(data);
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        <nav>
          <SelectYear value={year} change={(e) => setYear(e.target.value)} />
          <div className="navbar">
            <div className="homeDiv">
              <Link to="/"><img src="../../public/F1-2013-Legends-Edition.jpg" className="homeImage" /></Link>
            </div>
            <div className="linksDiv">
              <Link to="/drivers"><img src="../../public/Kaciga.png" className="nav-img" /> <span>Drivers</span></Link>
              <Link to="/teams"><img src="../../public/Teams.png" className="nav-img" /> <span>Teams</span></Link>
              <Link to="/races" className="link-races"><img src="../../public/Races1.png" className="nav-img races" /> <span>Races</span></Link>
              <Link to="/smallCard"><img src="../../public/Kaciga.png" className="nav-img" /> <span>SmallCard</span></Link>
              <Link to="/bigCard"><img src="../../public/Kaciga.png" className="nav-img" /> <span>BigCard</span></Link>
            </div>
          </div>

        </nav>
        <Routes>
          <Route path="/" element={<Home flags={flags} year={year} />} />
          <Route path="/drivers" element={<Drivers flags={flags} year={year} search={search} />} />
          <Route path="/drivers/details/:driverId" element={<DriverDetails flags={flags} year={year} />} />
          <Route path="/races" element={<Races flags={flags} year={year} />} />
          <Route path="/races/details/:raceName" element={<RacesDetails flags={flags} year={year} />} />
          <Route path="/teams" element={<Teams flags={flags} year={year} />} />
          <Route path="/teams/details/:constructorId" element={<TeamResults flags={flags} year={year} />} />
          <Route path="/smallCard" element={<SmallCardView flags={flags} search={search} year={year} />} />
          <Route path="/bigCard" element={<BigCardView flags={flags} search={search} year={year} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App