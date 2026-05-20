import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useParams } from "react-router";
import Flag from 'react-flagkit';
import getFlagShortName from '../helpers/getFlagsCountry.js'
import getFlag from '../helpers/getFlagsNationality.js'


export default function RacesDetails(props) {
    const [qualifiers, setQualifiers] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        getRaceDetails();
    }, []);


    const getRaceDetails = async () => {
        const urlQualifying = `https://api.jolpi.ca/ergast/f1/2013/${params.raceName}/qualifying.json`;
        const urlResults = `https://api.jolpi.ca/ergast/f1/2013/${params.raceName}/results.json`;

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


    return (


        <>
            <div>

                <h1>{results.Circuit.circuitName}</h1>
                <Flag country={getFlagShortName(props.flags, results.Circuit.Location.country)} />
                <p>Country: {results.Circuit.Location.country}</p>
                <p>Location: {results.Circuit.Location.locality}</p>
                <p>Date: {results.date}</p>
                <p>Date: {results.url}</p>
            </div>
            <div>
                <h1>2013 qualifying results</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Best Time</th>
                        </tr>

                    </thead>
                    <tbody>
                        {qualifiers.map((position) => {
                            return (



                                <tr key={position.position}>
                                    <td>{position.position}</td>
                                    <td><Flag country={getFlag(props.flags, position.Driver.nationality)} />{position.Driver.givenName} {position.Driver.familyName}</td>
                                    <td>{position.Constructor.name}</td>
                                    <td>{getFastestTime(position.Q1, position.Q2, position.Q3)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
            <div>
                <h1>Race results</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Result</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.Results.map((result) => {
                            return (
                                <tr>
                                    <td>{result.position}</td>
                                    <td><Flag country={getFlag(props.flags, result.Driver.nationality)} />{result.Driver.familyName} </td>
                                    <td>{result.Constructor.name}</td>
                                    <td>{result?.Time?.time || "DNQ"}</td>
                                    <td>{result.points}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>









        </>
    );
}     
