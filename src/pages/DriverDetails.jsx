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
        const url1 = `https://api.jolpi.ca/ergast/f1/2013/drivers/${driver.Driver.driverId}/driverStandings.json`;
        const url2 = `https://api.jolpi.ca/ergast/f1/2013/drivers/${driver.Driver.driverId}/results.json`;
        const response = await axios.get(url1);
        const response2 = await axios.get(url2);
        console.log(response);

        setDriverDetails(response.data.MRData.StandingsTable);
        setDriverRaces(response2.data.MRData)
        setLoading(false);

    };



    if (Loading) {
        return <Loader />;
    }


    return (
        <>

            <div>


                <h2>Driver details</h2>
                <p>Id: {driverDetails.id} </p>
                <p>Season: {driverDetails.name} </p>
                <p>Email: {driverDetails.email} </p>
                <p>Body: {driverDetails.body} </p>

            </div>

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
                                <tr key={details.Driver.driverId} >

                                    <td>{details.Driver.givenName}</td>
                                    <td>{details.Driver.familyName}</td>
                                    <td> {details.Driver.nationality}</td>
                                    <td>{details.Driver.driverId}</td>
                                </tr>


                            )
                        })}

                    </tbody>

                </table>

            </div>
        </>
    )
}