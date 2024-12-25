import { useFocusEffect } from 'expo-router';
import { useRouter, useSearchParams } from 'expo-router/build/hooks';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function GroupDetailsScreen() {
  const router = useRouter();

  const searchParams = useSearchParams();
  var groupID = searchParams.get('group');

  const [members, setMembers] = useState([]);
  const [date, setDate] = useState("");

  useFocusEffect(
      React.useCallback(() => {
        if (groupID) {
          console.log("Group Details Page Mounted")
          fetchGroupMembers(groupID);
          fetchGroupDate(groupID);
        }
      }, [groupID])
    );

  const fetchGroupMembers = (groupID: string) =>{
    const requestOptions = {  
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
      }
    
      fetch("http://localhost:8080/groups/" + groupID + "/members",requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result) {
              setMembers(result);
            }
          })
          .catch((error) => console.error(error));
  }

  const fetchGroupDate = (groupID: string) =>{
    const requestOptions = {  
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
      }
    
      fetch("http://localhost:8080/groups/" + groupID + "/date",requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result) {
              setDate(result);
            }
          })
          .catch((error) => console.error(error));
  }



  if (!groupID || groupID.trim() === '') {
      // If no friend is selected, show a fallback message
      return (
        <View style={styles.allignedContainer}>
          <Text style={styles.warningText}>
            No group selected. Please choose a group from the Group List.
          </Text>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => router.push('/(tabs)/GroupListScreen')}
          >
            <Text style={styles.goBackText}>Go to Group List</Text>
          </TouchableOpacity>
        </View>
      );
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{groupID}</Text>
      <Text>Created At: {date}</Text>
      <Text>Members:</Text>
      {members.map((member, index) => (
        <Text key={index} style={styles.member}>
          - {member}
        </Text>
      ))}
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => router.push('/(tabs)/GroupListScreen')}
        >
          <Text style={styles.goBackText}>Go to Group List</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2c054',
  },
  allignedContainer:{
    flex: 1,
    padding: 20,
    backgroundColor: '#f2c054',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  member: {
    marginLeft: 10,
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
  },
  goBackText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
