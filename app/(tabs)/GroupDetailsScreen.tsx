import { StyleSheet, View, Text } from 'react-native';

const groupDetails = {
  name: 'Group1',
  createdAt: '2024-12-01',
  members: ['User1', 'User2', 'User3'],
};

export default function GroupDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{groupDetails.name}</Text>
      <Text>Created At: {groupDetails.createdAt}</Text>
      <Text>Members:</Text>
      {groupDetails.members.map((member, index) => (
        <Text key={index} style={styles.member}>
          - {member}
        </Text>
      ))}
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
    marginBottom: 10,
  },
  member: {
    marginLeft: 10,
  },
});
