import React from "react";
import './FormTracking.css'


const FormTracking = ({flightId, setFlightId, date, setDate, handleSubmit }) => {
    return (
        <form className="flightForm" onSubmit={handleSubmit}>
            <div className="formGroup">
                <label className='visually-hidden' htmlFor="flightNumber">Flight Number</label>
                <input type="text" id="flightNumber" value={flightId}
                       onChange={(e) => setFlightId(e.target.value)}
                       required placeholder="Flight number (e.g. QR806)"/>
            </div>

            <div className="formGroup">
                <label className='visually-hidden' htmlFor="flightDate">Date</label>
                <input type="date" id="flightDate" value={date}
                       onChange={(e) => setDate(e.target.value)}
                       required/>
            </div>

            <button type="submit" className="submit_Btn">Track Flight</button>
        </form>


    );
};
export default FormTracking;