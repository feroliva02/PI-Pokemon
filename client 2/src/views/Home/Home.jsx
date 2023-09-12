import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokemons, filterTypeCards, filterOriginCards, orderCards, getTypes } from "../../redux/actions"
import "./Home.css"
import Cards from "../../components/Cards"
import SearchBar from "../../components/SearchBar"

const Home = () => {

    const types = useSelector(state => state.types)
    console.log(types);

    const dispatch = useDispatch();

    useEffect(() => {
        Promise.all([dispatch(getPokemons()), dispatch(getTypes())])
    }, [dispatch])

    const filterTypeHandler = (event) => {
        dispatch(filterTypeCards(event.target.value))
    }

    const filterOriginHandler = (event) => {
        dispatch(filterOriginCards(event.target.value))
        console.log(event.target.value);
    }

    const orderHandler = (event) => {
        dispatch(orderCards(event.target.value));
        console.log(event.target.value);
    }

    return (
        <div className="back">
            <div><SearchBar /></div>
            <div className="filtros">
                <select className="button_filtro" onChange={filterTypeHandler}>
                    <option value="">Todos los tipos</option>
                    {types.map((type) => (
                        <option key={type.id} value={type.name} >{type.name}</option>
                    ))}

                </select>
                <select className="button_filtro" onChange={filterOriginHandler}>
                    <option value="api">API</option>
                    <option value="db">Database</option>
                </select>
                <select className="button_filtro" onChange={orderHandler}>
                    <option value="AA">Ascendente por ataque</option>
                    <option value="DA">Descendente por ataque</option>
                    <option value="AN">Ascendente por nombre</option>
                    <option value="DN">Descendente por nombre</option>
                </select>
            </div>

            <Cards />
        </div>
    )
}

export default Home