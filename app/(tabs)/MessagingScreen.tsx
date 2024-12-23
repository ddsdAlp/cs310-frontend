import { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';

const messages = [
  { id: '1', sender: 'You', text: 'Hi there!' },
  { id: '2', sender: 'Friend1', text: 'Hello!' },
];

export default function MessagingScreen() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log(`Sent message: ${message}`);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
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
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
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
});
