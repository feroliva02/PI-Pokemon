const { getTypes } = require("../controllers/getTypes")

const getTypesHandler = async(req, res) => {
    try {
        const pokemonTypes = await getTypes()
        res.status(200).json(pokemonTypes)
    }
    catch(error) {
        res.status(404).send(error.message)
    }
}

module.exports = { getTypesHandler }