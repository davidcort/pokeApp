import { useEffect, useRef, useState } from "react";
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SimplePokemon, Result } from '../interfaces/Interface';

export const usePokemonPaginated = () => {

    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=20')

    useEffect(() => {

        loadPokemons()

    } ,[])

    const loadPokemons = async () => {

        setIsLoading(true)

        const res = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current)
        nextPageUrl.current = res.data.next

        mapPokemonList(res.data.results)
    }

    const mapPokemonList = ( pokemonList: Result[] ) => {

        const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {

            const urlParts = url.split('/')
            const id = urlParts[urlParts.length - 2]
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

            return {
                id,
                picture,
                name,
                url
            }

        })

        //console.log(newPokemonList)

        setSimplePokemonList([...simplePokemonList, ...newPokemonList])
        setIsLoading(false)
    }

    return {
        isLoading,
        simplePokemonList,
        loadPokemons
    };

}