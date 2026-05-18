import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./components/Loader";

export default function Races() {
const [races, setRaces] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
   getRaces();
}, []);
 

const getRaces = async () => {
        const url ="https://api.jolpi.ca/ergast/f1/2013/results/1.json";
        console.log(url)
        const response = await axios.get(url);
        console.log(response)
        setRaces(response.data);
        setLoading(false);
        
       

    };

}
if(loading){
    return <Loader/>
}
