import Breadcrumbs from "../components/Breadcrumbs"
export default function Home() {


    return (
        <div className="home">
            <div className="header">
                <div className="Breadcrumbs-main">
                    <Breadcrumbs />
                </div>
            </div>
            <h1>Home</h1>
            <p> dobrodosli na formulu jedan</p>
            <p>Ovde mozete videti sve informacije vezane za  Formlu 1</p>


            <div className="veliki">
                <span><pre>S           E                  P           DJ</pre></span>
                <br />
                <span><pre>   T     D     N     I            O     E      U     U</pre></span>
                <br />
                <span><pre>      U           T                  B            J</pre></span>

            </div>

        </div>
    )
}