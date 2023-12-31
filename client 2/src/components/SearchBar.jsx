import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonName, showPokemons } from "../redux/actions";
import "./estilos/SearchBar.css"

const SearchBar = () => {

    const [name, setName] = useState("")

    const dispatch = useDispatch();

    const changeHandler = (event) => {
        setName(event.target.value)
        console.log(event.target.value);
    }

    const searchHandler = (name) => {
        dispatch(getPokemonName(name));
        setName("")
    }

    const showAllPokemons = () => {
        dispatch(showPokemons())
    }

    return (
        <div className="search">
            <input className="input" placeholder="Ingrese un nombre..." type="search" value={name} onChange={changeHandler} />
            <button className="button" onClick={() => { searchHandler(name) }}>
                <span>
                    <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path></svg>
                </span>
            </button>
            <button className="button_traer" onClick={showAllPokemons}>SHOW ALL POKEMONS</button>
        </div >
    )
}

export default SearchBar