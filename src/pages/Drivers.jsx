
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";





export default function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2013/driverstandings.json";
        const response = await axios.get(url);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setLoading(false);
    };

    if (loading) {
        return <Loader />
    }






    return (
        <>
            <h1 style={{ textAlign: "center" }}>Drivers</h1>


            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Family Name</th>
                        <th>Nationality</th>
                        <th>Driver ID</th>
                    </tr>
                </thead>


                <tbody>


                    {drivers.map((driver) => {
                        return (
                            <tr key={driver.Driver.driverId} >

                                <td>{driver.Driver.givenName}</td>
                                <td>{driver.Driver.familyName}</td>
                                <td> {driver.Driver.nationality}</td>
                                <td>{driver.Driver.driverId}</td>
                            </tr>


                        )
                    })}

                </tbody>
            </table>

        </>
    )
}