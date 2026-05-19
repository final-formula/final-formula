import { useEffect, useState } from "react"
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";


export default function Teams() {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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

    const handleClick = (id) => {

        navigate(`/teams/details/${id}`);


    };

    if (loading) {
        return <Loader />
    }

    console.log("teams", teams)

    return (
        <div>
            <h2>Constructors Championship</h2>
            <table>
                <thead>
                    <tr>
                        <th>Constructors Championship Standings - 2013</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => {
                        return (
                            <tr key={team.position}>
                                <td>{team.position}</td>
                                <td>{team.Constructor.name}</td>
                                <td>Details</td>
                                <td>{team.points}</td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </div>
    )
}




