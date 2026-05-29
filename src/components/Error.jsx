import "../styles/error.css"
import { useNavigate } from "react-router"

export default function Error() {
    const navigate = useNavigate();

    return (
        <div className="error1-container">
            <h1>No Driver, Team or Race match for this Season </h1>
            <button onClick={() => navigate(-1)}>
                Return to Last Working Page
            </button>

        </div>
    )
}