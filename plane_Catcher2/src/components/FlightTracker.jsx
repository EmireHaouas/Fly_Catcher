import React, { useState } from 'react';

const FlightTracker = () => {
    const [flightId, setFlightId] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
n
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setResult(null);

        try {
            const response = await fetch(`http://api.aviationstack.com/v1/flights?access_key=3efefbd79a01f25e63c557463118c114&flight_iata=${flightId}`);
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            const data = await response.json();
            if (data.data && data.data.length > 0) {
                setResult(data.data[0]);
            } else {
                setError('Aucun vol trouvé avec ce numéro.');
            }
        } catch (err) {
            setError('Erreur de récupération des données. Veuillez vérifier le numéro de vol.');
        }
    };

    return (
        <div>
            <h1>Suivi des Vols</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="flightId">Numéro de vol (format IATA) :</label>
                <input
                    type="text"
                    id="flightId"
                    value={flightId}
                    onChange={(e) => setFlightId(e.target.value)}
                    required
                />
                <button type="submit">Vérifier le statut</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <div>
                    <h2>Statut du vol :</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default FlightTracker;
