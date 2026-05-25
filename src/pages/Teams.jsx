import { useEffect, useState } from "react"
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
import Flag from 'react-flagkit';
import getFlag from '../helpers/getFlagsNationality.js'
import Breadcrumbs from "../components/Breadcrumbs"
import FilterText from "../components/FilterText"
import SelectYear from "../components/SelectYear"


export default function Teams(props) {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [year, setYear] = useState("2013");

    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, [year]);

    const getTeams = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/${year}/constructorStandings.json`;
        const response = await axios.get(url);
        console.log(response.data.MRData);
        setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setLoading(false);
    }

    useEffect(() => {
        const matchTeams = teams.filter((team) => team.Constructor.name.toLowerCase().includes(search.toLowerCase()));


        setFilteredTeams(matchTeams);
    }, [search, teams])

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

    const teamsCrumbs = [
        { path: "", label: "Teams" }

    ];

    return (
        <div className="mainScreen">
            <div className="header">
                {/* <SelectYear value={year} change={(e) => setYear(e.target.value)} /> */}
                <div className="search-div">
                    <FilterText type="text" label="team" value={search} change={(e) => setSearch(e.target.value)} />
                    <button onClick={() => setSearch("")}>clear</button>
                </div>
                <div className="Breadcrumbs-main">
                    <Breadcrumbs crumbs={teamsCrumbs} />
                </div>
            </div>
            <h1>Constructors Championship</h1>
            <div className="table-div">
                <table className="table">
                    <thead>
                        <tr>
                            <th colSpan={4}><h3>Constructors Championship Standings - 2013</h3></th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeams.length === 0 && (
                            <h1>No Team match criteria ... try again</h1>
                        )}
                        {filteredTeams.map((team) => {
                            return (
                                <tr key={team.Constructor.constructorId}>
                                    <td style={{ width: '10%' }}>{team.position}</td>
                                    <td
                                        style={{ width: '50%' }}
                                        onClick={() => handleClick(team.Constructor.constructorId)} className="td-flag on-click"> <Flag country={getFlag(props.flags, team.Constructor.nationality)} /> {team.Constructor.name}

                                    </td>
                                    <td style={{ width: '20%' }} className="td-link"> <a href={team.Constructor.url} target="_blank">Details <img src="./link-black.png" className="link-icon" /></a></td>
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




