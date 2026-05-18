import { useEffect, useState } from "react"
import axios from "axios";
import Loader from "../components/Loader";

export default function Teams() {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2013/constructorStandings.json";
        const response = await axios.get(url);
        console.log(response.data.MRData);
        setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setLoading(false);
    }

    if (loading) {
        return <Loader />
    }
    console.log("teams", teams)
    return (
        <div>
            <h2>Constructors Championship</h2>
            <table>
                <tr>
                    <th>Constructors Championship Standings - 2013</th>
                </tr>
                <tbody>
                    {teams.map((team, i) => {
                        return (
                            <tr key={i}>
                                <td>{team.position}</td>
                                <td>{team.Constructor.name}</td>
                                <td>detail</td>
                                <td>{team.points}</td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </div>
    )
}




// 'https://api.jolpi.ca/ergast/f1/' + year + '/constructorStandings.json'