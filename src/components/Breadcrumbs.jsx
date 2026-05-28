import { Link } from "react-router"
import "../styles/breadcrumbs.css"

export default function Breadcrumbs(props) {
    return (
        <div className="breadcrumbs-div">
            <Link to="/" className="breadcrumbsFirst">Home</Link >
            {props.crumbs?.map((crumb, i) => {
                const isLast = i === props.crumbs.length - 1;
                return (
                    <>
                        {isLast ? <span className="breadcrumbsAll">{crumb.label}</span> : <Link className="breadcrumbsAll" to={crumb.path}>{crumb.label}</Link >}
                    </>
                );
            })}
        </div>
    )
}