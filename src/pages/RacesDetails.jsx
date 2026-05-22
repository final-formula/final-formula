import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useParams } from "react-router";
import Flag from 'react-flagkit';
import getFlagShortName from '../helpers/getFlagsCountry.js'
import getFlag from '../helpers/getFlagsNationality.js'
import { useNavigate } from "react-router";
import getPositionColor from '../helpers/positionColors.js'
import Breadcrumbs from "../components/Breadcrumbs"
import FilterText from "../components/FilterText"
import SelectYear from "../components/SelectYear"


export default function RacesDetails(props) {
    const [qualifiers, setQualifiers] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredResults, setFilteredResults] = useState([])
    const [filteredQualifiers, setFilteredQualifiers] = useState([])
    const navigate = useNavigate();
    const [year, setYear] = useState("2013");

    const params = useParams();

    useEffect(() => {
        getRaceDetails();
    }, [year]);

    useEffect(() => {
        const matchQualifiers = qualifiers.filter((driver) => driver.Driver.givenName.toLowerCase().includes(search.toLowerCase()) ||
            driver.Driver.familyName.toLowerCase().includes(search.toLowerCase()));
        console.log("results ", results);
        const matchResults = results.Results?.filter((result) =>
            result.Driver.familyName.toLowerCase().includes(search.toLowerCase()));
        setFilteredQualifiers(matchQualifiers);
        console.log("matchResults ", matchResults)
        setFilteredResults(matchResults);
    }, [search, qualifiers, results])

    const handleClick = (id) => {

        navigate(`/drivers/details/${id}`);


    };


    const getRaceDetails = async () => {
        const urlQualifying = `https://api.jolpi.ca/ergast/f1/${year}/${params.raceName}/qualifying.json`;
        const urlResults = `https://api.jolpi.ca/ergast/f1/${year}/${params.raceName}/results.json`;

        const responseQualifying = await axios.get(urlQualifying);
        const responseResults = await axios.get(urlResults);

        setQualifiers(responseQualifying.data.MRData.RaceTable.Races[0].QualifyingResults);
        setResults(responseResults.data.MRData.RaceTable.Races[0]);

        setLoading(false);
    };

    const getFastestTime = ((time1, time2, time3) => {
        const times = [];
        times.push(time1, time2, time3);

        times.sort();

        return times[0] ? times[0] : "DNQ"


    })

    getFastestTime("2:36", "2:37", "1:25")

    if (loading) {
        return <Loader />
    }

    console.log("qualifiers", qualifiers);
    console.log("results", results);
    const racesDetailsCrumbs = [
        { path: "/races", label: "Races" },
        { path: "/races/details/:raceName", label: `${results.Circuit.circuitName}` }

    ];

    return (


        <div className="mainScreen">
            <div className="header">
                <SelectYear value={year} change={(e) => setYear(e.target.value)} />
                <div className="search-div">
                    <FilterText type="text" label="race" value={search} change={(e) => setSearch(e.target.value)} />
                    <button onClick={() => setSearch("")}>clear</button>
                </div>
                <div className="Breadcrumbs-main">
                    <Breadcrumbs crumbs={racesDetailsCrumbs} />
                </div>
            </div>
            <div className="mainPart">
                <div className="details-screen">
                    <div className="card-container-country">
                        <div className="card-country">
                            <div className="upper-card-country">

                                <Flag size={150} country={getFlagShortName(props.flags, results.Circuit.Location.country)} />
                                <p>{results.Circuit.circuitName}</p>
                            </div>
                            <div className="lower-card-country">
                                <pre>Country:     {results.Circuit.Location.country}</pre>
                                <pre>Location:    {results.Circuit.Location.locality}</pre>
                                <pre>Date:        {results.date}</pre>
                                <pre>Full Report: <a href={results.url} target="_blank"><img src="../../../public/link-white.png" className="link-icon" /></a></pre>
                            </div>


                        </div>

                    </div>
                    <div className="table-div-details">

                        <table className="table-details">
                            <thead>

                                <tr>

                                    <th colSpan={4}><h3>2013 qualifying results</h3></th>

                                </tr>

                            </thead>
                            <tbody>
                                <tr>
                                    <th>Pos</th>
                                    <th>Driver</th>
                                    <th>Team</th>
                                    <th>Best Time</th>
                                </tr>
                                {filteredQualifiers.map((position) => {
                                    return (



                                        <tr key={position.position}>
                                            <td>{position.position}</td>
                                            <td className="td-flag on-click" onClick={() => handleClick(position.Driver.driverId)}><Flag country={getFlag(props.flags, position.Driver.nationality)} />{position.Driver.givenName} {position.Driver.familyName}</td>
                                            <td>{position.Constructor.name}</td>
                                            <td>{getFastestTime(position.Q1, position.Q2, position.Q3)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                    <div className="table-div-details">

                        <table className="table-details">
                            <thead>
                                <tr>

                                    <th colSpan={5}><h3>Race results</h3></th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Pos</th>
                                    <th>Driver</th>
                                    <th>Team</th>
                                    <th>Result</th>
                                    <th>Points</th>
                                </tr>
                                {filteredResults?.map((result) => {
                                    return (
                                        <tr key={result.raceName}>
                                            <td>{result.position}</td>
                                            <td onClick={() => handleClick(result.Driver.driverId)} className="td-flag on-click"><Flag country={getFlag(props.flags, result.Driver.nationality)} />{result.Driver.familyName} </td>
                                            <td>{result.Constructor.name}</td>
                                            <td>{result?.Time?.time || "DNQ"}</td>
                                            <td style={{ backgroundColor: getPositionColor(result.position) }}>{result.points}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>




            </div>









        </div>
    );
}     
