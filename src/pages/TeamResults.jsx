import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useParams } from "react-router";

export default function TeamResults() {

    const [teamResults, setTeamResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        getTeamResults();
    }, []);

    const getTeamResults = async () => {
        console.log("params", params);
        const url = `https://api.jolpi.ca/ergast/f1/2013/constructors/${params.id}/results.json`;
        const response = await axios.get(url);
        setTeamResults(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
        setLoading(false);
    }

    console.log(teamResults);

    if(loading) {
        return <Loader />
    }

    return(
        <div>
            {teamResults.map((item) => {
                return(
                    <div>
                        <img src={item.Constructor.nationality} />
                    </div>
                );
            })}
        </div>
    );
}
            