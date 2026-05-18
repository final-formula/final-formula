import { BounceLoader } from "react-spinners"


export default function Loader() {
    return (

        <div className="loader-container">
            <BounceLoader size={100} color="green" />

        </div>
    )
}