import Loader from "../components/Loader";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Drivers from "./Drivers";
import Flag from 'react-flagkit';
import getFlagShortName from '../helpers/getFlagsCountry.js'
import getFlag from '../helpers/getFlagsNationality.js'
import { useNavigate } from "react-router";
import getPositionColor from '../helpers/positionColors.js'
import Breadcrumbs from "../components/Breadcrumbs"
import FilterText from "../components/FilterText"
import SelectYear from "../components/SelectYear"

export default function DriverDetails(props) {

    const [driverDetails, setDriverDetails] = useState(null);
    const [driverRaces, setDriverRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredDrivers, setFilteredDrivers] = useState([])
    const navigate = useNavigate();
    const params = useParams();

    const handleClickRace = (id) => {
        navigate(`/races/details/${id}`);
    };

    useEffect(() => {
        getDriverDetails();
    }, [props.year]);

    useEffect(() => {
        const matchRaces = driverRaces.filter((driver) => driver.raceName.toLowerCase().includes(search.toLowerCase()));
        setFilteredDrivers(matchRaces);
    }, [search, driverRaces])

    const getDriverDetails = async () => {
        const urlDriverDetails = `https://api.jolpi.ca/ergast/f1/${props.year}/drivers/${params.driverId}/driverStandings.json`;
        const urlDriverRace = `https://api.jolpi.ca/ergast/f1/${props.year}/drivers/${params.driverId}/results.json`;
        const responseDriverDetails = await axios.get(urlDriverDetails);
        const responseDriverRace = await axios.get(urlDriverRace);
        setDriverDetails(responseDriverDetails.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        setDriverRaces(responseDriverRace.data.MRData.RaceTable.Races)
        setLoading(false);
    };

    if (loading) {
        return <Loader />;
    }

    const driversDetailsCrumbs = [
        { path: "/drivers", label: "Drivers" },
        { path: "", label: `${driverDetails.Driver.givenName} ${driverDetails.Driver.familyName}` }
    ];

    return (
        <div className="mainScreen">
            <div className="header">
                <div className="search-div">
                    <FilterText type="text" label="race" value={search} change={(e) => setSearch(e.target.value)} />
                    <button onClick={() => setSearch("")}>clear</button>
                </div>
                <div className="Breadcrumbs-main">
                    <Breadcrumbs crumbs={driversDetailsCrumbs} />
                </div>
            </div>
            <div className="details-screen">
                <div className="card-container">
                    <div className="card">
                        <div className="upper-card">
                            <div className="left-side">
                                <img src={`/${driverDetails.Driver.driverId}.jpg`} className="team-image" />
                            </div>
                            <div className="right-side">
                                <Flag className="flag-detail" size={60} country={getFlag(props.flags, driverDetails.Driver.nationality)} />
                                <p>{driverDetails.Driver.givenName} {driverDetails.Driver.familyName} </p>
                            </div>
                        </div>
                        <div className="lower-card">
                            <pre>Country: {driverDetails.Driver.nationality}</pre>
                            <pre>Team:    {driverRaces[0].Results[0].Constructor.name} </pre>
                            <pre>Birth:   {driverRaces[0].Results[0].Driver.dateOfBirth} </pre>
                            <pre>Biography:  <a href={driverDetails.Driver.url} target="_blank"><img src="./link-white.png" className="link-icon" /></a></pre>
                        </div>
                    </div>
                </div>
                <div className="table-div-details">
                    <table className="table-details">
                        <thead>
                            <tr>
                                <td colSpan={5}><h3>Formula 1 {props.year} Results</h3></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Round</th>
                                <th>Grand Prix</th>
                                <th>Team</th>
                                <th>Grid</th>
                                <th>Race</th>
                            </tr>
                            {filteredDrivers.map((details) => {
                                return (
                                    <tr key={details.driverId} >

                                        <td>{details.round}</td>
                                        <td onClick={() => handleClickRace(details.round)} className="td-flag on-click"><Flag country={getFlagShortName(props.flags, details.Circuit.Location.country)} /> {details.raceName}</td>
                                        <td> {details.Results[0].Constructor.name}</td>
                                        <td> {details.Results[0].grid}</td>
                                        <td style={{ backgroundColor: getPositionColor(details.Results[0].position) }}> {details.Results[0].position}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}