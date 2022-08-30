import React from "react";
import { Assets, View, Image } from 'react-native-ui-lib'
import { ActivityIndicator, FlatList } from "react-native";
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from "../components/PokemonCard";

export const CounterScreen:React.FC = () => {

    const { simplePokemonList, loadPokemons } = usePokemonPaginated()

    return (
        <View>
            <Image 
                source={Assets.images.pokebola}
                style={{ 
                    position: 'absolute',
                    width: 300,
                    height: 300,
                    top: -100,
                    right: -100,
                    opacity: 0.2
                 }}
            />

            <View style={{ alignItems: 'center' }}>
                <FlatList 
                    data={simplePokemonList}
                    keyExtractor={ pokemon => pokemon.id }
                    showsVerticalScrollIndicator={false}
                    renderItem={ ({ item }) => <PokemonCard pokemon={item} /> }
                    onEndReached={ loadPokemons }
                    onEndReachedThreshold={0.4}
                    ListFooterComponent={(
                        <ActivityIndicator 
                            style={{ height: 100 }} 
                            size={20}
                            color="gray"
                        />
                    )}
                />
            
            </View>
                 
        </View>
    );

}