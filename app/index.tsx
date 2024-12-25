import { StyleSheet, TextInput, View, Text, TouchableOpacity, Button } from 'react-native';
import {useEffect, useState} from "react";
import {Link, useRouter} from "expo-router";
import { getUserEmail, setUserEmail } from '././global';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function AuthScreen() {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerShown: false,
    });
  }, [navigation]);

  const router = useRouter();
  
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {

    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
          {
              email: mail,
              password: pass
          }
      ),
  }

  fetch("http://localhost:8080/login",requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if(result && result.email === mail){
          console.log("Login successful");
          setUserEmail(mail);
          console.log(getUserEmail() + " is now set");
          router.push('/(tabs)/FriendsListScreen')
        }
      })
      .catch((error) => console.error(error));

  };

  const handleSignup = () => {
    router.push('/SignupScreen')
  };

  return (
    <View style={styles.container}>
      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome to Howudoin</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={ (text) => setMail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        onChangeText={ (text) => setPass(text)}
      />
      
      {/* Custom Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <Text>OR</Text>
      
      {/* Custom Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2c054',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f28f2c', // Green background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10, // Space between buttons
    shadowRadius:10,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});