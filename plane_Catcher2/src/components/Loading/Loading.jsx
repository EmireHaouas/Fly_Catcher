import "./Loading.css";
import aircraftLoading from "../../assets/imgs/aircraftLoading.gif";

const Loading = () => {
    return (
        <div className="loadingContainer">
            <img className="loadingImg" src={aircraftLoading} alt="aircraft" />
            <p>Tower to pilot: fetching flight data!</p>
            <p>Preparing your boarding pass...</p>
        </div>
    );
};
export default Loading;
