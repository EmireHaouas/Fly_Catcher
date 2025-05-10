import React from "react";
import "../Header.css";
import aircraftBackground from "../assets/imgs/aircraft3d.webp";

const Header = () => {
    return (
        <header className="Header">
            <nav className="navBar">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a className="navTrack" href="#services">
                    Track My Flight
                </a>
                <a href="#contact">Why Us</a>
            </nav>
            <div className="bannerHeader">
                <img
                    className="aircraftBannerImg"
                    src={aircraftBackground}
                    alt="aircraft banner img"
                />
                <h1 className="titleHeader">Follow Your Flight Worldwide</h1>
                <p className="subtitleHeader">
                    Discover Every Aspect of Your Journey with Precise Flight Data and
                    Up-to-Date Information
                </p>
            </div>
        </header>
    );
};

export default Header;
