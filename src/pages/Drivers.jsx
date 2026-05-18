
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


            {
                drivers.map((driver) => {
                    return (
                        <div key={driver.Driver.driverId} >
                            <p>Name: {driver.Driver.givenName}</p>
                            <p>Family Name: {driver.Driver.familyName}</p>
                            <p>Nationality: {driver.Driver.nationality}</p>
                            <p>Driver Id: {driver.Driver.driverId}</p>
                        </div>

                    )
                })
            }


        </>
    )
}