
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
import getFlag from '../helpers/getFlagsNationality.js'
import Flag from 'react-flagkit';





export default function Drivers(props) {
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


<<<<<<< HEAD
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Points</th>
                    </tr>
                </thead>
=======
>>>>>>> 42f28debec5b083fde615916d04bc646961d6dda


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


<<<<<<< HEAD
                    {
                        drivers.map((driver) => {
                            return (
                                <tr key={driver.Driver.driverId}
                                    onClick={() => handleClick(driver.Driver.driverId)}>
                                    <td>{driver.position}</td>
                                    <td> <Flag country={getFlag(props.flags, driver.Driver.nationality)} />{driver.Driver.givenName} {driver.Driver.familyName}</td>
                                    <td>{driver.Constructors[0].name}</td>
                                    <td> {driver.points}</td>

                                </tr>


                            )
                        })}

                </tbody>
            </table>
=======
                                    )
                                })}

                        </tbody>
                    </table>
                </div>
            </div>
>>>>>>> 42f28debec5b083fde615916d04bc646961d6dda

        </>
    )
}