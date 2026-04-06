import React from 'react';
import {
  View, Text, ScrollView, Image,
  StyleSheet, Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const highlights = [
  {
    id: '1',
    title: 'Florianópolis te espera!',
    subtitle: 'Descubra as melhores atrações da Ilha da Magia',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Florianopolis_-_SC.jpg/640px-Florianopolis_-_SC.jpg',
  },
  {
    id: '2',
    title: 'História e Cultura',
    subtitle: 'Museus, fortalezas e patrimônios históricos',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Palacio_Cruz_e_Sousa.jpg/640px-Palacio_Cruz_e_Sousa.jpg',
  },
  {
    id: '3',
    title: 'Natureza Preservada',
    subtitle: 'Trilhas, lagoas e praias paradisíacas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Florianopolis_Lagoa_da_Conceicao.jpg/640px-Florianopolis_Lagoa_da_Conceicao.jpg',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Banner principal */}
      <View style={styles.banner}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Florianopolis_-_SC.jpg/640px-Florianopolis_-_SC.jpg' }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>FloriPasse</Text>
          <Text style={styles.bannerSubtitle}>Seu guia turístico em Florianópolis</Text>
        </View>
      </View>

      {/* Seção de passes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossos Passes</Text>
        <View style={styles.passesRow}>
          <View style={[styles.passCard, { backgroundColor: '#90E0EF' }]}>
            <Text style={styles.passName}>Básico</Text>
            <Text style={styles.passInfo}>3 atrações</Text>
            <Text style={styles.passInfo}>3 dias</Text>
            <Text style={styles.passPrice}>R$ 89</Text>
          </View>
          <View style={[styles.passCard, { backgroundColor: '#00B4D8' }]}>
            <Text style={styles.passName}>Plus</Text>
            <Text style={styles.passInfo}>5 atrações</Text>
            <Text style={styles.passInfo}>5 dias</Text>
            <Text style={styles.passPrice}>R$ 149</Text>
          </View>
          <View style={[styles.passCard, { backgroundColor: '#0077B6' }]}>
            <Text style={[styles.passName, { color: '#fff' }]}>Top</Text>
            <Text style={[styles.passInfo, { color: '#fff' }]}>7 atrações</Text>
            <Text style={[styles.passInfo, { color: '#fff' }]}>7 dias</Text>
            <Text style={[styles.passPrice, { color: '#fff' }]}>R$ 199</Text>
          </View>
        </View>
      </View>

      {/* Destaques */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destaques</Text>
        {highlights.map(item => (
          <View key={item.id} style={styles.highlightCard}>
            <Image source={{ uri: item.image }} style={styles.highlightImage} />
            <View style={styles.highlightOverlay}>
              <Text style={styles.highlightTitle}>{item.title}</Text>
              <Text style={styles.highlightSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  banner: {
    width: '100%',
    height: 220,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 16,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#ddd',
    fontSize: 14,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 12,
  },
  passesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  passName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  passInfo: {
    fontSize: 12,
    color: '#333',
  },
  passPrice: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 6,
    color: '#023E8A',
  },
  highlightCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    height: 150,
  },
  highlightImage: {
    width: '100%',
    height: '100%',
  },
  highlightOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 10,
  },
  highlightTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  highlightSubtitle: {
    color: '#ddd',
    fontSize: 12,
  },
});