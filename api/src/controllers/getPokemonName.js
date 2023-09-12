const axios = require("axios");
const { Pokemon, Type } = require("../db")
const { Op } = require("sequelize");

const getPokemonName = async (name) => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=60")
    const pokemonList = response.data.results;
    const pokemonEncontrado = pokemonList.find((pokemon) => pokemon.name === name);
    const pokemonNameApi = []
    if (pokemonEncontrado) {
        const response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonFeatures = response2.data;
        const { id, sprites, stats, height, weight, types } = pokemonFeatures;
        pokemonNameApi.push({
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
        });
    }
        const pokemonNameDb = await Pokemon.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}`,
                },
            },
            include: [{
                model: Type,
                attributes: ["name"],
                through: {attributes: []},
            }]
        })
    const pokemonNameDbMapeados = pokemonNameDb.map((pokemon) =>({
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



        return [...pokemonNameApi, ...pokemonNameDbMapeados];
    }

    module.exports = { getPokemonName }

