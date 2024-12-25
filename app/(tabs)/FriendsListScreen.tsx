import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, Button, TouchableOpacity} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUserEmail } from '../global';
import React from 'react';
import { useRouter } from 'expo-router';

export default function FriendsListScreen() {
  const router = useRouter();
  const[friends, setFriends] = useState([])
  var userEmail = getUserEmail();

  useFocusEffect(
    React.useCallback(() => {
      userEmail = getUserEmail();
      if(userEmail){
        fetchFriends(userEmail);
      }
    }, [])
  );

  const fetchFriends = (email: string) =>{

    const requestOptions = {  
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
      }
    
      fetch("http://localhost:8080/friends?email=" + userEmail,requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if(result){
              setFriends(result);
            }
          })
          .catch((error) => console.error(error));

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Friends</Text>
      {friends.length === 0 ? (
        <Text style={styles.friendText}>You have no friends</Text> // Display when no friends
      ) : (
        <FlatList
          data={friends}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.friendItem}>
              <Text style={styles.friendText}>{item}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push(`/MessagingScreen?friend=${item}&state=${true}`)}
              >
                <Text style={styles.buttonText}>Message</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2c054',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
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
  friendText: {
    flex: 1, // Allow the text to take available space
    fontSize: 16,
    marginRight: 10, // Add space between text and button
  },
});
