import React from "react";
import './FlightError.css'
import errorIcon from "../../assets/imgs/error.webp";

const FlightError = ({ error }) => {
    return(
        <div className='errorContainer'>
            <img className='errorImg' src={errorIcon} alt="aircraft" />
            <p>{error}</p>

        </div>
    );
};
export default FlightError;