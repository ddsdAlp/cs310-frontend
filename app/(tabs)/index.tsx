import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';

export default function AuthScreen() {
  const handleLogin = () => {
    // Logic for login will go here
  };

  const handleSignup = () => {
    // Logic for signup will go here
  };

  return (
    <View style={styles.container}>
      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome to Howudoin</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
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

