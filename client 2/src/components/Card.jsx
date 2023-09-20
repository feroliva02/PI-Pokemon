import { Link } from "react-router-dom"
import "./estilos/Card.css"

const Card = ({ id, name, image, attack, types }) => {
    return (
        <div className="card">
            <Link to={`/detail/${id}`}>
                <div className="card-inner">
                    <div className="card-front">
                        <img src={image} alt='' />
                    </div>
                    <div className="card-back">
                        <h2>Name: {name} </h2>
                        <h2>Type: {types}</h2>
                        <h2>Attack: {attack}</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default Card