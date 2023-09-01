const axios = require("axios")
const {Type} = require("../db")

const saveTypes = async() => {
    const response = await axios.get("https://pokeapi.co/api/v2/type")
    const typesApi = response.data.results
    const typesMap = typesApi.map((typesApi) => ({ 
        name: typesApi.name
    }));
    const typesDb = await Type.bulkCreate(typesMap);
    return typesDb;
}

module.exports = {saveTypes}