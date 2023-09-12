import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPokemonId } from "../../redux/actions";
import "../../components/estilos/Card.css"


const Detail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const pokemon = useSelector((state) => state.pokemons)

    useEffect(() => {
        dispatch(getPokemonId(id))
    }, [dispatch, id]);

    return (
        <div className="back">
            <div className="card">
                <div className="card-inner">
                    <div className="card-front">
                        <img src={pokemon.image} alt='' />
                    </div>
                    <div className="card-back">
                        <h2>Name: {pokemon.name}</h2>
                        <h2>ID: {pokemon.id}</h2>
                        <h2>Hp: {pokemon.hp}</h2>
                        <h2>Attack: {pokemon.attack}</h2>
                        <h2>Defense: {pokemon.defense}</h2>
                        <h2>Speed: {pokemon.speed}</h2>
                        <h2>Height: {pokemon.height}</h2>
                        <h2>Weight: {pokemon.weight}</h2>
                        <h2>Type: {pokemon.type ? pokemon.type.map((tipo) => tipo + ' ') : ''}</h2>  {/*evita que se ejecute map si el type es undefined */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail