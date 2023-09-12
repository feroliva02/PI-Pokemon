import { Link } from "react-router-dom";
import "./Landing.css"

const Landing = () => {
    return (
        <div className="background">
            <button className ="btn">
                <Link to="/home" className="Link" > Home Page </Link>
            </button>
            </div>
    )
}

export default Landing