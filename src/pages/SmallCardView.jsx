import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";
import { Label } from "@mui/icons-material";
import SelectYear from "../components/SelectYear";
import FilterText from "../components/FilterText";
import Breadcrumb from "antd/es/breadcrumb/Breadcrumb";
import Flag from "react-flagkit";
import getFlag from "../helpers/getFlagsNationality";
import Error from "../components/Error.jsx";

export default function SmallCardView(props) {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredDriver, setFilteredDriver] = useState([]);
    const [year, setYear] = useState("2013");
    const navigate = useNavigate();
    const [error, setError] = useState(true);

    useEffect(() => {
        getDrivers();
    }, [props.year]);

    useEffect(() => {
        const matchDrivers = drivers.filter((driver) => driver.Driver.givenName.toLowerCase().includes(search.toLowerCase()) || driver.Driver.familyName.toLowerCase().includes(search.toLowerCase()));
        setFilteredDriver(matchDrivers)
    }, [search, drivers]);

    const getDrivers = async () => {
        try {
            setError(false)
            const url = `https://api.jolpi.ca/ergast/f1/${props.year}/driverstandings.json`;
            const response = await axios.get(url);

            setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        }

        catch (e) {
            setError(true);

        }
        finally {
            setLoading(false);
        }
        setLoading(false);
    };

    const handleClick = (id) => {
        navigate(`/teams/details${id}`);
    };

    const handleClickTeam = (id) => {
        navigate(`/teams/details${id}`);
    };

    if (loading) {
        return <Loader />

    };
    if (error) {
        return <Error />;
    }

    const driversCrumbs = [
        { path: "", label: "Drivers" }
    ];

    return (
        <>
            <div className="mainScreen">

                <div className="header">


                    <div className="search-div">
                        <FilterText type="text" label="driver" value={search} change={(e) => setSearch(e.target.value)} />
                        <button onClick={() => setSearch("")}>clear</button>
                    </div>

                    <div className="Breadcrumbs-main">
                        <Breadcrumb crumbs={driversCrumbs} />
                    </div>
                </div>

                <div className="smallCardContainer">

                    {filteredDriver.map((driver) => {
                        return (
                            <div className="smallCard" >

                                <div className="upper-smallCard">
                                    <div className="left-side-smallCard">
                                        <img src={`/Drivers/${driver.Driver.driverId}.jpg`} className="team-image" />
                                    </div>

                                    <div className="right-side-smallCard">
                                        <Flag className="flag-detail" size={60} country={getFlag(props.flags, driver.Driver.nationality)} />
                                        <p>{driver.Driver.givenName} {driver.Driver.familyName}</p>

                                    </div>
                                </div>

                                <div className="lower-card-smallCard">
                                    <pre>Country:     {driver.Driver.nationality}</pre>
                                    <pre>Team         {driver.Constructors[0].name}</pre>
                                    <pre>Birth:       {driver.Driver.dateOfBirth}</pre>
                                    <pre className="bio">Biography:   <a href={driver.Driver.url} target="_blank"><img src="/General/link-white.png" className="link-icon" /></a></pre>
                                </div>
                                <div className="standingsSmallCard">
                                    <pre>Position / Points</pre>
                                    <pre>{driver.position} / {driver.points} </pre>
                                </div>
                            </div>
                        )

                    })
                    }
                </div>
            </div>
        </>
    );
}

// onClick={() => handleClick(driver.Driver.driverId)}>