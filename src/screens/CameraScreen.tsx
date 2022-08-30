import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon, View } from 'react-native-ui-lib'
import { ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices, CameraRuntimeError } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CameraScreen:React.FC = ({ navigation }:any) => {

    const devices = useCameraDevices()
    const device = devices.front
    const isFocused = useIsFocused()
    const camera = useRef<Camera>(null)

    useEffect(() => {
        checkCameraPermission()
    }, [])
 
    const checkCameraPermission = async () => {

        const newCameraPermission = await Camera.requestCameraPermission()
        const newMicrophonePermission = await Camera.requestMicrophonePermission()

        const cameraPermission = await Camera.getCameraPermissionStatus()
        const microphonePermission = await Camera.getMicrophonePermissionStatus()
    }

    const takePicture = async () => {
        const data = await camera.current?.takePhoto({
            qualityPrioritization: 'balanced',
            flash: 'on',
            enableAutoRedEyeReduction: true
        })

        await AsyncStorage.setItem('avatar', data?.path || '')
        navigation.goBack()
    }
    
    if (device == null){
        return <ActivityIndicator size={50} color={'#f2c103'} />
    } 
    
    return (  
        <SafeAreaView
            style={{ flex: 1 }}
        >
            <Camera
                ref={camera}
                style={{ flex: 1 }}
                device={device}
                isActive={isFocused}
                photo={true}
            >
                <View style = {{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 50 }}>
                    <TouchableOpacity 
                        style={{ 
                            width: 80, 
                            height: 80, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            backgroundColor: '#f2c103', 
                            borderRadius: 40,
                        }}
                        onPress={takePicture}>
                            
                        <Icon 
                            assetName="camera"
                            size={40}
                            //style={{ bottom: 0 }}
                            onPress={takePicture}
                        />
                    </TouchableOpacity>
                </View>
            </Camera>
        </SafeAreaView>
    )
}
