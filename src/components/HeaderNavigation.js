import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HeaderNavigation = ({ title, icon, name }) => {
  const CENTER_TITLE = 28;

  if (icon) {
    return (
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome style={styles.icon} name={name} />
        </TouchableOpacity>
        <Text style={[styles.title, { marginRight: CENTER_TITLE }]}>{title}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#0876B9',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0876B9'
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0876B9',
    marginLeft: 15,
    marginTop: 2
  }
});

export default HeaderNavigation;