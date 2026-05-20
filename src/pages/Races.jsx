import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";

export default function Races() {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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


    const handleClick = (id) => {

        navigate(`/races/details/${id}`);


    };

    if (loading) {
        return <Loader />
    }



    return (
        <div>
            <h1>2013 F1 Race Winners</h1>
            <table className="racesTable">
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
                            <tr key={race.round}
                                onClick={() => handleClick(race.round)}
                            >
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