import React, { ReactElement, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import { View, Text, Avatar, Icon, ExpandableSection, TextField, DateTimePicker, Button, Assets } from 'react-native-ui-lib';
import { Profile } from '../interfaces/Interface';

export const ProfileScreen:React.FC = ({ navigation }:any ) => {

    const [open, setOpen] = useState<boolean>(false)
    const [dataProfile, setDataProfile] = useState<Profile>({
        fullName: '',
        birhtDate: '',
        avatar: ''
    })

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getProfileData()
        });

        return unsubscribe;

    }, [navigation])

    const getProfileData = async () => {
        const getFullName = await AsyncStorage.getItem('fullName') || '',
              getBirthDate = await AsyncStorage.getItem('birthDate') || '',
              avatar = await AsyncStorage.getItem('avatar') || ''

            setDataProfile({
                fullName: getFullName,
                birhtDate: getBirthDate,
                avatar
            })
    }
    
    const setProfileData = (value:string, type: string) => {
        setDataProfile({
            ...dataProfile,
            [type]: value
        })
    }

    const saveProfileData = async () => {
        await AsyncStorage.setItem('fullName', dataProfile.fullName || '')
        await AsyncStorage.setItem('birthDate', dataProfile.birhtDate || '')
    }
    
    const formatDate = (date: string) => {
        const formatDate = new Date(date)
        return formatDate.toLocaleDateString("es-MX", {timeZone: "America/Santiago"})
    }

    const getHeaderElement: JSX.Element = <Text grey10 text60>Edit Profile</Text>

    const getBodyElement: ReactElement =
        <View>
            <TextField
                migrate
                placeholder={'Full Name'}
                black30 marginV-s4
                floatingPlaceholder
                onChangeText={(fullName:string) => setProfileData(fullName,'fullName')}
                floatingPlaceholderStyle={{ fontSize: 20 }}
                floatingPlaceholderColor={{
                    focus: '#f2c103',
                    default: 'gray',
                    fontSize: 20,
                }}
                style={{
                    fontSize: 25,
                }}
            />

            <DateTimePicker
                title={'Date of Birth'}
                placeholder={'DD/MM/YYYY'}
                mode={'date'}
                textColor="#f2c103" 
                onChange={(date:string) => setProfileData(formatDate(date),'birhtDate')}
                style={{ fontSize: 20 }}
            />

            <Button 
                label={'Save'} 
                labelStyle={{ fontSize: 20 }}
                size={Button.sizes.medium} 
                backgroundColor="#f2c103" 
                onPress={saveProfileData}
            />

        </View>

        const AvatarImage = dataProfile.avatar !== '' 
            ? { uri: dataProfile.avatar } 
            : Assets.images.trainer 
    
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={{ padding: 30, marginBottom: 30 }}>
                <View
                    backgroundColor="#FAFAFA"
                    style={{ flex: 1, padding: 30, borderRadius: 20, justifyContent: 'flex-start', alignItems: 'center' }}
                >
                    <Text text40 color="#29282d" marginB-25>Pokemon Trainer</Text>
                    <Avatar 
                        source={AvatarImage}
                        onPress={() => navigation.navigate('Camera', { screen: 'Camera' })}
                        containerStyle={{ borderWidth: 8, borderColor: '#29282d' }}
                        size={250}
                        animate={true}
                        badgeProps={{ size: 70, backgroundColor: '#f2c103' }}
                        customRibbon={
                            <Icon 
                                assetName="camera"
                                size={40}
                                style={{ top: -6, right: -30 }}
                            />
                        } 
                    />
                </View>

                <View
                    style={{ flex: 1, top: 30, marginBottom: 30, backgroundColor: '#FAFAFA', borderRadius: 20, }}
                >
                    <View
                        style={{
                            padding: 30
                        }}
                    >
                        <Text text60 marginV-s4>Trainer{"\n"}<Text yellow40>{dataProfile.fullName}</Text></Text>
                        <Text text60>Birth of Day{"\n"}<Text yellow40>{dataProfile.birhtDate}</Text></Text>
                    </View>
                    

                </View>

                <View
                    style={{ flex: 1, top: 30, backgroundColor: '#FAFAFA', borderRadius: 20, marginBottom: 80 }}
                >
                    <View
                        style={{
                            padding: 30,
                        }}
                    >
                        <ExpandableSection
                            top={false}
                            expanded={open}
                            sectionHeader={getHeaderElement}
                            onPress={() => setOpen(!open)}
                            >
                            {getBodyElement}
                        </ExpandableSection>
                    </View>

                </View>

            </View>
        </ScrollView>  
    );
}