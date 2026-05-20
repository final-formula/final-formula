import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useParams } from "react-router";

export default function TeamResults() {

    const [teamResults, setTeamResults] = useState([]);
    const [teamDetails, setTeamDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    const handleClick = () => {
        console.log("click");
    }

    useEffect(() => {
        getTeamResults();
    }, []);

    const getTeamResults = async () => {
        console.log("params", params);
        const urlTeamDetails = `https://api.jolpi.ca/ergast/f1/2013/constructors/${params.id}/results.json`;
        const urlTeamResults = `https://api.jolpi.ca/ergast/f1/2013/constructorStandings.json`
        const response = await axios.get(urlTeamDetails);
        const response2 = await axios.get(urlTeamResults)
        console.log(response.data);
        setTeamDetails(response.data.MRData.ConstructorStandings.Constructor)
        setTeamResults(response2.data.MRData);
        setLoading(false);
    }
    console.log(setTeamDetails);


    if (loading) {
        return <Loader />
    }

    console.log(teamResults);

    return (
        <div>
            <div>


                <h2>Team details</h2>
                <p>Name {teamDetails.Constructor.name} </p>
                <p>Country: {teamDetails.Constructor.nationality} </p>
                {/* <p>Position: {teamDetails.position} </p> */}
                {/* <p>Points: {teamDetails.points} </p> */}

            </div>







            {teamResults.map((item) => {
                return (
                    <div>
                        {/* <img src="" /> */}
                        <div>
                            {/* <img src={ } /> */}
                            {/* <h3>{item.Constructor.name}</h3> */}
                        </div>
                        <div>
                            {/* <p>Country: {item.Results[0].Constructor.nationality}</p> */}
                            {/* <p>Position: {item.Results[0].position}</p> */}
                            {/* <p>Points: {item.Results[0].points}</p> */}

                        </div>
                    </div>
                );
            })}
        </div>
    );
}
