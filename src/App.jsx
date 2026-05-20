import { BrowserRouter, Routes, Route, Link } from "react-router"
import Home from "./pages/Home"
import Races from "./pages/Races"
import Teams from "./pages/Teams"
import DriverDetails from "./pages/DriverDetails"
import RacesDetalis from "./pages/RacesDetails"
import './App.css'
import Drivers from "./pages/Drivers";
import TeamResults from "./pages/TeamResults";
import Flag from 'react-flagkit';
import { useState, useEffect } from 'react'
import Loader from "./components/Loader"

function App() {

  const [flags, setFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  console.log(flags);


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
          <Route path="/" element={<Home flags={flags} />} />
          <Route path="/drivers" element={<Drivers flags={flags} />} />
          <Route path="/drivers/details/:driverId" element={<DriverDetails flags={flags} />} />
          <Route path="/races" element={<Races flags={flags} />} />
          <Route path="/races/details/:raceName" element={<RacesDetalis flags={flags} />} />
          <Route path="/teams" element={<Teams flags={flags} />} />
          <Route path="/teams/details/:constructorId" element={<TeamResults flags={flags} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App