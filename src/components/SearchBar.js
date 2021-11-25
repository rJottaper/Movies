import React from 'react';
import { View, TextInput, Dimensions, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { height } = Dimensions.get('screen')

const HEIGHT_MARGIN = 16;

const SearchBar = ({ value, newValue }) => {

  return (
    <View style={styles.searchbar}>
      <FontAwesome style={styles.icon} name="search" />
      <TextInput style={styles.input} value={value} onChangeText={newValue} placeholder="Search Movie" placeholderTextColor="#0875B9" />
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height / HEIGHT_MARGIN,
    backgroundColor: '#FFF',
    marginTop: height / HEIGHT_MARGIN,
    marginHorizontal: 30,
    borderRadius: 15,
  },
  icon: {
    fontSize: 20,
    color: '#0875B9',
    marginHorizontal: 10,
    marginBottom: 2
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0875B9'
  }
});

export default SearchBar;