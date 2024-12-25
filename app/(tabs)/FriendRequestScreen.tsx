import { useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text,TouchableOpacity } from 'react-native';
import { getUserEmail } from '../global';
import React from 'react';
import { useFocusEffect } from 'expo-router';

export default function FriendRequestScreen() {
  
  const[requests, setFriendRequests] = useState([]);
  var userEmail = getUserEmail();
  const [targetEmail, setTarget] = useState("");

  useFocusEffect(
      React.useCallback(() => {
        userEmail = getUserEmail();
        console.log('FriendRequestScreen mounted');
        
        if(userEmail){
          fetchFriendRequests(userEmail);
        }
      }, [])
    );

  const handleAcceptRequest = (senderEmail:string) => {
    fetchAcceptRequest(senderEmail)
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request !== senderEmail)
    );
  };

  const handleSendRequest = () => {
    fetchSendRequest();
  };

//-------------------------------------------------------------------------------------------------------------------------------------
//get the friends request list
  const fetchFriendRequests = (email: string) =>{

    const requestOptions = {  
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
      }
    
      fetch("http://localhost:8080/friends/requests?email=" + userEmail,requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if(result){
              setFriendRequests(result);
            }
          })
          .catch((error) => console.error(error));

  }

  //-------------------------------------------------------------------------------------------------------------------------------------
  //send friend request
  const fetchSendRequest = () =>{

    const requestOptions = {  
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
      }
    
      fetch("http://localhost:8080/friends/add?senderEmail="+ userEmail +"&receiverEmail=" + targetEmail ,requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            //BURAYA BAŞARIYLA İSTEK YOLLANDI ALERT
          })
          .catch((error) => console.error(error));

  }
  //-------------------------------------------------------------------------------------------------------------------------------------
  //accept friend request
  const fetchAcceptRequest = (senderEmail: string) =>{

    const requestOptions = {  
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
      }
    
      fetch("http://localhost:8080/friends/accept?senderEmail="+ senderEmail +"&receiverEmail=" + userEmail ,requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            //BURAYA BAŞARIYLA İSTEK KABUL EDİLDİ ALERT
          })
          .catch((error) => console.error(error));

  }
  
  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Enter the email of the user you want to add"
        onChangeText={ (text) => setTarget(text)}
      />

      {/* Custom Add Friend Button */}
      <TouchableOpacity style={styles.button} onPress={handleSendRequest}>
        <Text style={styles.buttonText}>Send Friend Request</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Friend Requests</Text>
      {requests.length === 0 ? (
        <Text style={styles.buttonText}>You have no friend requests</Text> // Display when no friends
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text style={styles.buttonText}>{item}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleAcceptRequest(item)}
              >
                <Text style={styles.buttonText}>Accept Friend Request</Text>
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
    backgroundColor:'#f2c054',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    width: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
