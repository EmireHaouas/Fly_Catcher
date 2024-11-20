import React, { useState } from 'react';
import ToggleButton from './ToggleButton'; // Import du composant ToggleButton
import '../Main.css';
import image_header from '../assets/imgs/img_header.png';
import plane_icon from '../assets/imgs/plane_icon.png';
import Arrow_img from '../assets/imgs/arrow.png';
import active_Flight from '../assets/imgs/active_icon.gif';
import clock_icon from '../assets/imgs/clock_icon.png';
import plane_moving from '../assets/imgs/plane_moving.gif';
import Bottom_arrow_icon from '../assets/imgs/Bottom_arrow_icon.png';
import takeoff_plane from '../assets/imgs/takeoff_plane.gif';
import landing_plane from '../assets/imgs/landing_plane.gif';
import tower from '../assets/imgs/tower.gif';
import flying_plane from '../assets/imgs/flying_plane.gif';
import step_img from '../assets/imgs/step_img.jpg';
import travel_icon from '../assets/imgs/travel_icon.png';
import plane_jp from '../assets/imgs/plane_jp.jpg';
import spec1 from '../assets/imgs/spec1.jpg';
import window_img from '../assets/imgs/window_img.jpg';
import window_sea from '../assets/imgs/window_sea.jpg';
import plane_art from '../assets/imgs/plane_art.jpg';
import plane_building from '../assets/imgs/plane_building.jpg';
import departure_infos from '../assets/imgs/departure_infos.png';
import ticket_flight from '../assets/imgs/ticket_flight.png';
import stay_updated from '../assets/imgs/stay_updated.png';

