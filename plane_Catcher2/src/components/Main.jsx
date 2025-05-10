import React, { useState } from "react";
import "../Main.css";
import FTracker from "./FTracker/FTracker";
import mapBackground from "../assets/imgs/Map.webp";
import aircraftBackground from "../assets/imgs/aircraft3d.webp";
import step_img from "../assets/imgs/step_img.jpg";
import spec1 from "../assets/imgs/spec1.jpg";
import window_sea from "../assets/imgs/window_sea.jpg";
import plane_art from "../assets/imgs/plane_art.jpg";
import plane_building from "../assets/imgs/plane_building.jpg";
import departure_infos from "../assets/imgs/departure_infos.png";
import ticket_flight from "../assets/imgs/ticket_flight.png";
import stay_updated from "../assets/imgs/stay_updated.png";
import Header from "./Header.jsx";

const Main = () => {
    const [flightId, setFlightId] = useState("");
    const [date, setDate] = useState("");
    const [flightData, setFlightData] = useState(null);
    const [error, setError] = useState(null);
    const [isGeekInfosVisible, setIsGeekInfosVisible] = useState(false);

    const formatLocalTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    const calculateFlightDuration = (departure, arrival) => {
        const departureTime = new Date(departure);
        const arrivalTime = new Date(arrival);
        const durationInMinutes = (arrivalTime - departureTime) / 60000;

        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        return `${hours}h ${minutes}m`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setFlightData(null);

        try {
            const apiUrl = `https://api.aviationstack.com/v1/flights?access_key=f1e5e935d3d39352f9cbcfcd1f46a963&flight_iata=${flightId}&date=${date}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des données.");
            }

            const data = await response.json();

            if (data.data && data.data.length > 0) {
                setFlightData(data.data[0]);
            } else {
                setError("Aucun vol trouvé pour ce numéro et cette date.");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleGeekInfosVisibility = () => {
        setIsGeekInfosVisible(!isGeekInfosVisible);
    };

    return (
        <main className='main'>
            <Header />

            {/* FIN --------------- > */}
            <FTracker />

            <section id="track_Steps" className="track_Steps">
                <div className="">
                    <h2 className="h2_Steps">
                        Track Your next Flight<br></br>
                        in 3 easy steps
                    </h2>
                </div>
                <div className="text_Img">
                    <div className="text_Steps">
                        <div className="step1">
                            <img className="travel_Icon" alt="" src={ticket_flight} />
                            <div className="sub_Step1">
                                <h4 className="h4_Step1">Enter Your Flight Number</h4>
                                <p className="p_Step1">
                                    Start by entering your flight number in the search bar.{" "}
                                    <br></br>
                                    This unique identifier ensures that you track the<br></br>
                                    exact flight you're interested in.
                                </p>
                            </div>
                        </div>

                        <div className="step2">
                            <img className="travel_Icon" alt="" src={departure_infos} />
                            <div className="sub_Step2">
                                <h4 className="h4_Step2">Check Your Flight Details</h4>
                                <p className="p_Step2">
                                    Get access to real-time information, including departure
                                    <br></br>
                                    and arrival times, ate numbers, and possible delays. Stay
                                    <br></br>
                                    informed and updated with all the critical details.
                                </p>
                            </div>
                        </div>

                        <div className="step3">
                            <img className="travel_Icon" alt="" src={stay_updated} />
                            <div className="sub_Step3">
                                <h4 className="h4_Step3">
                                    Stay Updated on Your Flight's Status
                                </h4>
                                <p className="p_Step3">
                                    Follow your flight’s progress with up-to-date information
                                    <br></br>
                                    about its schedule and any changes along the way. Never
                                    <br></br>
                                    miss a beat with instant notifications on your flight's
                                    status.
                                </p>
                            </div>
                        </div>
                    </div>
                    <img className="step_Img" alt="" src={step_img} />
                </div>
            </section>
            <section id="why_Us" className="late">
                <div className="pres_Why">
                    <div className="column_Img">
                        <div className="row1_Img">
                            <img className="plane_Building" alt="" src={plane_building} />
                            <img className="window_Sea" alt="" src={window_sea} />
                        </div>
                        <div className="row2_Img">
                            <img className="plane_Art" alt="" src={plane_art} />
                            <img className="spec1" alt="" src={spec1} />
                        </div>
                    </div>

                    <div className="card_Why">
                        <h4 className="h4_Why">Why Choose Us ?</h4>
                        <p className="p_Why">
                            Track your flights effortlessly with our intuitive platform,
                            designed to deliver real-time updates and <br></br>
                            comprehensive flight details at your fingertips. Whether you're
                            monitoring arrivals, departures, or<br></br>
                            mid-flight progress, our service provides precise data, ensuring
                            you're always informed.<br></br>
                        </p>
                        <p className="p_Why2">
                            With user-friendly tools, seamless navigation, and instant access
                            to essential information like flight<br></br>
                            delays, gate changes, and weather conditions, we make tracking
                            your journey stress-free. Rely on us <br></br>
                            for accuracy, convenience, and peace of mind, every step of the
                            way.{" "}
                        </p>
                        <div className="row_Card">
                            <div className="box_1">
                                <p className="p_Box1">5K+</p>
                                <p className="p2_Box1">Sucess Tour</p>
                            </div>
                            <div className="box_2">
                                <p className="p_Box2">10K+</p>
                                <p className="p2_Box2">Happy Clients</p>
                            </div>
                            <div className="box_3">
                                <p className="p_Box3">15+</p>
                                <p className="p2_Box3">Years Experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Main;
