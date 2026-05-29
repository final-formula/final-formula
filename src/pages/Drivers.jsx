import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
import getFlag from '../helpers/getFlagsNationality.js'
import Flag from 'react-flagkit';
import FilterText from "../components/FilterText"
import Breadcrumbs from "../components/Breadcrumbs"
import SelectYear from "../components/SelectYear"
import SearchBar from "../components/SearchBar";
import Error from "../components/Error.jsx";
import Error2 from "../components/Error2.jsx";


export default function Drivers(props) {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredDriver, setFilteredDriver] = useState([]);
    const [error, setError] = useState(null);
    const [error2, setError2] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getDrivers();
    }, [props.year]);

    useEffect(() => {
        const matchDrivers = drivers.filter((driver) => driver.Driver.givenName.toLowerCase().includes(search.toLowerCase()) ||
            driver.Driver.familyName.toLowerCase().includes(search.toLowerCase()));
        setFilteredDriver(matchDrivers);
    }, [search, drivers])

    const getDrivers = async () => {
        try {
            setError(false)
            const url = `https://api.jolpi.ca/ergast/f1/${props.year}/driverstandings.json`;
            const response = await axios.get(url);
            setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);

        }
        catch (e) {
            console.log(e.message);
            setError(e.message);
        }
        finally {
            setLoading(false);
        }
    };

    const handleClick = (id) => {
        navigate(`/drivers/details/${id}`);
    };

    const handleClickTeam = (id) => {
        navigate(`/teams/details/${id}`);
    };
    const handleClear = () => {
        setSearch("");
    };

    if (loading) {
        return <Loader />
    }

    if (error && driverDetails.Driver.driverId === "michael_schumacher" && props.year > 2012) {
        return <Error2 />;
    }
    else if (error) {
        return <Error />
    }

    const driversCrumbs = [
        { path: "", label: "Drivers" }
    ];

    return (
        <>
            <div className="mainScreen">
                <div className="header">
                    <div className="Breadcrumbs-main">
                        <Breadcrumbs crumbs={driversCrumbs} />
                    </div>

                    <div className="search-div">
                        <FilterText type="text" label="driver" value={search} change={(e) => setSearch(e.target.value)} />

                    </div>

                </div>
                <h1 style={{
                    fontSize: "3rem", color: "black"
                }}>Drivers Championship</h1>
                <div className="table-div">

                    <table className="table">
                        <tbody className="table-body">
                            {filteredDriver.length === 0 && (
                                <tr>
                                    <td colSpan="4">No Driver match criteria ... try again</td>
                                </tr>
                            )}
                            <tr>
                                <th>Position</th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Points</th>
                            </tr>
                            {filteredDriver.map((driver) => {
                                return (
                                    <tr key={driver.Driver.driverId}>
                                        <td style={{ width: '10%' }}>{driver.position}</td>
                                        <td onClick={() => handleClick(driver.Driver.driverId)} style={{ width: '50%' }}
                                            className="td-flag on-click"> <Flag country={getFlag(props.flags, driver.Driver.nationality)} />
                                            <span>{driver.Driver.givenName} {driver.Driver.familyName}</span></td>


                                        <td onClick={() => handleClickTeam(driver.Constructors[0].constructorId)} style={{ width: '30%' }} className="on-click">
                                            {driver.Constructors[0].name}</td>
                                        <td style={{ width: '30%' }}> {driver.points}</td>
                                    </tr>
                                )
                            })}
                        </tbody >
                    </table >
                </div>
            </div >
        </ >
    )
}