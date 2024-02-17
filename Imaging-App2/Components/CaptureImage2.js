// CaptureImage2.js
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CaptureImage2 = ({ navigation, route }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

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
            try {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.5,
                });

                if (!result.cancelled) {
                    navigation.navigate('DualImageView', { imageUri1: route.params.imageUri1, imageUri2: result.uri });
                }
            } catch (error) {
                console.error('Error launching camera:', error);
            }
        }
    };

    const launchImageLibrary = async () => {
        if (hasGalleryPermission) {
            try {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.5,
                });

                if (!result.cancelled) {
                    navigation.navigate('DualImageView', { imageUri1: route.params.imageUri1, imageUri2: result.uri });
                }
            } catch (error) {
                console.error('Error launching image library:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Capture Photo" onPress={launchCamera} disabled={!hasCameraPermission} />
            <Button title="Upload Photo" onPress={launchImageLibrary} disabled={!hasGalleryPermission} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CaptureImage2;
