import "./BoardingPassUI.css";
import PropTypes from "prop-types";

const BoardingPassUI = ({
                            flightData,
                            isGeekInfosVisible,
                            toggleGeekInfosVisibility,
                        }) => {
    if (!flightData) return null;

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    return (
        <div className="ticket">
            <div className="ticket-header">
                <span className="ticket-type">{flightData.flight.iata}</span>
                <span className="route">
          {flightData.departure.iata} <span className="plane">✈</span>{" "}
                    {flightData.arrival.iata}
        </span>
            </div>

            <div className="ticket-body">
                <h2>
                    {flightData.airline.name} {flightData.flight.number}
                </h2>
                <div className="info-grid">
                    <div>
                        <strong>From</strong>
                        <br />
                        {flightData.departure.airport}
                    </div>
                    <div>
                        <strong>To</strong>
                        <br />
                        {flightData.arrival.airport}
                    </div>
                    <div>
                        <strong>Departure</strong>
                        <br />
                        {formatTime(flightData.departure.estimated)}
                    </div>
                    <div>
                        <strong>Arrival</strong>
                        <br />
                        {formatTime(flightData.arrival.estimated)}
                    </div>
                    <div>
                        <strong>Gate</strong>
                        <br />
                        {flightData.departure.gate || "N/A"}
                    </div>
                    <div>
                        <strong>Terminal</strong>
                        <br />
                        {flightData.departure.terminal || "N/A"}
                    </div>
                </div>
                <span className="geek-chip" onClick={toggleGeekInfosVisibility}>
          {isGeekInfosVisible ? "Hide Geek Mode" : "Enable Geek Mode ✈"}
        </span>
            </div>

            {isGeekInfosVisible && (
                <div className="geek-card">
                    <h3 className="geek-title">✈ Geek Flight Info</h3>
                    <ul>
                        <li>
                            <strong>Aircraft:</strong> {flightData.aircraft?.icao || "N/A"}
                        </li>
                        <li>
                            <strong>Tail Number:</strong>{" "}
                            {flightData.aircraft?.registration || "N/A"}
                        </li>
                        <li>
                            <strong>Flight Status:</strong>{" "}
                            {flightData.flight_status || "N/A"}
                        </li>
                        <li>
                            <strong>Departure Delay:</strong>{" "}
                            {flightData.departure?.delay || 0} min
                        </li>
                        <li>
                            <strong>Airline Code:</strong> {flightData.airline?.iata || "N/A"}
                        </li>
                    </ul>
                </div>
            )}

            <div className="ticket-footer">
                <div className="barcode"></div>
            </div>
        </div>
    );
};
BoardingPassUI.propTypes = {
    flightData: PropTypes.shape({
        flight: PropTypes.shape({
            iata: PropTypes.string,
            number: PropTypes.string,
        }),
        departure: PropTypes.shape({
            iata: PropTypes.string,
            airport: PropTypes.string,
            estimated: PropTypes.string,
            gate: PropTypes.string,
            terminal: PropTypes.string,
            delay: PropTypes.number,
        }),
        arrival: PropTypes.shape({
            iata: PropTypes.string,
            airport: PropTypes.string,
            estimated: PropTypes.string,
        }),
        aircraft: PropTypes.shape({
            icao: PropTypes.string,
            registration: PropTypes.string,
        }),
        airline: PropTypes.shape({
            name: PropTypes.string,
            iata: PropTypes.string,
        }),
        flight_status: PropTypes.string,
    }),
    isGeekInfosVisible: PropTypes.bool.isRequired,
    toggleGeekInfosVisibility: PropTypes.func.isRequired,
};

export default BoardingPassUI;
