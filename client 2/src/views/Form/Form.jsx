import "./Form.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemon } from "../../redux/actions"

const Form = () => {

    const types = useSelector(state => state.types)
    const pokemons = useSelector(state => state.pokemons)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])


    const [selectedTypes, setSelectedTypes] = useState([])

    const [pokemonData, setPokemonData] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: []
    });


    const [errors, setErrors] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: ""
    });

    const changeHandler = (event) => {
        const property = event.target.name;  //nombre de la propiedad que disparo el evento
        const value = event.target.value;   //valor 
        setPokemonData({ ...pokemonData, [property]: value })  //asignamos el valor a la propiedad que disparo el evento
        validate({ ...pokemonData, [property]: value })
    }

    const validate = (pokemonData) => {
        const newErrors = {};
        if (pokemonData.name.length > 0 && pokemonData.name.length < 3 || pokemonData.name.length >= 10) {
            newErrors.name = "El nombre debe tener entre 3 y 10 caracteres";
        } else newErrors.name = ""

        if (pokemonData.hp > 200 || pokemonData.hp.length > 0 && pokemonData.hp < 20) {
            newErrors.hp = 'El hp debe ser mayor a 20 y menor a 200';
        } else newErrors.hp = ""

        if (pokemonData.attack > 100 || pokemonData.attack.length > 0 && pokemonData.attack < 10) {
            newErrors.attack = 'El ataque debe ser mayor a 10 y menor a 100';
        } else newErrors.attack = ""

        if (pokemonData.defense > 150 || pokemonData.defense.length > 0 && pokemonData.defense < 15) {
            newErrors.defense = 'La defensa debe ser mayor a 15 y menor a 150';
        } else newErrors.defense = ""

        // Usamos el operador spread (...) para fusionar los nuevos errores con los existentes
        setErrors({ ...errors, ...newErrors });
    }


    const selectTypeHandler = (event) => {
        if (selectedTypes.includes(event.target.value)) {                                              //si el tipo elegido ya esta dentro de los elegidos...
            const tipoEliminado = selectedTypes.filter((tipo) => { tipo !== event.target.value })     //guarda todos menos el clickeado(eliminalo)
            setSelectedTypes(tipoEliminado);                                                         //modifica el selectedTypes (selectedTypes es para saber los tipos elegidos)
            setPokemonData((prev) => ({ ...prev, types: tipoEliminado }));                          //setea en pokemon data lo que habia antes y en types, agrega el array de los tipos seleccionados, actualizandose siempre
        }
        else {
            setSelectedTypes((prev) => [...prev, event.target.value]);                              //modifica el selectedTypes, con lo que habia antes y agrega el tipo nuevo 
            setPokemonData((prev) => ({ ...prev, types: [...prev.types, event.target.value] }));   //setea en pokemon data lo que habia antes y en types, pone lo que habia antes y agrega el tipo nuevo
        }                                                                                         //(pokemonData es para guardar los tipos y enviar el formulario)
    }

    const hayErrores = (errors.name || errors.image || errors.hp || errors.attack || errors.defense)
    const campoVacio = !pokemonData.name || !pokemonData.image || !pokemonData.hp || !pokemonData.attack || !pokemonData.defense;

    const submitHandler = async (event) => {
        event.preventDefault()
        if (pokemonData.types.length < 2) window.alert("Elige al menos 2 tipos")
        else {
            if (!pokemonData.speed) {
                pokemonData.speed = null;
            }
            if (!pokemonData.height) {
                pokemonData.height = null;
            }
            if (!pokemonData.weight) {
                pokemonData.weight = null;
            }
            const pokemonExiste = pokemons.find((pokemon) => pokemon.name === pokemonData.name)
            if (pokemonExiste) window.alert("Pokemon ya existente")
            else {
                dispatch(postPokemon(pokemonData))
                window.alert("Pokemon creado");
                setPokemonData({
                    name: "",
                    image: "",
                    hp: "",
                    attack: "",
                    defense: "",
                    speed: "",
                    height: "",
                    weight: "",
                    types: []
                })
            }
        }
    }

    return (
        <form className="back" onSubmit={submitHandler}>
            <div className="formul">
                <h1>¡Crea tu propio Pokemon!</h1>
                <br />

                <label className="label">Name: </label>
                <input className="input" type="text" value={pokemonData.name} name="name" onChange={changeHandler} />
                <p><span>{errors.name}</span></p>
                <br />

                <label className="label">Image: </label>
                <input className="input" type="url" value={pokemonData.image} name="image" onChange={changeHandler} />
                <br /><br />

                <label className="label">Hp: </label>
                <input className="input" type="number" value={pokemonData.hp} name="hp" onChange={changeHandler} />
                <p><span>{errors.hp}</span></p>
                <br />

                <label className="label">Attack: </label>
                <input className="input" type="number" value={pokemonData.attack} name="attack" onChange={changeHandler} />
                <p><span>{errors.attack}</span></p>
                <br />

                <label className="label">Defense: </label>
                <input className="input" type="number" value={pokemonData.defense} name="defense" onChange={changeHandler} />
                <p><span>{errors.defense}</span></p>
                <br />

                <label className="label">Speed: </label>
                <input className="input" type="number" value={pokemonData.speed} name="speed" onChange={changeHandler} />
                <br /><br />

                <label className="label">Height: </label>
                <input className="input" type="number" value={pokemonData.height} name="height" onChange={changeHandler} />
                <br /><br />

                <label className="label">Weight: </label>
                <input className="input" type="number" value={pokemonData.weight} name="weight" onChange={changeHandler} />
                <br /><br />

                <label className="label">Types: </label>
                <div className="type-buttons">
                    {types.map((type) => {
                        return (
                            <button className="button_type" type="button" key={type.id} value={type.name} onClick={selectTypeHandler}>{type.name}</button>
                        )
                    })}
                </div>
                <button disabled={hayErrores || campoVacio} className="button_submit" type="submit">Crear Pokémon</button>
            </div>
        </form>
    )
}

export default Form
