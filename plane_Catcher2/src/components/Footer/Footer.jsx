import "./Footer.css";
import logo from "../../assets/imgs/logo.png";
import whatsapp from "../../assets/imgs/whatsapp.png";
import twitter from "../../assets/imgs/twitter.png";
import instagram from "../../assets/imgs/instagram.png";
import facebook from "../../assets/imgs/facebook.png";

const Main = () => {
    return (
        <div className="footer">
            <div className="dede">
                <img className="logo" alt="" src={logo} />
                <p className="credit">Developed and designed by Emire.H</p>
                <div className="social_Network">
                    <a
                        href="https://www.whatsapp.com/"
                        target="blank"
                        rel="noopener noreferrer"
                        className="a_Whatsapp"
                    >
                        <img className="whatsapp_Logo" alt="Whatsapp logo" src={whatsapp} />
                    </a>
                    <a
                        href="https://x.com/"
                        target="blank"
                        rel="noopener noreferrer"
                        className="a_Twitter"
                    >
                        <img className="twitter_Logo" alt="Twitter logo" src={twitter} />
                    </a>
                    <a
                        href="https://www.instagram.com/"
                        target="blank"
                        rel="noopener noreferrer"
                        className="a_Instagram"
                    >
                        <img
                            className="instagram_Logo"
                            alt="Instagram logo"
                            src={instagram}
                        />
                    </a>
                    <a
                        href="https://www.facebook.com/"
                        target="blank"
                        rel="noopener noreferrer"
                        className="a_Facebook"
                    >
                        <img className="facebook_Logo" alt="Facebook logo" src={facebook} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Main;
