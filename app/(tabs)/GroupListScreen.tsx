import { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUserEmail } from '../global';
import React from 'react';

export default function GroupListScreen() {
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
            <Text>{item}</Text>
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
  groupItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
});