const Main = () => {
    const [flightId, setFlightId] = useState('');
    const [date, setDate] = useState('');
    const [flightData, setFlightData] = useState(null);
    const [error, setError] = useState(null);
    const [isGeekInfosVisible, setIsGeekInfosVisible] = useState(false); // Ajout de l'état pour la visibilité des infos geek

    const formatLocalTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
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
            const apiUrl = `https://api.aviationstack.com/v1/flights?access_key=8220daaf1cbcf21675c05bbc402fcc7d&flight_iata=${flightId}&date=${date}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données.');
            }

            const data = await response.json();

            if (data.data && data.data.length > 0) {
                setFlightData(data.data[0]);
            } else {
                setError('Aucun vol trouvé pour ce numéro et cette date.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleGeekInfosVisibility = () => {
        setIsGeekInfosVisible(!isGeekInfosVisible); // Changer la visibilité
    };

    return (
        <main>
            <article className='article_flex'>
                <img src={image_header} alt='Des' />
                <div className='container_flex2'>
                    <img className='active_Flight' alt='' src={active_Flight} />
                    <h1 className='h1_article_flex'>EXPLORE THE WORLD</h1>
                    <h2 className='h2_article_flex'>It's Time<br /> To Travel Around<br /> The World</h2>
                    <p className='p_article_flex'>
                        Check Off the Ultimate Global Travel Checkliist With your<br />
                        Travel Partner! Make your vacation a fun, exciting, and<br />
                        unforgettable experience.
                    </p>
                    <button className='button1'>Discover Now</button>
                </div>
            </article>

            <section className='Form_iata'>
                <h1 className='h1_form'>Track Your Flight Now</h1>

                {/*/test image landing et t/o */}
                <div className="tolanding_icons">
                <img alt='' className='landing_plane' src={landing_plane}/>
                <img alt='' className='tower_icon' src={tower}/>
                <img alt='' className='takeoff_plane' src={takeoff_plane}/>
               </div>
                <form className='form_track' onSubmit={handleSubmit}>
                    <div className='form_group'>
                        <input
                            className='flight_idnumber'
                            type="text"
                            id="flightId"
                            value={flightId}
                            onChange={(e) => setFlightId(e.target.value)}
                            placeholder=' '
                            required
                        />
                        <label htmlFor="flightId">Flight Number</label>
                    </div>

                    <input
                        className='date_Flight'
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />

                    <button className='button_submit' type="submit">Track My Flight</button>
                </form>

                {error && <p className="error">{error}</p>}
                {flightData && (
                    <div className='card_Flightinfos'>
                        <div className='card_details'>
                            <div className="h3_moving">
                            <h3 className='h3_cards'>Flight Details</h3> 
                            <img className='flying_plane' src={flying_plane} alt=''/>
                            </div>
                          <div className="entiresection_wrap">
                            <div className="entire_section">
                                <div className="first_Row">
                                    <p className='airport_Dep'>{flightData.departure.airport}</p>
                                    <p>
                                        <span className='gates_design'>
                                            <img className='Arrow_img' alt='arrow' src={Arrow_img} />
                                            {flightData.departure.gate}
                                        </span>
                                    </p>
                                </div>

                                <div className="second_Row">
                                    <p className='departure_Time'>{formatLocalTime(flightData.departure.estimated)}</p>
                                    <p>
                                        <span className='terminals_design'>
                                            <img className='Arrow_img' alt='arrow' src={Arrow_img} />
                                            {flightData.departure.terminal}
                                        </span>
                                    </p>
                                </div>

                                <div className="third_Row">
                                    <img className='clock_icon' alt='clock icon' src={clock_icon} />
                                    <span>{calculateFlightDuration(flightData.departure.estimated, flightData.arrival.estimated)}</span> <hr />
                                </div>

                                <div className="fourth_Row">
                                    <p className='airport_arrival'>{flightData.arrival.airport}</p>
                                    <p>
                                        <span className='gates_design'>
                                            <img className='Arrow_img' alt='arrow' src={Arrow_img} />
                                            {flightData.arrival.gate}
                                        </span>
                                    </p>
                                </div>

                                <div className="sixth_Row">
                                    <p className='arrival_Time'>{formatLocalTime(flightData.arrival.estimated)}</p>
                                    <p>
                                        <span className='terminals_design'>
                                            <img className='Arrow_img' alt='arrow' src={Arrow_img} />
                                            {flightData.arrival.terminal}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            </div>

                            <p>I am an aviation geek.</p>
                            <ToggleButton onClick={toggleGeekInfosVisibility} />
                            {isGeekInfosVisible && (
                                <div className='geek_infos'>
                                    <p className='airline'><span>Airline:</span> {flightData.airline.name}</p>
                                    <p><span>Status:</span> {flightData.flight_status}</p>
                                    <p><span>Aircraft Model:</span> {flightData.aircraft.icao}</p>
                                    <p><span>Departure Delay:</span> {flightData.departure.delay}</p>
                                    <p><span>Tail Number:</span> <span>{flightData.aircraft.registration}</span></p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
            <section className='track_Steps'>
                <div className=''>
                    <h2 className='h2_Steps'>Track Your next Flight<br></br>
                                             in 3 easy steps
                    </h2>

                </div>
                <div className='text_Img'>
                  <div className='text_Steps'>
                    
                        <div className='step1'>
                            <img className='travel_Icon' alt='' src={ticket_flight}/>
                              < div className='sub_Step1'>
                            <h4 className='h4_Step1'>Enter Your Flight Number</h4>
                            <p className='p_Step1'>Start by entering your flight number in the search bar. <br></br>
                                This unique identifier ensures that you track the<br></br> 
                                exact flight you're interested in.</p>
                            </div>
                    </div>
                    
                    <div className='step2'>
                            <img className='travel_Icon' alt='' src={departure_infos}/>
                            <div className='sub_Step2'>
                            <h4 className='h4_Step2'>Check Your Flight Details</h4>
                            <p className='p_Step2'>Get access to real-time information, including departure<br></br>
                                                   and arrival times, ate numbers, and possible delays. Stay<br></br>
                                                   informed and updated with all the critical details.</p>
                            </div>
                       
                    </div>
                   
                    <div className='step3'>
                            <img className='travel_Icon' alt='' src={stay_updated}/>
                            <div className='sub_Step3'>
                            <h4 className='h4_Step3'>Stay Updated on Your Flight's Status</h4>
                            <p className='p_Step3'>Follow your flight’s progress with up-to-date information<br></br>
                                                   about its schedule and any changes along the way. Never<br></br> 
                                                   miss a beat with instant notifications on your flight's status.</p>
                           </div>
                    </div>
                  </div>
                    <img className='step_Img' alt='' src={step_img}/>
                    
                </div>
            </section>
            <section className='late'>
                <div className='pres_Why'>
                <div className='column_Img'>
                    <div className='row1_Img'>
                        <img className='plane_Building' alt='' src={plane_building}/>
                        <img className='window_Sea' alt='' src={window_sea}/>
                    </div>
                    <div className='row2_Img'>
                       <img className='plane_Art' alt='' src={plane_art}/>
                       <img className='spec1' alt='' src={spec1}/>
                    </div>

                </div>
                
                <div className='card_Why'>
                <h4 className='h4_Why'>Why Choose Us ?</h4>
                <p className='p_Why'>Track your flights effortlessly with our intuitive platform, designed to deliver real-time updates and <br></br>
                comprehensive flight details at your fingertips. Whether you're monitoring arrivals, departures, or<br></br>
                mid-flight progress, our service provides precise data, ensuring you're always informed.<br></br></p>
                 <p className='p_Why2'>With user-friendly tools, seamless navigation, and instant access to essential information like flight<br></br> 
                 delays, gate changes, and weather conditions, we make tracking your journey stress-free. Rely on us <br></br>
                 for accuracy, convenience, and peace of mind, every step of the way. </p>
                 <div className='row_Card'>
                    <div className='box_1'>
                        <p className='p_Box1'>5K+</p>
                        <p className='p2_Box1'>Sucess Tour</p>
                    </div>
                    <div className='box_2'>
                        <p className='p_Box2'>10K+</p>
                        <p className='p2_Box2'>Happy Clients</p>
                    </div>
                    <div className='box_3'>
                        <p className='p_Box3'>15+</p>
                        <p className='p2_Box3'>Years Experience</p>
                    </div>
                 </div>
                </div>
                </div>
            </section>
        </main>
    );
};

export default Main;
