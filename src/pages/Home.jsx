import "../styles/Home.css";
import "../App.css";

export default function Home() {

    const cards = [
        {
            title: "Drivers",
            video: "/General/bckground.mp4",
            link: "/drivers"
        },
        {
            title: "Teams",
            video: "/General/3.mp4",
            link: "/teams"
        },
        {
            title: "Races",
            video: "/General/2.mp4",
            link: "/races"
        },
        {
            title: "Galery",
            video: "/General/5.mp4",
            link: "/galery"
        }
    ];

    return (

        <div className="home">
            <div className="background-image"></div>
            <div className="overlay"></div>
            <div className="content">
                <h1 className="main-title">Formula 1 Portal</h1>
                <div className="cards-container">
                    {cards.map((card) => {
                        return (
                            <a
                                key={card.title}
                                href={card.link}
                                className="video-card"
                            >
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="card-video"
                                >
                                    <source src={card.video} type="video/mp4" />
                                </video>

                                <div className="card-overlay"></div>

                                <h2>{card.title}</h2>

                            </a>
                        );
                    })}

                </div>

            </div>

        </div>
    );
}