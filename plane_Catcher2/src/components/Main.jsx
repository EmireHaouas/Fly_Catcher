import React, { useState } from 'react';
import ToggleButton from './ToggleButton'; // Import du composant ToggleButton
import '../Main.css';
import image_header from '../assets/imgs/img_header.png';
import plane_icon from '../assets/imgs/plane_icon.png';
import Arrow_img from '../assets/imgs/arrow.png';
import active_Flight from '../assets/imgs/active_icon.gif';
import flight_info from '../assets/imgs/flight_info.png';
import clock_icon from '../assets/imgs/clock_icon.png';
import plane_moving from '../assets/imgs/plane_moving.gif';
import Bottom_arrow_icon from '../assets/imgs/Bottom_arrow_icon.png'

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
                            <h3 className='h3_cards'>Flight Details</h3>
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
                                    {calculateFlightDuration(flightData.departure.estimated, flightData.arrival.estimated)} <hr />
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

                            <p>I am an aviation geek.</p>
                            <ToggleButton onClick={toggleGeekInfosVisibility} />
                            {isGeekInfosVisible && (
                                <div className='geek_infos'>
                                    <p className='airline'>Airline: {flightData.airline.name}</p>
                                    <p>Status: {flightData.flight_status}</p>
                                    <p>Aircraft Model: {flightData.aircraft.icao}</p>
                                    <p>Aircraft Model: {flightData.departure.delay}</p>
                                    <p>Tail Number: <span>{flightData.aircraft.registration}</span></p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Main;
