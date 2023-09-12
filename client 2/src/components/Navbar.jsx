import { Link } from "react-router-dom";
import "./estilos/Navbar.css";

const Navbar = () => {
    return (
        <div className="navBar">
            <button className="button_home">
                <Link to="/home" className="Link">Home</Link>
            </button>
            <button className="button_form">
                <Link to="/form" className="Link">Form</Link>
            </button>
            <button className="button_form">
                <Link to="/" className="Link">Log Out</Link>
            </button>
        </div>
    )
}

export default Navbar;