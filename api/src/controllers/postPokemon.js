const {Pokemon, Type} = require("../db")

const postPokemon =  async (name, image, hp, attack, defense, speed, height, weight, types) =>{
    const newPokemon = await Pokemon.create({
        name: name,
        image: image,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height,
        weight: weight,
    });

    if(types && types.length >= 2){
        const typesAssociated = await Type.findAll({
            where: {name: types},
        })
    
    //genera la asociacion:
    await newPokemon.setTypes(typesAssociated);
    }
    else{
        throw new Error("Debe elegir al menos 2 tipos")
    }
    //if (created) console.log("Pokemon creado con exito", newPokemon.name);
    //else console.log("Pokemon existente encontrado con exito", newPokemon.name);
    return newPokemon;

}

module.exports = {postPokemon}