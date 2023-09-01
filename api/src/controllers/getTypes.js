const axios = require("axios")
const {Type} = require("../db")


const getTypes = async() => {
    const response = await axios.get("https://pokeapi.co/api/v2/type")
    const typesApi = response.data.results
    const typesMap = typesApi.map((typesApi) => (
        typesApi.name
    ));
    return typesMap;
}

module.exports = {getTypes}