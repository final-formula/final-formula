import Loader from "../components/Loader";
import axios from "axios";
import { useState, useEffect } from "react";



export default function DriverDetails() {

    const [driverDetails, setDriverDetails] = useState(null);
    const [driverRaces, setDriverRaces] = useState([]);
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
        const urlDriverDetails = `https://api.jolpi.ca/ergast/f1/2013/drivers/${driver.Driver.driverId}/driverStandings.json`;
        const urlDriverRace = `https://api.jolpi.ca/ergast/f1/2013/drivers/${driver.Driver.driverId}/results.json`;
        const response = await axios.get(urlDriverDetails);
        const response2 = await axios.get(urlDriverRace);
        console.log(response);

        setDriverDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setDriverRaces(response2.data.MRData.Driver)
        setLoading(false);

    };



    if (Loading) {
        return <Loader />;
    }


    return (
        <>

            <div>


                <h2>Driver details</h2>
                <p>Name {driverDetails.givenName.familyName} </p>
                <p>Team: {driverDetails.name} </p>
                <p>Birth: {driverDetails.email} </p>
                <p>Biography: {driverDetails.body} </p>

            </div>
            console.log(driverDetails);


            <div>
                <h2>Driver races</h2>
                <div>Furmula results</div>
                <table>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Team</th>
                        <th>Grid</th>
                        <th>Race</th>
                    </tr>
                    <tbody>
                        {driverRaces.map((details) => {
                            return (
                                <tr key={details.driverId} >

                                    <td>{details.givenName}</td>
                                    <td>{details.familyName}</td>
                                    <td> {details.nationality}</td>

                                </tr>


                            )
                        })}

                    </tbody>

                </table>

            </div>
        </>
    )
}