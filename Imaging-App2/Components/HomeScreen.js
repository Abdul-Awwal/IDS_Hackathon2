// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const HomeScreen = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const launchCamera = async () => {
        if (hasCameraPermission) {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
            });

            console.log('Image result:', result);

            if (!result.cancelled) {
                const imageUri = result.assets[0].uri; // Extract URI from assets array
                navigation.navigate('ImageView', { imageUri });
            }
        }
    };

    const launchImageLibrary = async () => {
        if (hasGalleryPermission) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
            });

            console.log('Image result:', result);

            if (!result.cancelled) {
                const imageUri = result.assets[0].uri; // Extract URI from assets array
                navigation.navigate('ImageView', { imageUri });
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Photo App</Text>
            <View style={styles.buttonsContainer}>
                <Button title="Capture Photo" onPress={launchCamera} disabled={!hasCameraPermission} />
                <Button title="Upload Photo" onPress={launchImageLibrary} disabled={!hasGalleryPermission} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
});

export default HomeScreen;
