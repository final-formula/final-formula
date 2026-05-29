import { useState, useRef } from "react";
import "../styles/FilterText.css";
export default function FilterText(props) {
    const [active, setActive] = useState(false);
    const [text, setText] = useState("");

    const inputRef = useRef(null);
    const handleClick = () => {


        if (props.value.length > 0) {

            props.change({
                target: {
                    value: ""
                }
            });

            inputRef.current.focus();

            return;
        }

        setActive(true);

        setTimeout(() => {
            inputRef.current.focus();
        }, 200);
    };

    const handleBlur = () => {

        if (props.value === "") {
            setActive(false);
        }
    };
    return (
        <div className={`searchBox ${active ? "active" : ""} ${props.value ? "hasText" : ""}`}>
            <input
                ref={inputRef}
                type={props.type}
                placeholder={`Enter ${props.label}`}
                className="searchInput"
                value={props.value}
                onChange={props.change}
                onBlur={handleBlur}
            />
            <button className="searchBtn" onClick={handleClick}>
                <span className="icon"></span>
            </button>
        </div>


    );
}