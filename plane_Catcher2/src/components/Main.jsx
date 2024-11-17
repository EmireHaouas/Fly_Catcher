import React, { useState } from 'react';
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

    const formatLocalTime = (timestamp) => {
        // Créer un objet Date à partir du timestamp
        const date = new Date(timestamp);
    
        // Formatter l'heure et les minutes (HH:mm)
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Utilise l'heure en format 24 heures
        });
    };

    const calculateFlightDuration = (departure, arrival) => {
        const departureTime = new Date(departure);
        const arrivalTime = new Date(arrival);
        const durationInMinutes = (arrivalTime - departureTime) / 60000; // La différence est en millisecondes, donc on divise par 60000 pour obtenir les minutes
    
        // Calculer les heures et les minutes
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
    
        // Retourner le format comme "1h 24m"
        return `${hours}h ${minutes}m`;
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        setError(null); // Réinitialiser l'erreur
        setFlightData(null); // Réinitialiser les données

        try {
            // Construire l'URL de l'API
            const apiUrl = `https://api.aviationstack.com/v1/flights?access_key=3efefbd79a01f25e63c557463118c114&flight_iata=${flightId}&date=${date}`;
            console.log('URL de l API :', apiUrl); // Vérifie l'URL construite

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données.');
            }

            const data = await response.json();

            if (data.data && data.data.length > 0) {
                setFlightData(data.data[0]); // Utilisez la première entrée de données
            } else {
                setError('Aucun vol trouvé pour ce numéro et cette date.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <main>
            <article className='article_flex'>
                <img src={image_header} alt='Des' />
                <div className='container_flex2'>
                    <img className='active_Flight' alt='' src={active_Flight} />
                    <h1 className='h1_article_flex'>EXPLORE THE WORLD</h1>
                    <h2 className='h2_article_flex'>It's Time<br/> To Travel Around<br/> The World</h2>
                    <p className='p_article_flex'>
                        Check Off the Ultimate Global Travel Checkliist With your<br/>
                        Travel Partner! Make your vacation a fun, exciting, and<br/>
                        unforgettable experience.
                    </p>
                    <button className='button1'>Discover Now</button>
                </div>
            </article>

            <section className='Form_iata'>
                <h1 className='h1_form'>Track Your Flight Now</h1> 

                {/* Formulaire pour le suivi des vols */}
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

                    <button className='button_submit' type="submit">Track</button>
                </form>

                {/* Affichage des résultats ou des erreurs */}
                {error && <p className="error">{error}</p>}
                {flightData && (
                    <div className='cards'>
                        <div className='card_details'>
                               <h3 className='h3_cards'>Flight Details</h3>
                            <div className="entire_section">
                              <div className='dede'>
                                <div className='dep'>
                            
                                <p className='p_destination'>{flightData.departure.airport}</p>
                                <p className='s'>{formatLocalTime(flightData.departure.estimated)}</p>
                               </div>
                            
                                <div className='tgates'>
                                <p>
                                    <span className='gates_design'>
                                        <img className='Arrow_img' alt='arrow' src={Arrow_img} /> 
                                        {flightData.departure.gate}
                                    </span>
                                </p>
                                <p>
                                    <span className='terminals_design'>
                                        <img className='Arrow_img' alt='arrow' src={Arrow_img} /> 
                                        {flightData.departure.terminal}
                                    </span>
                                </p>
                                </div>
                                </div>
                                
                               
                                <p>
                                <div className='clock'>
                                    <img className='clock_icon' alt='clock icon' src={clock_icon} /> 
                                    {calculateFlightDuration(flightData.departure.estimated, flightData.arrival.estimated)}
                                    <hr className='hr'  />
                                    </div>
                                </p>

                               {/*deuxième section*/}
                    <div className="section_2">
                        <div className="cd">
                            <p className='p_arrival'>{flightData.arrival.airport}</p>
                            <p className='s'>{formatLocalTime(flightData.arrival.estimated)}</p>
                        </div>
                        <div className="cd2">
                            <p>
                                 
                                <span className='gates_design'>
                                    <img className='Arrow_img' alt='arrow' src={Arrow_img} /> 
                                    {flightData.arrival.gate}
                                </span>
                            </p>
                            <p>
                                 
                                <span className='terminals_design'>
                                    <img className='Arrow_img' alt='arrow' src={Arrow_img} /> 
                                    {flightData.arrival.terminal}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <p>I am an aviation geek.</p> <img className='arrow_bottom' alt='' src={Bottom_arrow_icon}/>
                            <div className='card_flight_status'>
                                {/*
                                <p className='airline'>Airline: {flightData.airline.name}</p>
                                <p>Status: {flightData.flight_status}</p>
                                <p>Aircraft Model: {flightData.aircraft.icao}</p> */}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Main;
