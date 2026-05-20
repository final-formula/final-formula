import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useParams } from "react-router";
import Flag from 'react-flagkit';
import getFlagShortName from '../helpers/getFlagsCountry.js'

import getFlag from '../helpers/getFlagsNationality.js'

export default function TeamResults(props) {

    const [teamResults, setTeamResults] = useState([]);
    const [teamDetails, setTeamDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();



    useEffect(() => {
        getTeamResults();
    }, []);

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

    console.log(teamResults);
    // console.log(teamDetails);

    return (
        <div>

            <div>
                <img src={`../../${teamDetails.Constructor.constructorId}.png`} className="team-image" />
                <div>
                    <Flag country={getFlag(props.flags, teamDetails.Constructor.nationality)} />
                    <p>Name {teamDetails.Constructor.name} </p>
                </div>


                <div>
                    <p>{teamDetails.Constructor.nationality}</p>
                    <p>{teamDetails.position}</p>
                    <p>{teamDetails.points}</p>
                    <p>{teamDetails.name}</p>
                </div>

            </div>



            <table>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>{teamResults[0].Results[0].Driver.familyName}</th>
                        <th>{teamResults[0].Results[1].Driver.familyName}</th>
                        <th>Points</th>


                    </tr>

                </thead>
                <tbody>
                    {teamResults.map((result) => {
                        return (
                            <tr>
                                <td>{result.round}</td>
                                <td><Flag country={getFlagShortName(props.flags, result.Circuit.Location.country)} />{result.raceName}</td>
                                <td>{result.Results[0].position}</td>
                                <td>{result.Results[1].position}</td>
                                <td>{sumPoints(Number(result.Results[0].points), Number(result.Results[1].points))}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
