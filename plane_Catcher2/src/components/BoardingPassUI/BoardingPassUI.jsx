import React from "react";
import "./BoardingPassUI.css";

const BoardingPassUI = ({ flightData }) => {
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
            </div>

            <div className="ticket-footer">
                <div className="barcode"></div>
            </div>
        </div>
    );
};

export default BoardingPassUI;
