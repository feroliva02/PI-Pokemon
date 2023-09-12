const axios = require("axios")
const { Pokemon, Type, PokemonType } = require("../db");

const getAllPokemons = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=60")
    const pokemonsApi = response.data.results;  //array con todos los pokemons y su url
    const pokemonsFinalesApi = []
    const pokemonPromises = pokemonsApi.map(async (pokemon) =>{  //async porque usamos await en axios
        const pokemonFeatures = await axios.get(pokemon.url)  //axios devuelve promesas
        const { id, name, sprites, stats, height, weight, types } = pokemonFeatures.data
        return{
            id,
            name,
            image: sprites.other.dream_world.front_default,
            hp: stats.find((estadistica) => estadistica.stat.name === "hp").base_stat,
            attack: stats.find((estadistica) => estadistica.stat.name === "attack").base_stat,
            defense: stats.find((estadistica) => estadistica.stat.name === "defense").base_stat,
            speed: stats.find((estadistica) => estadistica.stat.name === "speed").base_stat,
            height,
            weight,
            type: types.map((tipos) => tipos.type.name)
        };
    });
    const promesasResueltas = await Promise.all(pokemonPromises);  //espera a que todas las promesas se resuelvan simultaneamente, las soli se realizan en paralelo
    pokemonsFinalesApi.push(...promesasResueltas);


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