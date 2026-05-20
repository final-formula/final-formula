import Loader from "../components/Loader";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Drivers from "./Drivers";




export default function DriverDetails() {

    const [driverDetails, setDriverDetails] = useState(null);
    const [driverRaces, setDriverRaces] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    const handleClick = () => {
        console.log("click");
    }

    useEffect(() => {
        getDriverDetails();

    }, []);

    const getDriverDetails = async () => {
        console.log("params ", params);
        const urlDriverDetails = `https://api.jolpi.ca/ergast/f1/2013/drivers/${params.driverId}/driverStandings.json`;
        const urlDriverRace = `https://api.jolpi.ca/ergast/f1/2013/drivers/${params.driverId}/results.json`;
        const response = await axios.get(urlDriverDetails);
        const response2 = await axios.get(urlDriverRace);
        console.log(response2);

        setDriverDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        setDriverRaces(response2.data.MRData.RaceTable.Races)
        setLoading(false);

    };



    if (loading) {
        return <Loader />;
    }
    console.log("drivers" + driverDetails);


    console.log("driverDetails", driverDetails)
    console.log("driverRaces", driverRaces)
    return (
        <>

            <div>


                <h2>Driver details</h2>
                <p>Name {driverDetails.Driver.givenName} {driverDetails.Driver.familyName} </p>
                <p>Team: {driverRaces[0].Results[0].Constructor.name} </p>
                <p>Birth: {driverRaces[0].Results[0].Driver.dateOfBirth} </p>
                <p>Biography: {driverDetails.Driver.url} </p>

            </div>



            <div>
                <h2>Driver races</h2>
                <div>Furmula results</div>
                <table className="driverDetailsBorder">
                    <thead>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Race</th>
                        </tr>
                    </thead>

                    {<tbody>
                        {driverRaces.map((details) => {
                            return (
                                <tr key={details.driverId} >

                                    <td>{details.round}</td>
                                    <td>{details.raceName}</td>
                                    <td> {details.Results[0].Constructor.name}</td>
                                    <td> {details.Results[0].grid}</td>
                                    <td> {details.Results[0].position}</td>

                                </tr>


                            )
                        })}

                    </tbody>}

                </table>

            </div>
        </>
    )
}