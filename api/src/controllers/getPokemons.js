const axios = require("axios")
const { Pokemon, Type, PokemonType } = require("../db");

const getAllPokemons = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
    const pokemonsApi = response.data.results;
    const pokemonsFinalesApi = []
    for (let i = 0; i < pokemonsApi.length; i++) {
        const pokemonFeatures = await axios.get(pokemonsApi[i].url)
        const { id, name, sprites, stats, height, weight, types } = pokemonFeatures.data
        pokemonsFinalesApi.push({
            id,
            name,
            image: sprites.front_default,
            hp: stats.find((estadistica) => estadistica.stat.name === "hp").base_stat,
            attack: stats.find((estadistica) => estadistica.stat.name === "attack").base_stat,
            defense: stats.find((estadistica) => estadistica.stat.name === "defense").base_stat,
            speed: stats.find((estadistica) => estadistica.stat.name === "speed").base_stat,
            height,
            weight,
            type: types.map((tipos) => tipos.type.name)
        });
    }
    const pokemonsDb = await Pokemon.findAll({
        include: [{
            model: Type,
            attributes: ["name"],
            through: {attributes: []},
        }]
    });
    const pokemonsDbMapeados = pokemonsDb.map((pokemon) =>({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
        type: pokemon.types.map((tipos) => tipos.name)
    }))

    return [...pokemonsFinalesApi, ...pokemonsDbMapeados];
}

module.exports = { getAllPokemons }