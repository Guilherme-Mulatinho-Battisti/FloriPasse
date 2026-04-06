import React from 'react';
import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import attractionsData from '../data/attractions.json';

export default function InterestsScreen({ navigation }) {
  const { interests, toggleInterest } = useApp();

  const myList = attractionsData
    .filter(a => interests.includes(a.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (myList.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="heart-outline" size={60} color="#aaa" />
        <Text style={styles.emptyText}>Nenhuma atração na sua lista ainda.</Text>
        <Text style={styles.emptySubText}>Vá até Atrações e toque no coração ❤️</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={myList}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Detail', { attraction: item })}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.neighborhood}>
              <Ionicons name="location-outline" size={13} color="#0077B6" />
              {' '}{item.neighborhood}
            </Text>
          </View>
          <TouchableOpacity onPress={() => toggleInterest(item.id)} style={styles.heartBtn}>
            <Ionicons name="heart" size={24} color="#e63946" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 12,
    backgroundColor: '#f0f4f8',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    alignItems: 'center',
  },
  thumbnail: {
    width: 90,
    height: 80,
  },
  info: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#023E8A',
    marginBottom: 4,
  },
  neighborhood: {
    fontSize: 13,
    color: '#555',
  },
  heartBtn: {
    padding: 12,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 8,
    textAlign: 'center',
  },
});