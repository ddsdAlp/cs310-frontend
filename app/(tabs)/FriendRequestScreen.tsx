import { StyleSheet, TextInput, View, Button, FlatList, Text,TouchableOpacity } from 'react-native';

const users = [
  { id: '1', name: 'User1' },
  { id: '2', name: 'User2' },
  // Add more mock users here
];

export default function FriendRequestScreen() {
  const handleSendRequest = (userName: string) => {
    console.log(`Sent request to ${userName}`);
  };

  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for users"
        />
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text>{item.name}</Text>
              
              {/* Replacing Button with TouchableOpacity */}
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleSendRequest(item.name)}
              >
                <Text style={styles.buttonText}>Send Friend Request</Text>
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
    backgroundColor:'#f2c054',
  },
  searchInput: {
    height: 40,
    width: '100%',
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
});
