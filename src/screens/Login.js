import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderNavigation from '../components/HeaderNavigation';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Validation 
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const AuthSuccess = () => {
    if (username == 'admin' && password == '123') {
      navigation.navigate('Home', {
        username: username
      });
    };
    if (username == '' && password == '') {
      setIsValidUsername(false);
      setIsValidPassword(false);
    };
    if (username == '' || username !== 'admin' || username.length < 4) {
      return setIsValidUsername(false);
    };
    if (password == '' || password !== '123' || password.length < 3) {
      return setIsValidPassword(false);
    };
  };

  const newValueUsername = (value) => {
    setUsername(value);
    if (value.length >= 4) {
      setIsValidUsername(true);
    };
  };

  const newValuePassword = (value) => {
    setPassword(value);
    if (value.length >= 3) {
      setIsValidPassword(true);
    };
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <SafeAreaView style={styles.container}>
        <HeaderNavigation title="Login" />
        <View style={styles.greetings}>
          <Text style={styles.title}>Welcome back,</Text>
          <Text style={styles.subtitle}>Sign In to continue</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.inputs}>
            <Input type="Username" name="user" placeholder="Your Username" value={username} newValue={(value) => newValueUsername(value)} />
            {isValidUsername ? null : <Text style={styles.msgError}>Please, check your username</Text>}
            <Input type="Password" name="lock" placeholder="Your Password" value={password} newValue={(value) => newValuePassword(value)} secureTextEntry={true} />
            {isValidPassword ? null : <Text style={styles.msgError}>Please, check your password</Text>}
          </View>
          <Button title="Sign In" background="#FFFFFF" color="#0875B9" onPress={() => AuthSuccess()} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greetings: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0876B9'
  },
  subtitle: {
    fontSize: 20,
    color: '#0876B9'
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#0876B9',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  inputs: {
    marginTop: 10,
    marginBottom: 20
  },
  msgError: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF305E',
    marginTop: 5,
    marginLeft: 15
  }
});

export default Login;