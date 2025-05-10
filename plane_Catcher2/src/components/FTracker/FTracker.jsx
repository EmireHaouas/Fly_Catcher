import React, { useState } from 'react';
import './style.css';
import landing_plane from '../../assets/imgs/landing_plane.gif';
import tower from '../../assets/imgs/tower.gif';
import takeoff_plane from '../../assets/imgs/takeoff_plane.gif';
import flying_plane from '../../assets/imgs/flying_plane.gif';
import Arrow_img from '../../assets/imgs/Arrow.png';
import clock_icon from '../../assets/imgs/clock_icon.png';
import ToggleButton from '../ToggleButton';




const FTracker = () => {


    const apiKey = 'f1e5e935d3d39352f9cbcfcd1f46a963';  // API key for aviationstack.com
    const [flightId, setFlightId] = useState('');
    const [date, setDate] = useState('');
    const [flightData, setFlightData] = useState(null);
    const [error, setError] = useState(null);
    const [isGeekInfosVisible, setIsGeekInfosVisible] = useState(false);

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
            const apiUrl = `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightId}&date=${date}`;
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
        setIsGeekInfosVisible(!isGeekInfosVisible); }


    return(
        <section id='form_Iata' className='Form_iata'>
            <h1 className='h1_form'>Track Your Flight Now</h1>


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
                                <div className="zero_Row">
                                    <p>{flightData.airline.name} {flightData.flight.number}</p>
                                    <p>{flightData.flight.iata}</p>

                                </div>

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
                                            <img className='Arrow_img' alt='arrow icon' src={Arrow_img} />
                                            {flightData.arrival.gate}
                                        </span>
                                    </p>
                                </div>

                                <div className="sixth_Row">
                                    <p className='arrival_Time'>{formatLocalTime(flightData.arrival.estimated)}</p>
                                    <p>
                                        <span className='terminals_design'>
                                            <img className='Arrow_img' alt='arrow icon' src={Arrow_img} />
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

    );
};
export default FTracker;
