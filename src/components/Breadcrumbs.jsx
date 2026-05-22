import { Link } from "react-router"

export default function Breadcrumbs(props) {
    return (
        <div className="breadcrumbs-div">
            <Link to="/">Home</Link >
            {props.crumbs.map((crumb, i) => {
                const isLast = i === props.crumbs.length - 1;

                return (
                    <>
                        {isLast ? <span>{crumb.label}</span> : <Link to={crumb.path}>{crumb.label}</Link >}
                    </>
                );
            })}
        </div>
    )
}