const { Router } = require('express');
const { getPokemonsHandler, getPokemonIdHandler, postPokemonHandler } = require('../handlers/pokemonsHandlers')
const { getTypesHandler } = require('../handlers/typesHandlers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", getPokemonsHandler)
router.get("/pokemons/:id", getPokemonIdHandler)
router.get("/types", getTypesHandler)
router.post("/pokemons", postPokemonHandler)

module.exports = router;
