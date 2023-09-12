const axios = require("axios")
const { Pokemon, Type } = require("../db")

const getPokemonId = async (id, source) => {
	if (source === "bdd") {
		const pokemonIdDb = await Pokemon.findByPk(id, {
            include: [{
                model: Type,
                attributes: ["name"],
                through: {attributes: []},
            }]
        })
        const pokemonIdFinal = {
            id: pokemonIdDb.id,
            name: pokemonIdDb.name,
            image: pokemonIdDb.image,
            hp: pokemonIdDb.hp,
            attack: pokemonIdDb.attack,
            defense: pokemonIdDb.defense,
            speed: pokemonIdDb.speed,
            height: pokemonIdDb.height,
            weight: pokemonIdDb.weight,
            type: pokemonIdDb.types.map((tipos) => tipos.name)
        }
		return pokemonIdFinal;
	}
	else {
		const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
		const pokemonId = response.data
		const {name, sprites, stats, height, weight, types } = pokemonId
        const pokemonFinal = {
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
		return pokemonFinal;
	}
}

module.exports = { getPokemonId }