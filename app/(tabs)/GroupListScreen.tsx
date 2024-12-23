import { StyleSheet, View, FlatList, Text } from 'react-native';

const groups = [
  { id: '1', name: 'Group1' },
  { id: '2', name: 'Group2' },
];

export default function GroupListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Groups</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
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
  groupItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
});
