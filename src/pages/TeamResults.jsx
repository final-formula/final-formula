import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useParams } from "react-router";
import Flag from 'react-flagkit';
import getFlagShortName from '../helpers/getFlagsCountry.js'
import getPositionColor from '../helpers/positionColors.js'
import getFlag from '../helpers/getFlagsNationality.js'
import Breadcrumbs from "../components/Breadcrumbs"
import { useNavigate } from "react-router";

export default function TeamResults(props) {

    const [teamResults, setTeamResults] = useState([]);
    const [teamDetails, setTeamDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();



    useEffect(() => {
        getTeamResults();
    }, []);

    const handleClick = (id) => {

        navigate(`/races/details/${id}`);


    };

    const getTeamResults = async () => {
        console.log("params", params);
        const urlTeamDetails = `https://api.jolpi.ca/ergast/f1/2013/constructors/${params.constructorId}/constructorStandings.json`
        const urlTeamResults = `https://api.jolpi.ca/ergast/f1/2013/constructors/${params.constructorId}/results.json`
        const response = await axios.get(urlTeamDetails);
        const response2 = await axios.get(urlTeamResults)

        setTeamDetails(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        setTeamResults(response2.data.MRData.RaceTable.Races);
        setLoading(false);
    }

    const sumPoints = (x, y) => {
        return x + y
    }

    if (loading) {
        return <Loader />
    }

    console.log("res", teamResults);
    console.log("det", teamDetails);

    const teamsDetailsCrumbs = [
        { path: "/teams", label: "Teams" },
        { path: "/teams/details/:constructorId", label: `${teamDetails.Constructor.name}` }

    ];

    return (
        <div className="mainScreen">
            <div className="header">
                <div className="search-div">

                </div>
                <div className="Breadcrumbs-main">
                    <Breadcrumbs crumbs={teamsDetailsCrumbs} />
                </div>
            </div>
            <div className="mainPart">
                <div className="details-screen">
                    <div className="card-container">
                        <div className="card">
                            <div className="upper-card">
                                <div className="left-side">
                                    <img src={`../../${teamDetails.Constructor.constructorId}.png`} className="team-image" />
                                </div>

                                <div className="right-side">
                                    <Flag className="flag-detail" size={84} country={getFlag(props.flags, teamDetails.Constructor.nationality)} />
                                    <p>{teamDetails.Constructor.name} </p>
                                </div>
                            </div>
                            <div className="lower-card">
                                <pre>Country:    {teamDetails.Constructor.nationality}</pre>
                                <pre>Position:   {teamDetails.position}</pre>
                                <pre>Points:     {teamDetails.points}</pre>
                                <pre>History:   <a href={teamDetails.Constructor.url} target="_blank"> <img src="../../../public/link-white.png" className="link-icon" /></a></pre>
                            </div>
                        </div>





                    </div>
                    <div className="table-div-details">
                        <table className="table-details">
                            <thead>
                                <tr>
                                    <td colSpan={5}><h3>Formula 1 2013 Results</h3></td>
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
                                {teamResults.map((result) => {
                                    console.log(result)
                                    return (
                                        <tr>
                                            <td>{result.round}</td>
                                            <td onClick={() => handleClick(result.round)} className="td-flag"><Flag country={getFlagShortName(props.flags, result.Circuit.Location.country)} />{result.raceName}</td>
                                            <td style={{ backgroundColor: getPositionColor(result.Results[0]?.position) }}>{result.Results[0].position}</td>
                                            <td style={{ backgroundColor: getPositionColor(result.Results[1]?.position) }}>{result.Results[1].position}</td>
                                            <td>{sumPoints(Number(result.Results[0].points), Number(result.Results[1].points))}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>



            </div>




        </div>
    );
}
