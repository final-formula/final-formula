import "../styles/error2.css"
import { useNavigate } from 'react-router';

export default function Error2() {
    const navigate = useNavigate();
    return (
        <div className="error-container">
            <button onClick={() => navigate(-1)}>
                Return to Last Working Page
            </button>
        </div>
    )
}