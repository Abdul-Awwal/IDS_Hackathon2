// DualImageViewScreen.js
import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const DualImageViewScreen = ({ navigation, route }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [imageUri1, setImageUri1] = useState(route.params.imageUri1);
    const [imageUri2, setImageUri2] = useState(route.params.imageUri2);

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

            if (!result.cancelled) {
                setImageUri2(result.assets[0].uri);
            }
        }
    };

    const launchImageLibrary = async () => {
        if (hasGalleryPermission) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
            });

            if (!result.cancelled) {
                setImageUri2(result.assets[0].uri);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUri1 }} style={styles.image} />
                <Text style={styles.caption}>Image 1</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUri2 }} style={styles.image} />
                <Text style={styles.caption}>Image 2</Text>
            </View>
            <Button title="Capture/Upload Image 2" onPress={() => navigation.navigate('CaptureImage2')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    caption: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DualImageViewScreen;
