import "./FlightError.css";
import errorIcon from "../../assets/imgs/error.webp";
import PropTypes from "prop-types";

const FlightError = ({ error }) => {
    return (
        <div className="errorContainer">
            <img className="errorImg" src={errorIcon} alt="aircraft" />
            <p>{error}</p>
        </div>
    );
};
FlightError.propTypes = {
    error: PropTypes.string.isRequired,
};

export default FlightError;
