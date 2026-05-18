import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";

export default function Races() {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRaces();
    }, []);



    const getRaces = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2013/results/1.json";
        console.log(url)
        const response = await axios.get(url);
        console.log("1", response.data.MRData)
        setRaces(response.data.MRData.RaceTable.Races);
        setLoading(false);
    };

    if (loading) {
        return <Loader />
    }

console.log("races", races)

    return (
        <div>
            <h1>2013 F1 Race Winners</h1>
            <table>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Winner</th>
                    </tr>

                </thead>
                <tbody>
                    {races.map((race) => {
                        return (
                             <tr key={race.round}>
                                <td>{race.round}</td>
                                <td>{race.raceName}</td>
                                <td>{race.Circuit.circuitName}</td>
                                <td>{race.date}</td>
                                <td>{race.Results[0].Driver.familyName}</td>
                            </tr>


                        );
                    })}
                </tbody>
            </table>

        </div>
    );
}