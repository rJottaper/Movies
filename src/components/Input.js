import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Input = ({ type, name, value, newValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.type}>{type}</Text>
      <View style={styles.content}>
        <FontAwesome style={styles.icon} name={name} />
        <TextInput 
          style={styles.input} 
          value={value} 
          onChangeText={newValue} 
          placeholder={placeholder} 
          placeholderTextColor="#FFFFFF"  
          secureTextEntry={secureTextEntry} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  type: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 20,
    marginBottom: 6
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginHorizontal: 15
  },
  icon: {
    fontSize: 20,
    color: '#FFFFFF',
    marginHorizontal: 5
  },
  input: {
    flex: 1,
    color: '#FFFFFF'
  }
});

export default Input