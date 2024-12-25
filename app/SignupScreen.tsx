import { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { getUserEmail, setUserEmail } from './global';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    
    const handlesignup = () => {
        
        const requestOptions = {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
              {
                name: name,
                lastName: surname,
                email: mail,
                password: pass
              }
          ),
      }
    
      fetch("http://localhost:8080/register",requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            if(result && result === "POST Request - Register"){
              console.log("Register successful");
              setUserEmail(mail);
              console.log(getUserEmail() + " is now set");
              router.push('/(tabs)/FriendsListScreen')
            }
          })
          .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Enter your registiration information please</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={ (text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your lastname"
        onChangeText={ (text) => setSurname(text)}
      />
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
     
      {/* Custom Register Button */}
      <TouchableOpacity style={styles.button} onPress={handlesignup}>
        <Text style={styles.buttonText}>Signup</Text>
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