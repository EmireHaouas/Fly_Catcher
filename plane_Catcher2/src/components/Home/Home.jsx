import { useState, useEffect } from "react";
import "./Home.css";
import BoardingPassUI from "../BoardingPassUI/BoardingPassUI.jsx";
import step_img from "../../assets/imgs/step_img.jpg";
import spec1 from "../../assets/imgs/spec1.jpg";
import window_sea from "../../assets/imgs/window_sea.jpg";
import plane_art from "../../assets/imgs/plane_art.jpg";
import plane_building from "../../assets/imgs/plane_building.jpg";
import departure_infos from "../../assets/imgs/departure_infos.png";
import ticket_flight from "../../assets/imgs/ticket_flight.png";
import stay_updated from "../../assets/imgs/stay_updated.png";
import FormTracking from "../FormTracking/FormTracking.jsx";
import Loading from "../Loading/Loading.jsx";
import FlightError from "../FlightError/FlightError.jsx";
import aircraftLoading from "../../assets/imgs/aircraftLoading.gif";
import cityMemory1 from "../../assets/imgs/citymemory1.webp";
import cityMemory2 from "../../assets/imgs/citymemory2.webp";
import cityMemory3 from "../../assets/imgs/citymemory3.webp";
import cityMemory4 from "../../assets/imgs/citymemory4.webp";
import airDeliveryIcon from "../../assets/imgs/AirDeliveryIcon.webp";

const Home = () => {
    const apiKey = "f1e5e935d3d39352f9cbcfcd1f46a963";
    const [flightId, setFlightId] = useState("");
    const [date, setDate] = useState("");
    const [flightData, setFlightData] = useState(null);
    const [error, setError] = useState(null);
    const [isGeekInfosVisible, setIsGeekInfosVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = aircraftLoading;
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setFlightData(null);
        setLoading(true);

        const MIN_LOADING_TIME = 2000; // 2 secondes minimum

        const startTime = Date.now();

        try {
            const apiUrl = `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightId}&date=${date}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            const elapsed = Date.now() - startTime;
            const delay = Math.max(0, MIN_LOADING_TIME - elapsed);

            setTimeout(() => {
                if (data.data && data.data.length > 0) {
                    setFlightData(data.data[0]);
                } else {
                    setError("No flight found for this number and date.");
                }
                setLoading(false);
            }, delay);
        } catch (error) {
            setError("Unable to retrieve data. Please try again.");
            setLoading(false);
        }
    };

    const toggleGeekInfosVisibility = () => {
        setIsGeekInfosVisible(!isGeekInfosVisible);
    };

    return (
        <main className="main">
            <FormTracking
                flightId={flightId}
                setFlightId={setFlightId}
                date={date}
                setDate={setDate}
                handleSubmit={handleSubmit}
            />

            {!loading && (error || flightData) && (
                <div className="flightDetailsSection">
                    {error && <FlightError error={error} />}

                    {flightData && (
                        <>
                            <div className="flightInfoIntro">
                                <h2 className="titleFtInfoIntro">
                                    Your Boarding Pass to Real-Time
                                    <br />
                                    Flight Info
                                </h2>
                                <p className="pFtInfoIntro">
                                    Enter your flight number and get immediate access to its live
                                    status, departure gate,
                                    <br />
                                    and arrival time all in one glance.
                                </p>
                                <img
                                    className="FtIntroImg"
                                    src={airDeliveryIcon}
                                    alt="airDeliveryIcon"
                                />
                            </div>
                            <BoardingPassUI
                                flightData={flightData}
                                isGeekInfosVisible={isGeekInfosVisible}
                                toggleGeekInfosVisibility={toggleGeekInfosVisibility}
                            />
                        </>
                    )}
                </div>
            )}

            {loading && <Loading />}

            <section className="advertisingSection">
                <h2 className="titleAdvertisingSection">Make memories with us</h2>
                <div className="cityImagesRow">
                    <img className="cityImg1" src={cityMemory1} alt="cityMemory1" />
                    <img className="cityImg2" src={cityMemory2} alt="cityMemory2" />
                    <img className="cityImg3" src={cityMemory3} alt="cityMemory3" />
                    <img className="cityImg4" src={cityMemory4} alt="cityMemory4" />
                </div>
            </section>

            <section id="track_Steps" className="track_Steps">
                <h2 className="title_Steps">
                    Track Your next Flight<br></br>
                    in 3 easy steps
                </h2>

                <div className="stepsContainer">
                    <div className="text_Steps">
                        <div className="step1">
                            <img className="travel_Icon" alt="" src={ticket_flight} />
                            <div className="sub_Step1">
                                <h4 className="h4_Step1">Enter Your Flight Number</h4>
                                <p className="p_Step1">
                                    Start by entering your flight number in the search bar. This
                                    unique identifier ensures that you track the exact flight
                                    you&apos;re interested in.
                                </p>
                            </div>
                        </div>

                        <div className="step2">
                            <img className="travel_Icon" alt="" src={departure_infos} />
                            <div className="sub_Step2">
                                <h4 className="h4_Step2">Check Your Flight Details</h4>
                                <p className="p_Step2">
                                    Get access to real-time information, including departure and
                                    arrival times, ate numbers, and possible delays. Stay informed
                                    and updated with all the critical details.
                                </p>
                            </div>
                        </div>

                        <div className="step3">
                            <img className="travel_Icon" alt="" src={stay_updated} />
                            <div className="sub_Step3">
                                <h4 className="h4_Step3">
                                    Stay Updated on Your Flight&apos;s Status
                                </h4>
                                <p className="p_Step3">
                                    Follow your flight’s progress with up-to-date information
                                    about its schedule and any changes along the way. Never miss a
                                    beat with instant notifications on your flight&apos;s status.
                                </p>
                            </div>
                        </div>
                    </div>
                    <img className="step_Img" alt="" src={step_img} />
                </div>
            </section>
            <section id="why_Us" className="whyUsSection">
                <div className="benefitsSection">
                    <div className="column_Img">
                        <div className="upperRow_Img">
                            <img className="plane_Building" alt="" src={plane_building} />
                            <img className="window_Sea" alt="" src={window_sea} />
                        </div>
                        <div className="lowerRow_Img">
                            <img className="plane_Art" alt="" src={plane_art} />
                            <img className="spec1" alt="" src={spec1} />
                        </div>
                    </div>

                    <div className="card_Why">
                        <h4 className="titleWhyUsSection">Why Choose Us ?</h4>
                        <p className="p_Why">
                            Track your flights effortlessly with our intuitive platform,
                            designed to deliver real-time updates and <br></br>
                            comprehensive flight details at your fingertips. Whether
                            you&apos;re monitoring arrivals, departures, or<br></br>
                            mid-flight progress, our service provides precise data, ensuring
                            you&apos;re always informed.<br></br>
                        </p>
                        <p className="p_Why2">
                            With user-friendly tools, seamless navigation, and instant access
                            to essential information like flight<br></br>
                            delays, gate changes, and weather conditions, we make tracking
                            your journey stress-free. Rely on us <br></br>
                            for accuracy, convenience, and peace of mind, every step of the
                            way.{" "}
                        </p>

                        <div className="statsSection">
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

export default Home;
