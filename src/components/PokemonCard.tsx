import React, { useEffect, useRef, useState } from "react";
import { Card, Text, Image, Assets, View } from 'react-native-ui-lib';
import { CompleteDataByPokemon, dataOnePokemon, SimplePokemon } from "../interfaces/Interface";
import { Modal, Pressable } from "react-native";
import { pokemonApi } from '../api/pokemonApi';
import ImageColors from 'react-native-image-colors';

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon } : Props) => { // Generated by https://quicktype.io

    const [bgColor, setBgColor] = useState<String>()
    const isMounted = useRef(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [dataPokemon, setDataPokemon] = useState<dataOnePokemon>();

    useEffect(() => {

        if(!isMounted.current) return;
    
        ImageColors.getColors(pokemon.picture!, { fallback: 'lightgray', key: pokemon.id })
                   .then(colors => {
                        colors.platform === 'android' 
                            ?   setBgColor(colors.dominant)
                            :   setBgColor(colors.background)
                   })
                   .catch(err => console.log(err))
    
        return () => {
            isMounted.current = false
        }
    
    }, [])

    const getInfoForPokemon = async (id:string) => {
        
        const res = await pokemonApi.get<CompleteDataByPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data: dataOnePokemon = {
            name: res.data.name,
            moves: res.data.moves.map(move => move.move.name).slice(-5),
            types: res.data.types.map(type => type.type.name)
        }

        setDataPokemon(data)
        setModalVisible(true)
    }

    return(
        <>
            <Card
                height={200}
                elevation={10}
                enableBlur={true}
                borderRadius={50}
                activeOpacity={1}
                marginT-50
                containerStyle={{
                    margin: 30,
                    backgroundColor: bgColor,
                    shadowColor: '#000',
                    shadowOffset: { width: 5, height: 10 },
                }}
                blurOptions={{
                    intensity: 30,
                    style: 'light',
                    tintColor: bgColor
                }}
                onPress={() => getInfoForPokemon(pokemon.id)}
            >
                <Card.Section
                    imageSource={{ uri: pokemon.picture }}
                    imageStyle={{ width: 280, height: '100%', marginTop: 52 }}
                    content={[{text: `#${pokemon.id}`, text40: true, grey10: true}]}
                    contentStyle={{ marginTop: -30, left: 20, justifyContent: 'center', alignItems: 'flex-start' }}
                />
            </Card>
       
            <Modal
                animationType="slide"
                presentationStyle="pageSheet"
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(!modalVisible)}}
            >
                <Card 
                    style={{ flex: 1, padding: 50 }}
                    enableBlur={true}
                    activeOpacity={1}
                    blurOptions={{
                        intensity: 30,
                        style: 'light',
                        tintColor: bgColor
                    }}
                    containerStyle={{
                        backgroundColor: bgColor,
                        shadowColor: '#000',
                        shadowOffset: { width: 5, height: 10 },
                    }}
                >
                    <Text text40 marginV-s5 yellow40>Name {'\n'}<Text>{dataPokemon?.name}</Text></Text>
                    <Text text40 marginV-s5 yellow40>Moves {'\n'}<Text>{dataPokemon?.moves.join(", ")}</Text></Text>
                    <Text text40 marginV-s5 yellow40>Types {'\n'}<Text>{dataPokemon?.types.join(", ")}</Text></Text>

                    <View center marginT-30>
                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            <Image source={Assets.images.close} style={{ width: 60, height: 60 }} />
                        </Pressable>
                    </View>
                    
                </Card>
            </Modal>
        </>
    )
}