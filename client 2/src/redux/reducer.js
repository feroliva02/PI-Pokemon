import { GET_POKEMONS, GET_POKEMON_NAME, GET_POKEMON_TYPES, GET_POKEMON_ID, POST_POKEMON, FILTER_TYPE, FILTER_ORIGIN, ORDER_CARDS, SHOW_POKEMONS } from "./actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return { ...state, pokemons: action.payload, allPokemons: action.payload }; // hay que devolver el estado con las prop modificadas

        case GET_POKEMON_NAME:
            return { ...state, pokemons: action.payload };

        case GET_POKEMON_ID:
            return { ...state, pokemons: action.payload };

        case GET_POKEMON_TYPES:
            return { ...state, types: action.payload };

        case POST_POKEMON:
            return { ...state, pokemons: [...state.pokemons, action.payload] }

        case SHOW_POKEMONS:
            const pokemonsSinFiltro = [...state.allPokemons]
            return { ...state, pokemons: pokemonsSinFiltro };

        case FILTER_TYPE:
            if (action.payload === "") {
                const pokemonsSinFiltro = [...state.allPokemons]
                return { ...state, pokemons: pokemonsSinFiltro };
            }
            else {
                const pokemonsFiltrados = state.allPokemons.filter((pokemon) => pokemon.type.includes(action.payload))
                return { ...state, pokemons: pokemonsFiltrados };
            }

        case FILTER_ORIGIN:
            if (action.payload === "") {
                const pokemonsProp = [...state.allPokemons]
                return { ...state, pokemons: pokemonsProp };
            }
            else if (action.payload === "api") {
                const pokemonProp = state.allPokemons.filter((pokemon) => typeof pokemon.id === 'number');
                return { ...state, pokemons: pokemonProp }
            }
            else if (action.payload === "db") {
                const pokemonProp = state.allPokemons.filter((pokemon) => typeof (pokemon.id) !== 'number');
                return { ...state, pokemons: pokemonProp }
            };

        case ORDER_CARDS:
            const copia = [...state.pokemons]
            if (action.payload === "AA") {
                const pokemonOrdenados = copia.sort((pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack)
                return { ...state, pokemons: pokemonOrdenados }
            } else if (action.payload === "DA") {
                const pokemonOrdenados = copia.sort((pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack)
                return { ...state, pokemons: pokemonOrdenados }
            } else if (action.payload === "AN") {
                const pokemonOrdenados = copia.sort((pokemonA, pokemonB) => pokemonA.name.localeCompare(pokemonB.name))
                return { ...state, pokemons: pokemonOrdenados }
            } else {
                const pokemonOrdenados = copia.sort((pokemonA, pokemonB) => pokemonB.name.localeCompare(pokemonA.name))
                return { ...state, pokemons: pokemonOrdenados }
            }

        default:
            return { ...state };
    }
};

export default reducer;