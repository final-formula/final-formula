
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
        setUsers(response.data.MRData);
        setLoading(false);
    };

    if (loading) {
        return <Loader />
    }






    return (
<<<<<<< HEAD
        <>
            <h1 style={{ textAlign: "center" }}>Drivers-Search</h1>


            {/* {driver.map((user) => {
                return (
                    <div key={user.id} className="div-objekat">
                        <p>Name: {user.givenName}</p>
                        <p>Family Name: {user.familyName}</p>
                        <p>Nationality: {user.nationality}</p>
                        <p>Street: {user.address.street}</p>
                    </div>

                )
            })} */}


        </>
=======
        <h1>Drivers</h1>
>>>>>>> 8c19fdb0753c75d68c1c48196724a44801271de4
    )
}