const { getAllPokemons } = require("../controllers/getPokemons")
const { getPokemonId } = require("../controllers/getPokemonId")
const { getPokemonName } = require("../controllers/getPokemonName")
const { postPokemon } = require("../controllers/postPokemon")

const getPokemonsHandler = async (req, res) => {
    try {
        const { name } = req.query
        const pokemons = name ? await getPokemonName(name.toLowerCase()) : await getAllPokemons()
        pokemons.length > 0  
        ? res.status(200).json(pokemons)
        : res.status(404).send("No existe el Pokemón")
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

const getPokemonIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const source = (isNaN(id)) ? "bdd" : "api"
        const pokemonId = await getPokemonId(id, source)
        res.status(200).json(pokemonId);
    }
    catch (error) {
        res.status(404).send("No se encontró el Pokémon")
    }
}

const postPokemonHandler = async (req, res) => {
    try {
        const {name, image, hp, attack, defense, speed, height, weight, types } = req.body;
        const newPokemon = await postPokemon(name, image, hp, attack, defense, speed, height, weight, types);
        res.status(200).json(newPokemon)
    }
    catch(error) {
        res.status(404).send(error.message)
    }
}

module.exports = { getPokemonsHandler, getPokemonIdHandler, postPokemonHandler }