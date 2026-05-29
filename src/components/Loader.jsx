import { BounceLoader } from "react-spinners"

export default function Loader() {
    return (
        <div className="loader-container">
            <video
                autoPlay
                loop
                muted
                playsInline
                width="800"
                position="centar"
            >
                <source src={"/General/loader.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

        </div>
    )
}