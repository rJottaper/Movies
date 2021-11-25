import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, background, color, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: background }]} onPress={onPress}>
      <Text style={[styles.title, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Button;