import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Loader from "../components/Loader";
import getFlagShortName from '../helpers/getFlagsCountry.js'
import Flag from 'react-flagkit';
import getFlag from '../helpers/getFlagsNationality.js'
import Breadcrumbs from "../components/Breadcrumbs"
import FilterText from "../components/FilterText"
import SelectYear from "../components/SelectYear"
import Error from "../components/Error.jsx";
import Error2 from "../components/Error2.jsx";


export default function Races(props) {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredRaces, setFilteredRaces] = useState([]);
    const [year, setYear] = useState("2013");
    const navigate = useNavigate();
    const [error, setError] = useState(true);
    const [error2, setError2] = useState(null);

    useEffect(() => {
        getRaces();
    }, [props.year]);

    useEffect(() => {
        const matchRaces = races.filter((race) => race.raceName.toLowerCase().includes(search.toLowerCase()));
        setFilteredRaces(matchRaces);
    }, [search, races])

    const getRaces = async () => {
        try {
            setError(false)
            const url = `https://api.jolpi.ca/ergast/f1/${props.year}/results/1.json`;
            const response = await axios.get(url);
            setRaces(response.data.MRData.RaceTable.Races);
        }

        catch (e) {
            setError(true);

        }
        finally {
            setLoading(false);
        }
        setLoading(false);
    };

    const handleClick = (id) => {
        navigate(`/races/details/${id}`);
    };

    const handleClickDriver = (id) => {
        navigate(`/drivers/details/${id}`);
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

    const racesCrumbs = [
        { path: "", label: "Races" }
    ];

    return (
        <div className="mainScreen">
            <div className="header">
                <div className="Breadcrumbs-main">
                    <Breadcrumbs crumbs={racesCrumbs} />
                </div>

                <div className="search-div">
                    <FilterText type="text" label="driver" value={search} change={(e) => setSearch(e.target.value)} />

                </div>
            </div>
            <h1 style={{
                fontSize: "3rem", color: "Black"
            }}>Race Calendar</h1>
            <div className="table-div">
                <table className="table">
                    <thead>
                        <tr>
                            <th colSpan={5} className="table-head">
                                <h4>Drivers Championship Standings - {props.year}</h4>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Circuit</th>
                            <th>Date</th>
                            <th>Winner</th>
                        </tr>
                        {filteredRaces.length === 0 && (
                            <tr className="searchError" >

                                <h1 >No Race match criteria ... try again</h1>
                                <img src="/General/travolta.gif" />


                            </tr>
                        )}
                        {filteredRaces.map((race) => {
                            return (
                                <tr key={race.round}>
                                    <td>{race.round}</td>
                                    <td onClick={() => handleClick(race.round)} className="td-flag on-click"><Flag country={getFlagShortName(props.flags, race.Circuit.Location.country)} /> {race.raceName}</td>
                                    <td>{race.Circuit.circuitName}</td>
                                    <td>{race.date}</td>
                                    <td onClick={() => handleClickDriver(race.Results[0].Driver.driverId)}
                                        className="td-flag on-click"><Flag country={getFlag(props.flags, race.Results[0].Driver.nationality)} /> {race.Results[0].Driver.familyName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}