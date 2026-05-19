import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";


export default function RacesDetails() {
    const [qualifiers, setQualifiers] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getRaceDetails();
    }, []);


    const getRaceDetails = async () => {
        const urlQualifying = "https://api.jolpi.ca/ergast/f1/2013/qualifying.json";
        const urlResults = "https://api.jolpi.ca/ergast/f1/2013/1/results.json";

        const responseQualifying = await axios.get(urlQualifying);
        const responseResults = await axios.get(urlResults);

        setQualifiers(responseQualifying.data.MRData.RaceTable.Races);
        setResults(responseResults.data.MRData.RaceTable.Races);

        setLoading(false);
    };



    if (loading) {
        return <Loader />
    }

    console.log("qualifiers", qualifiers);
    console.log("results", results);

    return (
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
                    {qualifiers.map((driversResult) => {
                        return (
                            <tr key={driverResult.position}>
                                <td>{driverResult.position}</td>
                                <td>{driverResult.Driver.familyName}</td>
                                <td>{driverResult.time}</td>
                            </tr>


                        );
                    })}
                </tbody>
                <h1>Race Results</h1>
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Result</th>
                        <th>points</th>
                    </tr>
                </thead>
                <body>
                    {results.map((driverResult) =>
                        race.Results.map((driverResult) => (
                            <tr key={driverResult.position}>
                                <td>{driverResult.position}</td>
                                <td>{driverResult.Driver.familyName}</td>
                                <td>{driverResult.Constructor.name}</td>
                              
                            </tr>
                        ))
                    )}


                </body>



            </table>

        </div>
    );
}     
