import React, { useState } from 'react';
import '../Main.css';
import image_header from '../assets/imgs/img_header.png';

const Main = () => {
    const [flightId, setFlightId] = useState('');
    const [date, setDate] = useState('');
    const [flightData, setFlightData] = useState(null);
    const [error, setError] = useState(null);

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
                  <img src={image_header} alt='Des'/>
                <div className='container_flex2'>
                     <h1 className='h1_article_flex'>EXPLORE THE WORLD</h1>
                     <h2 className='h2_article_flex'>It's Time<br/> To Travel Around<br/> The World</h2>
                     <p className='p_article_flex'>
                        Check Off the Ultimate Global Travel Checklist With your<br/>
                        Travel Partner! Make your vacation a fun, exciting, and<br/>
                        unforgettable experience.
                     </p>
                     <button className='button1'>Discover Now</button>
                </div>
            </article>

            <section className='Form_iata'>

                     <h1 className='h1_form'>Track Your Flight</h1>
                    
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
                        
                            <label htmlFor="date">Date (YYYY-MM-DD) :</label>
                                <input
                                  type="date"
                                  id="date"
                                  value={date}
                                  onChange={(e) => setDate(e.target.value)}
                                  required
                                />
                        
                            <button className='button_submit' type="submit">Suivre le vol</button>
                    </form>
                    
                

                    {/* Affichage des résultats ou des erreurs */}
                    {error && <p className="error">{error}</p>}
                    {flightData && (
                        <div>
                            <h3>Flight Details</h3>
                            <p>Airline : {flightData.airline.name}</p>
                            <p>Statut : {flightData.flight_status}</p>
                            <p>Date : {flightData.departure.estimated} (Estimé)</p>
                            <p>Aircraft Model : {flightData.aircraft.icao}</p>
                            {/* Ajoute d'autres informations que tu souhaites afficher */}
                        </div>
                    )}
            </section>
            
        </main>
    );
};

export default Main;
