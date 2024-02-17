// App.js
import React, {useEffect} from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Components/HomeScreen';
import ImageViewScreen from './Components/ImageViewScreen';
import DualImageViewScreen from './Components/DualImageViewScreen';
import CaptureImage2 from './Components/CaptureImage2';
import { firebaseConfig } from './firebaseConfig'; // Import your Firebase config
import {firebase, initializeApp, getApps } from "firebase/app"
import 'firebase/storage';
const Stack = createStackNavigator();

 const App = () => {
        useEffect(() => {
            if (!getApps().length) {
                console.log('Firebase not initialized. Initializing now...');
                initializeApp(firebaseConfig);
                console.log('Firebase initialized successfully.');
            }
        }, []);
        return (
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Home">
                            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Photo App' }} />
                            <Stack.Screen name="ImageView" component={ImageViewScreen} options={{ title: 'Image View' }} />
                            <Stack.Screen name="DualImageView" component={DualImageViewScreen} options={{ title: 'Dual Image View' }} />
                            <Stack.Screen name="CaptureImage2" component={CaptureImage2} options={{ title: 'Capture/Upload Image 2' }} />
                        </Stack.Navigator>
                    </NavigationContainer>

        );
    };
export default App;
