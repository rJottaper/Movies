import React from 'react';
import { ImageBackground, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('screen')

const Card = ({title, description, urlImage, onPress }) => {
  return (
    <>
     <TouchableOpacity onPress={onPress}>
        <ImageBackground style={styles.image} source={{ uri: urlImage }} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width / 2.5,
    height: height / 3.5,
    marginBottom: 10,
    marginHorizontal: 5,
  }
});

export default Card;