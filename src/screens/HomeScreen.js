import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const highlights = [
  {
    id: "1",
    title: "Florianopolis te espera!",
    subtitle: "Descubra as melhores atracoes da Ilha da Magia",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.2UyDzRxpH1q8UbEZhCv8QQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "2",
    title: "Historia e Cultura",
    subtitle: "Museus, fortalezas e patrimonios historicos",
    image:
      "https://a.cdn-hotels.com/gdcs/production100/d1736/8f4fd61e-32a5-4329-b4b0-f8e82cbcbe57.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
  },
  {
    id: "3",
    title: "Natureza Preservada",
    subtitle: "Trilhas, lagoas e praias paradisiacas",
    image:
      "https://guiaviajarmelhor.com.br/wp-content/uploads/2021/05/passeios-atracoes-florianopolis-11-720x540.jpg",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
          }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>FloriPasse</Text>
          <Text style={styles.bannerSubtitle}>
            Seu guia turístico em Florianópolis
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossos Passes</Text>
        <View style={styles.passesRow}>
          <View style={[styles.passCard, { backgroundColor: "#90E0EF" }]}>
            <Text style={styles.passName}>Básico</Text>
            <Text style={styles.passInfo}>3 atrações</Text>
            <Text style={styles.passInfo}>3 dias</Text>
            <Text style={styles.passPrice}>R$ 89</Text>
          </View>
          <View style={[styles.passCard, { backgroundColor: "#00B4D8" }]}>
            <Text style={styles.passName}>Plus</Text>
            <Text style={styles.passInfo}>5 atrações</Text>
            <Text style={styles.passInfo}>5 dias</Text>
            <Text style={styles.passPrice}>R$ 149</Text>
          </View>
          <View style={[styles.passCard, { backgroundColor: "#0077B6" }]}>
            <Text style={[styles.passName, { color: "#fff" }]}>Top</Text>
            <Text style={[styles.passInfo, { color: "#fff" }]}>7 atrações</Text>
            <Text style={[styles.passInfo, { color: "#fff" }]}>7 dias</Text>
            <Text style={[styles.passPrice, { color: "#fff" }]}>R$ 199</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destaques</Text>
        {highlights.map((item) => (
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
    backgroundColor: "#f0f4f8",
  },
  banner: {
    width: "100%",
    height: 220,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 16,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  bannerSubtitle: {
    color: "#ddd",
    fontSize: 14,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0077B6",
    marginBottom: 12,
  },
  passesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  passName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  passInfo: {
    fontSize: 12,
    color: "#333",
  },
  passPrice: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 6,
    color: "#023E8A",
  },
  highlightCard: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    height: 150,
  },
  highlightImage: {
    width: "100%",
    height: "100%",
  },
  highlightOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 10,
  },
  highlightTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  highlightSubtitle: {
    color: "#ddd",
    fontSize: 12,
  },
});
