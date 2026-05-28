import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
import getFlag from "../helpers/getFlagsNationality";
import Flag from "react-flagkit";
import SelectYear from "../components/SelectYear";
import FilterText from "../components/FilterText.jsx";
import Breadcrumbs from "../components/Breadcrumbs";
import getFlagShortName from "../helpers/getFlagsCountry";
import Error from "../components/Error.jsx";
import "../styles/bigCardView.css"


export default function BigCardFunction(props) {

    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredDriver, setFilteredDriver] = useState([]);
    const [year, setYear] = useState("2013");
    const [error, setError] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getDrivers();
    }, [props.year]);

    useEffect(() => {
        const matchDrivers = drivers.filter((driver) =>
            driver.Driver.givenName.toLowerCase().includes(search.toLowerCase()) ||
            driver.Driver.familyName.toLowerCase().includes(search.toLowerCase()))
        setFilteredDriver(matchDrivers);
    }, [search, drivers])

    const getDrivers = async () => {
        try {
            setError(false)
            const driversUrl = `https://api.jolpi.ca/ergast/f1/${props.year}/driverstandings.json`;
            const response = await axios.get(driversUrl);
            setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);

        }
        catch (e) {
            console.log(e.message);
            setError(e.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleClick = (id) => {
        navigate(`/drivers/details/${id}`);
    }

    if (loading) {
        return <Loader />
    }
    if (error) {
        return <Error />;
    }

    const driversCrumbs = [
        { path: "", label: "Drivers" }
    ];

    console.log("driversDrivers", drivers);

    return (
        <div className="mainScreenBigCard">
            <div className="headerBigCard">
                <div className="searchDiv">
                    <FilterText type="text" label="driver" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button onClick={() => setSearch("")}>clear</button>    
                </div>
                <div>
                    <Breadcrumbs crumbs={driversCrumbs} />
                </div>
            </div>
            <div className="bigCardContainer">
                {filteredDriver.map((driver, i) => {
                    return (
                        <div className="bigCard" onClick={() => handleClick(driver.Driver.driverId)} key={i}>
                            <div className="leftBigCard">
                                <img src={`/Drivers/${driver.Driver.driverId}.jpg`} className="teamImageBigCard" />
                            </div>
                            <div className="rightBigCard">
                                <div className="firstRowBigCard">
                                    <Flag className="flagDetailBigCard" size={200} country={getFlag(props.flags, driver.Driver.nationality)} />
                                    <p>{driver.Driver.givenName} {driver.Driver.familyName}</p>
                                </div>
                                <div className="middlePartBigCard">
                                    <div className="middleLeftBigCard">
                                        <pre>Country:  {driver.Driver.nationality}</pre>
                                        <pre>Team:  {driver.Constructors[0].name}</pre>
                                    </div>
                                    <div className="middleRightBigCard">
                                        <pre>Birth:  {driver.Driver.dateOfBirth}</pre>
                                        <pre className="bioBigCard">Biography:  <a href={driver.Driver.url} target="_blank"><img src="/General/link-white.png" className="linkIconBigCard" /></a></pre>
                                    </div>
                                </div>
                                <div className="standingsBigCard">
                                    <p>Points: {driver.points}</p>
                                    <p className="positionBigCard">Position: {driver.position}</p>
                                    <p>Wins: {driver.wins}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}