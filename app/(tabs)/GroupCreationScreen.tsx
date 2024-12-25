import { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { getUserEmail } from '../global';

export default function GroupCreationScreen() {
  const [groupName, setGroupName] = useState('');
  const [mail, setMail] = useState("");
  
  const userEmail = getUserEmail();

  const fetchCreateGroup = () =>{

    const requestOptions = {  
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify([userEmail]),
      }
    
      fetch("http://localhost:8080/groups/create?groupname=" + groupName,requestOptions)
          .then((response) => response.json())
          .then((result) => {
            //alert buraya
          })
          .catch((error) => console.error(error));

  }

  const fetchAddUser = () =>{

    const requestOptions = {  
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
      }
    
      fetch("http://localhost:8080/groups/" + groupName + "/add-member?email=" + mail,requestOptions)
          .then((response) => response.json())
          .then((result) => {
            //alert buraya
          })
          .catch((error) => console.error(error));

  }  


  const handleCreateGroup = () => {
    fetchCreateGroup();
  };

  const handleAddUser = () => {
    fetchAddUser();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Group</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter group name"
        onChangeText={ (text) => setGroupName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
        <Text style={styles.buttonText}>Create Group</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter mail of the user you want to add"
        onChangeText={ (text) => setMail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Add User</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#f28f2c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
