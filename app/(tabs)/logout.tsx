import { StyleSheet, TextInput, View, Button, FlatList, Text,TouchableOpacity } from 'react-native';
import { setUserEmail } from '../global';
import { useRouter } from "expo-router";

export default function FriendRequestScreen() {
  const router = useRouter();

  const logoutFunction = () => {
    setUserEmail("");
    router.replace('/')
  };

  return (
    <View style={styles.container}>
        <Text style={styles.buttonText}>Press the button below to logout</Text>
        <TouchableOpacity style={styles.button} onPress={logoutFunction}>
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 40,
      backgroundColor:'#f2c054',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#f28f2c', // Green background
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
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
  