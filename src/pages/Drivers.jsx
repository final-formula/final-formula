
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";





export default function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


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


    const handleClick = (id) => {

        navigate(`/drivers/details/${id}`);


    };

    if (loading) {
        return <Loader />
    }



    console.log(drivers);


    return (
        <>
            <div className="container">

                <div className="main">
                    <h1 className="title">Drivers Championship Standings</h1>




                    <table className="f1Table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Family Name</th>
                                <th>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                drivers.map((driver) => {
                                    return (
                                        <tr key={driver.Driver.driverId}
                                            onClick={() => handleClick(driver.Driver.driverId)}>

                                            <td className="driverCell">{driver.Driver.givenName}</td>
                                            <td>{driver.Driver.familyName}</td>
                                            <td> {driver.Driver.nationality}</td>

                                        </tr>


                                    )
                                })}

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}