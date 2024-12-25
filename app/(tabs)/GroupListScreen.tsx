import { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUserEmail } from '../global';
import React from 'react';
import { useRouter } from 'expo-router';

export default function GroupListScreen() {
  const router = useRouter();

  const[groups, setGroups] = useState([])
  var userEmail = getUserEmail();

  useFocusEffect(
    React.useCallback(() => {
      userEmail = getUserEmail();
      console.log('GroupListScreen mounted');
      
      if (userEmail) {
        fetchGroups(userEmail); // Fetch friends based on the logged-in user
      }
    }, [])
  );

  const fetchGroups = (email: string) =>{

    const requestOptions = {  
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
      }
    
      fetch("http://localhost:8080/groups?email=" + userEmail,requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if(result){
              setGroups(result);
            }
          })
          .catch((error) => console.error(error));

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Groups</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <Text style={styles.groupText}>{item}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push(`/GroupDetailsScreen?group=${item}`)}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push(`/MessagingScreen?friend=${item}&state${false}`)} //will change
            >
              <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  button: {
    backgroundColor: '#f28f2c', // Green background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
    shadowRadius:10,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  groupText: {
    flex: 1, // Allow the text to take available space
    fontSize: 16,
    marginRight: 10, // Add space between text and button
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
});
