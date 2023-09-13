import Card from "./Card"
import Paginacion from "./Paginacion"
import { useSelector } from "react-redux"
import {useState} from 'react'

const Cards = ()=>{

    const pokemons = useSelector(state => state.pokemons) //pone en pokemons la prop del estado global que tiene el array con los pokemones

    const [pokemonQt, setPokemonQt] = useState(12)
    const [pagina, setPagina] = useState(1)
    
    const indexFinal = pagina * pokemonQt  //Numero del ultimo dato de la pagina (12, 24, 36, etc)
    const indexInicial = indexFinal - pokemonQt  //Numero del primer dato de la pagina

    
    const nPokemons = Array.isArray(pokemons) ? pokemons.slice(indexInicial, indexFinal) : [];  //pokemons que se ven en el momento
    const nPaginas = Math.ceil(pokemons.length / pokemonQt)  //cantidad de paginas totales

    

    return(
        <div>
            {
            nPokemons.map((pokemon) =>{
                return(
                    <Card
                    key = {pokemon.id}
                    id = {pokemon.id}
                    name = {pokemon.name}
                    image = {pokemon.image}
                    hp = {pokemon.hp}
                    attack = {pokemon.attack}
                    defense = {pokemon.defense}
                    speed = {pokemon.speed}
                    height = {pokemon.height}
                    weight = {pokemon.weight}
                    types = {pokemon.type.map((tipo)=> tipo + " ")}
                    />
                )
            })}
            <Paginacion setPagina={setPagina} pagina={pagina} nPaginas={nPaginas}/>
        </div>
    )
}

export default Cards;
