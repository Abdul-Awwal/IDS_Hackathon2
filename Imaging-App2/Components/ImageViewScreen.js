// ImageViewScreen.js
import React from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ImageViewScreen = ({ route }) => {
    const { imageUri } = route.params;
    const navigation = useNavigation();

    const navigateToDualImageView = () => {
        navigation.navigate('DualImageView', { imageUri1: imageUri });
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <Text style={styles.caption}>Image 1</Text>
            <Button title="Select Image 2" onPress={navigateToDualImageView} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
    },
    caption: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ImageViewScreen;
