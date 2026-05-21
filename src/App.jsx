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

function App() {

  const [flags, setFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   getUsers();
  // }, []);

  // useEffect(() => {
  //   // const matchUsers = users.filter((user) => user.${}.toLowerCase().includes(search.toLocaleLowerCase()) || user.${}.toLowerCase().includes(search.toLocaleLowerCase()));
  //   console.log(matchUsers);
  //   setFilters(matchUsers)

  // }, [search, users]);

  // const getUsers = async () => {
  //   const url = `https://api.jolpi.ca/ergast/f1/2013/constructors/${params.constructorId}/constructorStandings.json`;
  //   const response = await axios.get(url);
  //   setUsers(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
  //   setLoading(false);
  // };

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
            <div className="homeDiv">
              <Link to="/"><img src="../../public/F1-2013-Legends-Edition.jpg" className="homeImage" /></Link>
            </div>
            <div className="linksDiv">
              <Link to="/drivers"><img src="../../public/Kaciga.png" className="nav-img" /> <span>Drivers</span></Link>
              <Link to="/teams"><img src="../../public/Teams.png" className="nav-img" /> <span>Teams</span></Link>
              <Link to="/races" className="link-races"><img src="../../public/Races1.png" className="nav-img races" /> <span>Races</span></Link>
              <input type="text" value={search} placeholder="Search F1 ..." onChange={(e) => setSearch(e.target.value)} />

            </div>


          </div>


        </nav>
        <Routes>
          <Route path="/" element={<Home flags={flags} />} />
          <Route path="/drivers" element={<Drivers flags={flags} />} />
          <Route path="/drivers/details/:driverId" element={<DriverDetails flags={flags} />} />
          <Route path="/races" element={<Races flags={flags} />} />
          <Route path="/races/details/:raceName" element={<RacesDetails flags={flags} />} />
          <Route path="/teams" element={<Teams flags={flags} />} />
          <Route path="/teams/details/:constructorId" element={<TeamResults flags={flags} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App