import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
import getFlag from "../helpers/getFlagsNationality";
import Flag from "react-flagkit";
import SelectYear from "../components/SelectYear";
import FilterText from "../components/FilterText";
import Breadcrumbs from "../components/Breadcrumbs";
import getFlagShortName from "../helpers/getFlagsCountry";

export default function BigCardFunction(props) {

    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredDriver, setFilteredDriver] = useState([]);
    const [year, setYear] = useState("2013");

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
        const driversUrl = `https://api.jolpi.ca/ergast/f1/${props.year}/driverstandings.json`;
        const response = await axios.get(driversUrl);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setLoading(false);
    }

    const handleClick = (id) => {
        navigate(`/drivers/details/${id}`);
    }

    if (loading) {
        return <Loader />
    }

    const driversCrumbs = [
        { path: "", label: "Drivers" }
    ];

    console.log("driversDrivers", drivers);

    return (
        <div className="mainScreen">
            <div className="header">



            </div>
            <div className="bigCardContainer">
                {filteredDriver.map((driver, i) => {
                    return (
                        <div className="big-card" onClick={() => handleClick(driver.Driver.driverId)} key={i}>
                            <div className="left-bigCard">
                                <img src={`/Drivers/${driver.Driver.driverId}.jpg`} className="team-image" />
                            </div>
                            <div className="right-bigCard">
                                <div className="first-row">
                                    <Flag className="flag-detail" size={200} country={getFlag(props.flags, driver.Driver.nationality)} />
                                    <p>{driver.Driver.givenName} {driver.Driver.familyName}</p>
                                </div>
                                <div className="middlePart">
                                    <div className="middleLeft">
                                        <pre>Country:     {driver.Driver.nationality}</pre>
                                        <pre>Team:        {driver.Constructors[0].name}</pre>
                                    </div>
                                    <div className="middleRight">
                                        <pre>Birth: {driver.Driver.dateOfBirth}</pre>
                                        <pre className="bio">Biography: <a href={driver.Driver.url} target="_blank"><img src="../../../public/link-white.png" className="link-icon" /></a></pre>
                                    </div>
                                </div>
                                <div className="standingsBigCard">
                                    <p>Points: {driver.points}</p>
                                    <p className="position">Position: {driver.position}</p>
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