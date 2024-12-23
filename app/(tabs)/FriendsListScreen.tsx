import { StyleSheet, View, FlatList, Text } from 'react-native';

const friends = [
  { id: '1', name: 'Friend1' },
  { id: '2', name: 'Friend2' },
];

export default function FriendsListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text>{item.name}</Text>
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
  friendItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
});
