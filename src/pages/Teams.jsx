import { useEffect, useState } from "react"
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
import Flag from 'react-flagkit';
import getFlag from '../helpers/getFlagsNationality.js'


export default function Teams(props) {

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

    // const getFlag = (flags, country) => {
    //     const flag = flags.find(flag => flag.nationality === country);
    //     console.log(flag)
    //     return flag?.alpha_2_code;
    // };

    const handleClick = (id) => {
        navigate(`/teams/details/${id}`);
    };

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h2>Constructors Championship</h2>
            <table className="teamTable">
                <thead>
                    <tr>
                        <th colSpan={4}>Constructors Championship Standings - 2013</th>

                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => {
                        return (
                            <tr key={team.Constructor.constructorId}>
                                <td>{team.position}</td>
                                <td
                                    onClick={() => handleClick(team.Constructor.constructorId)}> <Flag country={getFlag(props.flags, team.Constructor.nationality)} /> {team.Constructor.name}

                                </td>
                                <td>Details <a href={team.Constructor.url} target="_blank"><img src="./link-black.png" className="link-icon" /></a></td>
                                <td>{team.points}</td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </div >
    )
}




