import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../context/AppContext";

export default function DetailScreen({ route, navigation }) {
  const { attraction } = route.params;
  const { interests, toggleInterest, passes, addAttractionToPass } = useApp();
  const isInterested = interests.includes(attraction.id);

  const [passModalVisible, setPassModalVisible] = React.useState(false);

  const openLink = (url) =>
    Linking.openURL(url).catch(() =>
      Alert.alert("Erro", "Não foi possível abrir o link."),
    );
  const openEmail = () => openLink(`mailto:${attraction.email}`);
  const openPhone = () => openLink(`tel:${attraction.phone}`);
  const openWhatsApp = () => openLink(`https://wa.me/${attraction.whatsapp}`);
  const openMaps = () =>
    openLink(
      `https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lng}`,
    );
  const openVideo = () => openLink(attraction.video);

  const isExpired = (expiryDate) => {
    const [day, month, year] = expiryDate.split("/");
    return new Date(`${year}-${month}-${day}`) < new Date();
  };

  const activePasses = passes.filter((p) => !isExpired(p.expiryDate));

  const handleReserve = () => {
    //nenhum passe
    if (passes.length === 0) {
      Alert.alert(
        "Nenhum passe encontrado",
        "Você precisa adquirir um passe para fazer uma reserva.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Ver Passes", onPress: () => navigation.navigate("Passes") },
        ],
      );
      return;
    }

    //sem passes ativos
    if (activePasses.length === 0) {
      Alert.alert(
        "Passe expirado",
        "Seus passes estão expirados. Adquira um novo passe para continuar.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Ver Passes", onPress: () => navigation.navigate("Passes") },
        ],
      );
      return;
    }

    //um passe ativo
    if (activePasses.length === 1) {
      registerInPass(activePasses[0]);
      return;
    }

    //mais de um passe ativo
    setPassModalVisible(true);
  };

  const registerInPass = (pass) => {
    const usedAttractions = pass.usedAttractions || [];

    if (usedAttractions.includes(attraction.id)) {
      Alert.alert(
        "Aviso",
        `Esta atração já está registrada no seu Passe ${pass.type}.`,
      );
      return;
    }

    if (usedAttractions.length >= pass.attractions) {
      Alert.alert(
        "Passe cheio",
        `Seu Passe ${pass.type} não permite mais do que ${pass.attractions} passeio(s). Adquira um novo passe para continuar.`,
      );
      return;
    }

    addAttractionToPass(pass.id, attraction.id);
    setPassModalVisible(false);
    Alert.alert(
      "Reserva confirmada! ✅",
      `${attraction.name} foi registrado no seu Passe ${pass.type}. (${usedAttractions.length + 1}/${pass.attractions} passeios usados)`,
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal pagingEnabled style={styles.imageScroll}>
        {attraction.images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.image} />
        ))}
      </ScrollView>

      <View style={styles.content}>
        <Text style={styles.name}>{attraction.name}</Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={15} color="#0077B6" />
          <Text style={styles.neighborhood}> {attraction.neighborhood}</Text>
        </View>

        <TouchableOpacity
          style={[styles.interestBtn, isInterested && styles.interestBtnActive]}
          onPress={() => toggleInterest(attraction.id)}
        >
          <Ionicons
            name={isInterested ? "heart" : "heart-outline"}
            size={18}
            color={isInterested ? "#fff" : "#e63946"}
          />
          <Text
            style={[styles.interestBtnText, isInterested && { color: "#fff" }]}
          >
            {isInterested
              ? "Remover dos Interesses"
              : "Adicionar aos Interesses"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Sobre</Text>
        <Text style={styles.description}>{attraction.description}</Text>

        <Text style={styles.sectionTitle}>Horários</Text>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={15} color="#0077B6" />
          <Text style={styles.infoText}> {attraction.hours}</Text>
        </View>

        <Text style={styles.sectionTitle}>Endereço</Text>
        <TouchableOpacity style={styles.row} onPress={openMaps}>
          <Ionicons name="map-outline" size={15} color="#0077B6" />
          <Text style={[styles.infoText, styles.link]}>
            {" "}
            {attraction.address}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Vídeo</Text>
        <TouchableOpacity style={styles.videoBtn} onPress={openVideo}>
          <Ionicons name="logo-youtube" size={22} color="#fff" />
          <Text style={styles.videoBtnText}>Assistir no YouTube</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Contato</Text>
        <TouchableOpacity style={styles.contactRow} onPress={openEmail}>
          <Ionicons name="mail-outline" size={18} color="#0077B6" />
          <Text style={[styles.infoText, styles.link]}>
            {" "}
            {attraction.email}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactRow} onPress={openPhone}>
          <Ionicons name="call-outline" size={18} color="#0077B6" />
          <Text style={[styles.infoText, styles.link]}>
            {" "}
            {attraction.phone}
          </Text>
        </TouchableOpacity>
        {attraction.whatsapp && (
          <TouchableOpacity style={styles.contactRow} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
            <Text style={[styles.infoText, styles.link]}> WhatsApp</Text>
          </TouchableOpacity>
        )}

        {attraction.hasReservation && (
          <TouchableOpacity style={styles.reserveBtn} onPress={handleReserve}>
            <Ionicons name="calendar-outline" size={18} color="#fff" />
            <Text style={styles.reserveBtnText}>Fazer Reserva</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal*/}
      <Modal
        visible={passModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPassModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Escolha um Passe</Text>
            <Text style={styles.modalSubtitle}>
              Selecione em qual passe deseja registrar esta atração:
            </Text>
            <FlatList
              data={activePasses}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const used = (item.usedAttractions || []).length;
                const isFull = used >= item.attractions;
                const alreadyIn = (item.usedAttractions || []).includes(
                  attraction.id,
                );
                return (
                  <TouchableOpacity
                    style={[
                      styles.passOption,
                      isFull && styles.passOptionDisabled,
                    ]}
                    onPress={() =>
                      !isFull && !alreadyIn && registerInPass(item)
                    }
                    disabled={isFull || alreadyIn}
                  >
                    <View>
                      <Text style={styles.passOptionType}>
                        Passe {item.type}
                      </Text>
                      <Text style={styles.passOptionOwner}>{item.owner}</Text>
                      <Text style={styles.passOptionUsage}>
                        {used}/{item.attractions} passeios usados
                      </Text>
                      {alreadyIn && (
                        <Text style={styles.passOptionWarning}>
                          Já registrado
                        </Text>
                      )}
                      {isFull && !alreadyIn && (
                        <Text style={styles.passOptionWarning}>
                          Passe cheio
                        </Text>
                      )}
                    </View>
                    {!isFull && !alreadyIn && (
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#0077B6"
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setPassModalVisible(false)}
            >
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  imageScroll: { height: 220 },
  image: { width: 400, height: 220, resizeMode: "cover" },
  content: { padding: 16 },
  name: { fontSize: 22, fontWeight: "bold", color: "#023E8A", marginBottom: 4 },
  neighborhood: { fontSize: 14, color: "#555" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0077B6",
    marginTop: 16,
    marginBottom: 6,
  },
  description: { fontSize: 14, color: "#333", lineHeight: 22 },
  infoText: { fontSize: 14, color: "#333", flex: 1 },
  link: { color: "#0077B6", textDecorationLine: "underline" },
  contactRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  interestBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#e63946",
    borderRadius: 10,
    padding: 10,
    marginVertical: 12,
    gap: 8,
  },
  interestBtnActive: { backgroundColor: "#e63946", borderColor: "#e63946" },
  interestBtnText: { color: "#e63946", fontWeight: "bold", fontSize: 14 },
  videoBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF0000",
    borderRadius: 10,
    padding: 10,
    gap: 8,
    justifyContent: "center",
  },
  videoBtnText: { color: "#fff", fontWeight: "bold" },
  reserveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0077B6",
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
    gap: 8,
  },
  reserveBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#023E8A",
    marginBottom: 4,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
  },
  passOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#f0f4f8",
    marginBottom: 8,
  },
  passOptionDisabled: { opacity: 0.5 },
  passOptionType: { fontSize: 15, fontWeight: "bold", color: "#023E8A" },
  passOptionOwner: { fontSize: 13, color: "#555" },
  passOptionUsage: { fontSize: 12, color: "#0077B6", marginTop: 2 },
  passOptionWarning: {
    fontSize: 12,
    color: "#e63946",
    marginTop: 2,
    fontWeight: "bold",
  },
  cancelBtn: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  cancelBtnText: { color: "#555", fontWeight: "bold" },
});
