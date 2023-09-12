import axios from "axios"

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON_ID = "GET_POKEMON_ID"
export const GET_POKEMON_NAME = "GET_POKEMON_NAME"
export const GET_POKEMON_TYPES = "GET_POKEMON_TYPES"
export const FILTER_TYPE = "FILTER_TYPE"
export const FILTER_ORIGIN = "FILTER_ORIGIN"
export const ORDER_CARDS = "ORDER_CARDS"
export const SHOW_POKEMONS = "SHOW_POKEMONS"
export const POST_POKEMON = "POST_POKEMON"


export const getPokemons = () => {
    return async (dispatch) => {
        const pokemons = (await axios.get("http://localhost:3001/pokemons/")).data
        return dispatch({
            type: GET_POKEMONS,
            payload: pokemons
        })
    };
};

export const getPokemonId = (id) => {
    return async (dispatch) => {
        const pokemonId = (await axios.get(`http://localhost:3001/pokemons/${id}`)).data
        return dispatch({
            type: GET_POKEMON_ID,
            payload: pokemonId
        })
    }
}

export const getPokemonName = (name) => {
    return async (dispatch) => {
        const pokemonName = await axios.get(`http://localhost:3001/pokemons/?name=${name}`)
        console.log(pokemonName);
        return dispatch({
            type: GET_POKEMON_NAME,
            payload: pokemonName.data
        })
    }
}

export const getTypes = () =>{
    return async (dispatch) => {
        const pokemonTypes = await axios.get(`http://localhost:3001/types`)
        return dispatch({
            type: GET_POKEMON_TYPES,
            payload: pokemonTypes.data
        })
    }
}

export const postPokemon = (pokemonData) =>{
    return async(dispatch) =>{
        const response = await axios.post("http://localhost:3001/pokemons", pokemonData)
        return dispatch({
            type: POST_POKEMON,
            payload: response.data
        })
    }
}

export const showPokemons = ()=>{
    return{
        type: SHOW_POKEMONS
    }
}


export const filterTypeCards = (type)=>{
    return{
        type: FILTER_TYPE,
        payload: type
    }
}

export const filterOriginCards = (origin)=>{
    return{
        type: FILTER_ORIGIN,
        payload: origin,
    }
}

export const orderCards = (orden) =>{
    return{
        type: ORDER_CARDS,
        payload: orden
    }
}
