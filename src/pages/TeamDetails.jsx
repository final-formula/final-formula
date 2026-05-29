import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import { useParams } from "react-router";
import Flag from 'react-flagkit';
import getFlagShortName from '../helpers/getFlagsCountry.js'
import getPositionColor from "../helpers/positionColors.js";
import getFlag from '../helpers/getFlagsNationality.js'
import Breadcrumbs from "../components/Breadcrumbs.jsx"
import { useNavigate } from "react-router";
import SelectYear from "../components/SelectYear.jsx"
import FilterText from "../components/FilterText.jsx"
import Error from "../components/Error.jsx";
import "../styles/colorChanging.css"
import Error2 from "../components/Error2.jsx";


export default function TeamDetails(props) {

    const [teamResults, setTeamResults] = useState([]);
    const [teamDetails, setTeamDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();
    const [error, setError] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredRaces, setFilteredRaces] = useState([]);
    const [error2, setError2] = useState(null);



    useEffect(() => {
        getTeamResults();
    }, [props.year]);


    useEffect(() => {
        const matchRaces = teamResults.filter((race) => race.raceName.toLowerCase().includes(search.toLowerCase()));


        setFilteredRaces(matchRaces);
    }, [search, teamResults])

    const handleClick = (id) => {

        navigate(`/races/details/${id}`);


    };

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

    const getTeamResults = async () => {
        try {
            setError(false)
            console.log("params", params);
            const urlTeamDetails = `https://api.jolpi.ca/ergast/f1/${props.year}/constructors/${params.constructorId}/constructorStandings.json`
            const urlTeamResults = `https://api.jolpi.ca/ergast/f1/${props.year}/constructors/${params.constructorId}/results.json`
            const response = await axios.get(urlTeamDetails);
            const response2 = await axios.get(urlTeamResults)

            setTeamDetails(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
            setTeamResults(response2.data.MRData.RaceTable.Races);
        }

        catch (e) {
            setError(true);

        }
        finally {
            setLoading(false);
        }
        setLoading(false);
    }

    const sumPoints = (x, y) => {
        return x + y
    }

    if (loading) {
        return <Loader />
    }
    if (error && driverDetails.Driver.driverId === "michael_schumacher" && props.year > 2012) {
        return <Error2 />;
    }
    else if (error) {
        return <Error />
    }


    const teamsDetailsCrumbs = [
        { path: "/teams", label: "Teams" },
        { path: "", label: `${teamDetails.Constructor.name}` }

    ];
    console.log(teamDetails)
    return (
        <div className="mainScreen">
            <div className="header">
                <div className="Breadcrumbs-main">
                    <Breadcrumbs crumbs={teamsDetailsCrumbs} />
                </div>
                <div className="search-div">
                    <FilterText type="text" label="race" value={search} change={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="mainPart">
                <div className="details-screen">
                    <div className="card-container">
                    </div>
                    <div className="bigCardContainer">
                        <div className="bigCard">
                            <div className="leftBigCard">
                                <img src={`/Teams/${teamDetails.Constructor.constructorId}.png`} className="teamImageBigCard" />
                            </div>
                            <div className="rightBigCard">
                                <div className="firstRowBigCard">
                                    <Flag className="flagDetailBigCard" size={200} country={getFlag(props.flags, teamDetails.Constructor.nationality)} />
                                    <p>{teamDetails.Constructor.name}</p>
                                </div>
                                <div className="middlePartBigCard">
                                    <div className="middleLeftBigCard">
                                        <pre>Country:  {teamDetails.Constructor.nationality}</pre>
                                    </div>
                                    <div className="middleRightBigCard">
                                        <pre className="bioBigCard">History:  <a href={teamDetails.Constructor.url} target="_blank"><img src="/General/link-white.png" className="linkIconBigCard" /></a></pre>
                                    </div>
                                </div>
                                <div className="standingsBigCard">
                                    <p>Points: {teamDetails.points}</p>
                                    <p className="positionBigCard">Position: {teamDetails.position}</p>
                                    <p>Wins: {teamDetails.wins}</p>
                                </div>
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
                                    <th>{teamResults[0].Results[0].Driver.familyName}</th>
                                    <th>{teamResults[0].Results[1].Driver.familyName}</th>
                                    <th>Points</th>
                                </tr>
                                {filteredRaces.length === 0 && (
                                    <tr className="searchError" >

                                        <h1 >No Team match criteria ... try again</h1>
                                        <img src="/General/travolta.gif" />


                                    </tr>
                                )}
                                {filteredRaces.map((result) => {
                                    console.log(result)
                                    return (
                                        <tr>
                                            <td style={{ width: '10%' }}>{result.round}</td>
                                            <td onClick={() => handleClick(result.round)} className="td-flag" style={{ width: '40%' }}>
                                                <Flag country={getFlagShortName(props.flags, result.Circuit.Location.country)} />{result.raceName}</td>
                                            <td className={getPositionClass(result.Results[0]?.position)}
                                                style={{
                                                    backgroundColor: getPositionColor(result.Results[0]?.position),
                                                    width: "20%"
                                                }}>
                                                {result.Results[0]?.position ?? "N/A"}</td>
                                            <td className={getPositionClass(result.Results[1]?.position)}
                                                style={{
                                                    backgroundColor: getPositionColor(result.Results[1]?.position),
                                                    width: "20%"
                                                }}>
                                                {result.Results[1]?.position ?? "N/A"}</td>
                                            <td style={{ width: '10%' }}>{sumPoints(Number(result.Results[0]?.points ?? 0), Number(result.Results[1]?.points ?? 0))}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div >
    );
}
