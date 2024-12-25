import { useRouter, useSearchParams } from 'expo-router/build/hooks';
import { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { getUserEmail } from '../global';
import { useFocusEffect } from 'expo-router';
import React from 'react';

export default function MessagingScreen() {
  const router = useRouter();

  const searchParams = useSearchParams();
  var friendEmail = searchParams.get('friend'); // Retrieve friend's email from route parameters
  var messagingState = searchParams.get('state') === 'true';

  var userEmail = getUserEmail();
  

  const [messages, setMessages] = useState([]); // message history
  const [messageToSend, setMessageToSend] = useState(""); // message to send

  useFocusEffect(
    React.useCallback(() => {
      if (userEmail && friendEmail) {
        handleFriendOrGroup(friendEmail, messagingState)
      }

    }, [userEmail, friendEmail, messagingState])
  );

const handleFriendOrGroup = (friendEmail:any, messagingState: boolean) => {
  if(messagingState){
    fetchMessages(friendEmail);
  }
  else{
    fetchGroupMessages(friendEmail);
  }
}

  const handleSendMessage = (friendEmail:any, msg:string) => {
    if(messagingState){
      fetchSendMessage(friendEmail, msg);
      console.log("friend message");
    }
    else{
      fetchSendGroupMessage(friendEmail, msg);
      console.log("group message");
    }
  };


  const fetchMessages = (friendEmail: string) =>{
    const requestOptions = {  
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
      }
    
      fetch("http://localhost:8080/messages?senderEmail="+ userEmail +"&receiverEmail=" + friendEmail ,requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result && result.length === 1 && result[0] === "no messages") {
              // Handle the case where no messages are returned
              setMessages([]); // Set messages to an empty array
            } else if (result) {
              // Format and set messages
              const formattedMessages = result.map((item: string, index: any) => {
                const [sender, text] = item.split(':');
                return { id: index.toString(), sender, text: text.trim() };
              });
              setMessages(formattedMessages);
            }
          })
          .catch((error) => console.error(error));
  }

  const fetchGroupMessages = (friendEmail: string) =>{
    const requestOptions = {  
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
      }
    
      fetch("http://localhost:8080/groups/"+ friendEmail + "/messages",requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result && result.length === 1 && result[0] === "no messages") {
              // Handle the case where no messages are returned
              setMessages([]); // Set messages to an empty array
            } else if (result) {
              // Format and set messages
              const formattedMessages = result.map((item: string, index: any) => {
                const [sender, text] = item.split(':');
                return { id: index.toString(), sender, text: text.trim() };
              });
              setMessages(formattedMessages);
            }
          })
          .catch((error) => console.error(error));
  }

  const fetchSendMessage = (friendEmail: any, msg:string) =>{
    const requestOptions = {  
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
      }
    
      fetch("http://localhost:8080/messages/send?senderEmail="+ userEmail +"&receiverEmail=" + friendEmail + "&message=" + msg,requestOptions)
          .then((response) => response.text())
          .then((result) => {
            if(result && result === "Message sent."){
              // Add the sent message to the messages state
              setMessages((prevMessages) => {
                // Ensure `prevMessages` is always an array
                const validPrevMessages = Array.isArray(prevMessages) ? prevMessages : [];
                
                // Construct the new message
                const newMessage = {
                  id: Date.now().toString(),
                  sender: userEmail,
                  text: msg.trim(),
                };
                
                // Return updated array
                return [...validPrevMessages, newMessage];
              });
            }


          })
          .catch((error) => console.error(error));
  }

  const fetchSendGroupMessage = (friendEmail: any, msg:string) =>{
    const requestOptions = {  
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
      }
    
      fetch("http://localhost:8080/groups/" + friendEmail + "/send?email=" + userEmail + "&message=" + msg,requestOptions)
          .then((response) => response.text())
          .then((result) => {
            if(result && result === "Message sent to group"){
              console.log("oluyor");
              // Add the sent message to the messages state
              setMessages((prevMessages) => {
                // Ensure `prevMessages` is always an array
                const validPrevMessages = Array.isArray(prevMessages) ? prevMessages : [];
                
                // Construct the new message
                const newMessage = {
                  id: Date.now().toString(),
                  sender: userEmail,
                  text: msg.trim(),
                };
                
                // Return updated array
                return [...validPrevMessages, newMessage];
              });
            }


          })
          .catch((error) => console.error(error));
  }


  if (!friendEmail || friendEmail.trim() === '') {
    // If no friend is selected, show a fallback message
    return (
      <View style={styles.container}>
        <Text style={styles.warningText}>
          No friend selected. Please choose a friend from the Friends List.
        </Text>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => router.push('/(tabs)/FriendsListScreen')}
        >
          <Text style={styles.goBackText}>Go to Friends List</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.friendName}>Messaging with: {friendEmail}</Text>

      <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.sender}>No messages to be shown</Text> // Display message when empty
      }
      renderItem={({ item }) => (
        <View style={styles.messageItem}>
          <Text style={styles.sender}>{item.sender}:</Text>
          <Text>{item.text}</Text>
        </View>
      )}
    />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          onChangeText={ (text) => setMessageToSend(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() =>handleSendMessage(friendEmail, messageToSend)}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2c054',
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  messageItem: {
    marginBottom: 10,
  },
  sender: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#f28f2c',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  warningText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  goBackButton: {
    backgroundColor: '#f28f2c',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  goBackText: {
    color: 'black',
    fontWeight: 'bold',
  },
});