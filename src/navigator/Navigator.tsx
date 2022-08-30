import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from '../screens/ProfileScreen';
import { PokeListScreen } from '../screens/PokeList';
import { CounterScreen } from '../screens/CounterScreen';
import { Icon } from 'react-native-ui-lib';
import { BlurView } from "@react-native-community/blur";
import { CameraScreen } from '../screens/CameraScreen';

export const Navigator: React.FC = () => {

    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const TabNavigator = () => {
        return (
            <Tab.Navigator
                initialRouteName="Counter"
                screenOptions={{
                    tabBarActiveTintColor: '#f2c103',
                    tabBarInactiveTintColor: '#222222',
                    tabBarStyle: { position: 'absolute' },
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarBackground: () => (
                        <BlurView 
                            blurType="light"
                            blurAmount={15}
                            reducedTransparencyFallbackColor="white"
                            style={{ 
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0
                             }} 
                        />
                    ),
                }}
            >
                <Tab.Screen 
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{
                        tabBarIconStyle: { marginTop: 5 }, 
                        tabBarIcon: ({ color }) => <Icon 
                            assetName="profile"
                            size={30} 
                            tintColor={color} 
                        /> 
                    }} 
                />
                <Tab.Screen 
                    name="Pokedex" 
                    component={PokeListScreen} 
                    options={{
                        tabBarIconStyle: { marginTop: 5 }, 
                        tabBarIcon: ({ color }) => <Icon 
                            assetName="search"
                            size={30}
                            tintColor={color}
                        />
                    }}
                />
                <Tab.Screen 
                    name="Counter" 
                    component={CounterScreen}
                    options={{
                        tabBarIconStyle: { marginTop: 5 }, 
                        tabBarIcon: ({ color }) => <Icon 
                            assetName="add"
                            size={30}
                            tintColor={color}
                        />
                    }}
                />
            </Tab.Navigator>
        )
    }

    return (
        <Stack.Navigator initialRouteName="Counter">
            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Camera" 
                component={CameraScreen} 
                options={{ headerTitle: 'Take a selfie!', 
                headerBackTitleVisible: false }} 
            />
      </Stack.Navigator>
    )
}