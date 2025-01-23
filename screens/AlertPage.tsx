import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons, ensure you have react-native-vector-icons installed

const alertsData = [
  {
    id: '1',
    title: "We found a deal just for you. Save on something you'll love.",
    image: 'https://via.placeholder.com/50', // Replace with the actual image URL
    time: '2 days ago',
  },
  {
    id: '2',
    title: 'Schwarzkopf Professional Masque',
    image: 'https://via.placeholder.com/50',
    time: '3 days ago',
  },
  {
    id: '3',
    title: 'Cello Novelty Compact Plastic Shoe Rack (Orange and Brown)',
    image: 'https://via.placeholder.com/50',
    time: '4 days ago',
  },
  {
    id: '4',
    title: "GRECIILOOKS Women's Ribbed A-Line Co-Ord Sets in Purple",
    image: 'https://via.placeholder.com/50',
    time: '5 days ago',
  },
  {
    id: '5',
    title: "This deal's just for you. It's all yours; save today.",
    image: 'https://via.placeholder.com/50',
    time: '5 days ago',
  },
];

const AlertPage = () => {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.alertItem}>
      <Image source={{ uri: item.image }} style={styles.alertImage} />
      <View style={styles.alertTextContainer}>
        <Text style={styles.alertTitle}>{item.title}</Text>
        <Text style={styles.alertTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Alerts"
          placeholderTextColor="#999"
        />
        <Icon name="search" size={24} color="#fff" />
      </View>

      {/* Alerts List */}
      <FlatList
        data={alertsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 15,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#444',
    marginHorizontal: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    height: 40,
  },
  listContainer: {
    padding: 10,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  alertImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  alertTime: {
    fontSize: 14,
    color: '#777',
  },
});

export default AlertPage;
