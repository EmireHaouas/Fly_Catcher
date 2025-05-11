import "./FormTracking.css";
import PropTypes from "prop-types";

const FormTracking = ({
                          flightId,
                          setFlightId,
                          date,
                          setDate,
                          handleSubmit,
                      }) => {
    return (
        <form id='trackMyFlight' className="flightForm" onSubmit={handleSubmit}>
            <div className="formGroup">
                <label className="visually-hidden" htmlFor="flightNumber">
                    Flight Number
                </label>
                <input
                    type="text"
                    id="flightNumber"
                    value={flightId}
                    onChange={(e) => setFlightId(e.target.value)}
                    required
                    placeholder="Flight number (e.g. QR806)"
                />
            </div>

            <div className="formGroup">
                <label className="visually-hidden" htmlFor="flightDate">
                    Date
                </label>
                <input
                    type="date"
                    id="flightDate"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="submit_Btn">
                Track Flight
            </button>
        </form>
    );
};
FormTracking.propTypes = {
    flightId: PropTypes.string.isRequired,
    setFlightId: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    setDate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default FormTracking;
