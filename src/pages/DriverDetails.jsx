import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";
import axios from "axios";
import Drivers from "./Drivers";
import Flag from 'react-flagkit';
import getFlagShortName from '../helpers/getFlagsCountry.js'
import getFlag from '../helpers/getFlagsNationality.js'
import getPositionColor from '../helpers/positionColors.js'
import Breadcrumbs from "../components/Breadcrumbs"
import FilterText from "../components/FilterText"
import SelectYear from "../components/SelectYear"
import Error from "../components/Error.jsx";
import "../styles/colorChanging.css"
import Error2 from "../components/Error2.jsx";



export default function DriverDetails(props) {

    const [driverDetails, setDriverDetails] = useState(null);
    const [driverRaces, setDriverRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredDrivers, setFilteredDrivers] = useState([])
    const [error, setError] = useState(true);
    const [error2, setError2] = useState(null);

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


    const getPositionClass = (position) => {

        switch (Number(position)) {

            case 1:
                return "gold";

            case 2:
                return "silver";

            case 3:
                return "bronze";


        }
    };

    const getDriverDetails = async () => {

        try {
            setError(false)
            const urlDriverDetails = `https://api.jolpi.ca/ergast/f1/${props.year}/drivers/${params.driverId}/driverStandings.json`;
            const urlDriverRace = `https://api.jolpi.ca/ergast/f1/${props.year}/drivers/${params.driverId}/results.json`;
            const responseDriverDetails = await axios.get(urlDriverDetails);
            const responseDriverRace = await axios.get(urlDriverRace);
            setDriverDetails(responseDriverDetails.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
            setDriverRaces(responseDriverRace.data.MRData.RaceTable.Races)
        }
        catch (e) {
            setError(true);

        }
        finally {
            setLoading(false);
        }

    };

    if (loading) {
        return <Loader />;
    }

    if (error && driverDetails.Driver.driverId === "michael_schumacher" && props.year > 2012) {
        return <Error2 />;
    }
    else if (error) {
        return <Error />
    }

    const driversDetailsCrumbs = [
        { path: "/drivers", label: "Drivers" },
        { path: "", label: `${driverDetails.Driver.givenName} ${driverDetails.Driver.familyName}` }
    ];

    return (
        <div className="mainScreen">
            <div className="header">
                <div className="Breadcrumbs-main">
                    <Breadcrumbs crumbs={driversDetailsCrumbs} />
                </div>

                <div className="search-div">
                    <FilterText type="text" label="driver" value={search} change={(e) => setSearch(e.target.value)} />

                </div>

            </div>
            <div className="details-screen">

                <div className="bigCard">
                    <div className="leftBigCard">
                        <img src={`/Drivers/${driverDetails.Driver.driverId}.jpg`} className="teamImageBigCard" />
                    </div>
                    <div className="rightBigCard">
                        <div className="firstRowBigCard">
                            <Flag className="flagDetailBigCard" size={200} country={getFlag(props.flags, driverDetails.Driver.nationality)} />
                            <p>{driverDetails.Driver.givenName} {driverDetails.Driver.familyName}</p>
                        </div>
                        <div className="middlePartBigCard">
                            <div className="middleLeftBigCard">
                                <pre>Nationality:  {driverDetails.Driver.nationality}</pre>
                                <pre>Team:  {driverRaces[0].Results[0].Constructor.name}</pre>
                            </div>
                            <div className="middleRightBigCard">
                                <pre>Birth:  {driverRaces[0].Results[0].Driver.dateOfBirth}</pre>
                                <pre className="bioBigCard">Biography:  <a href={driverDetails.Driver.url} target="_blank"><img src="/General/link-white.png" className="linkIconBigCard" /></a></pre>
                            </div>
                        </div>
                        <div className="standingsBigCard">
                            <p>Points: {driverDetails.points}</p>
                            <p className="positionBigCard">Position: {driverDetails.position}</p>
                            <p>Wins: {driverDetails.wins}</p>
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
                            {filteredDrivers.length === 0 && (
                                <tr className="searchError" colSpan={5}>

                                    <h1 >No Team match criteria ... try again</h1>
                                    <img src="/General/travolta.gif" />


                                </tr>
                            )}
                            {filteredDrivers.map((details) => {
                                return (
                                    <tr key={details.driverId} >

                                        <td>{details.round}</td>
                                        <td onClick={() => handleClickRace(details.round)} className="td-flag on-click">
                                            <Flag country={getFlagShortName(props.flags, details.Circuit.Location.country)} /> {details.raceName}</td>
                                        <td> {details.Results[0].Constructor.name}</td>
                                        <td> {details.Results[0].grid}</td>
                                        <td
                                            className={getPositionClass(details.Results[0].position)}
                                            style={{ backgroundColor: getPositionColor(details.Results[0].position) }}
                                        > {details.Results[0].position}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}