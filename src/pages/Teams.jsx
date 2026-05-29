import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import axios from "axios";
import Loader from "../components/Loader";
import Flag from 'react-flagkit';
import getFlag from '../helpers/getFlagsNationality.js'
import Breadcrumbs from "../components/Breadcrumbs"
import FilterText from "../components/FilterText"
import SelectYear from "../components/SelectYear"
import Error from "../components/Error.jsx";
import Error2 from "../components/Error2.jsx";

export default function Teams(props) {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [error, setError] = useState(true);
    const [error2, setError2] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, [props.year]);

    const getTeams = async () => {
        try {
            setError(false)
            const url = `https://api.jolpi.ca/ergast/f1/${props.year}/constructorStandings.json`;
            const response = await axios.get(url);

            setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        }

        catch (e) {
            setError(true);

        }
        finally {
            setLoading(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        const matchTeams = teams.filter((team) => team.Constructor.name.toLowerCase().includes(search.toLowerCase()));


        setFilteredTeams(matchTeams);
    }, [search, teams])

    const handleClick = (id) => {
        navigate(`/teams/details/${id}`);
    };


    if (loading) {
        return <Loader />
    }
    if (error && driverDetails.Driver.driverId === "michael_schumacher" && props.year > 2012) {
        return <Error2 />;
    }
    else if (error) {
        return <Error />
    }

    const teamsCrumbs = [
        { path: "", label: "Teams" }

    ];

    return (
        <div className="mainScreen">
            <div className="header">
                <div className="Breadcrumbs-main">
                    <Breadcrumbs crumbs={teamsCrumbs} />
                </div>
                <div className="search-div">
                    <FilterText type="text" label="driver" value={search} change={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <h1 style={{
                fontSize: "3rem", color: "Black"
            }}>Constructors Championship</h1>
            <div className="table-div">
                < table className="table">
                    <thead>
                        <tr>
                            <th colSpan={4}><h3>Constructors Championship Standings - {props.year}</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeams.length === 0 && (
                            <tr className="searchError" colSpan={5}>

                                <h1 >No Team match criteria ... try again</h1>
                                <img src="/General/travolta.gif" />


                            </tr>
                        )}
                        {filteredTeams.map((team) => {
                            return (
                                <tr key={team.Constructor.constructorId}>
                                    <td style={{ width: '10%' }}>{team.position}</td>
                                    <td
                                        style={{ width: '50%' }}
                                        onClick={() => handleClick(team.Constructor.constructorId)} className="td-flag on-click"> <Flag country={getFlag(props.flags, team.Constructor.nationality)} /> {team.Constructor.name}

                                    </td>
                                    <td style={{ width: '20%' }} className="td-link"> <a href={team.Constructor.url} target="_blank">Details <img src="/General/link-black.png" className="link-icon" /></a></td>
                                    <td style={{ width: '20%' }}>{team.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

        </div >
    )
}




