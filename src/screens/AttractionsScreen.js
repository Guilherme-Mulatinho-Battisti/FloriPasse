import React from 'react';
import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import attractionsData from '../data/attractions.json';

const sorted = [...attractionsData].sort((a, b) => a.name.localeCompare(b.name));

export default function AttractionsScreen({ navigation }) {
  const { interests, toggleInterest } = useApp();

  return (
    <FlatList
      data={sorted}
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
            <Ionicons
              name={interests.includes(item.id) ? 'heart' : 'heart-outline'}
              size={24}
              color={interests.includes(item.id) ? '#e63946' : '#aaa'}
            />
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
});