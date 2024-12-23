import { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';

export default function GroupCreationScreen() {
  const [groupName, setGroupName] = useState('');

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      console.log(`Created group: ${groupName}`);
      setGroupName('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Group</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter group name"
        value={groupName}
        onChangeText={setGroupName}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
        <Text style={styles.buttonText}>Create Group</Text>
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
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#f28f2c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
