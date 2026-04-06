import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Modal, TextInput, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

const PASS_OPTIONS = [
  {
    type: 'Básico',
    attractions: 3,
    days: 3,
    price: 89,
    color: '#90E0EF',
    textColor: '#023E8A',
  },
  {
    type: 'Plus',
    attractions: 5,
    days: 5,
    price: 149,
    color: '#00B4D8',
    textColor: '#023E8A',
  },
  {
    type: 'Top',
    attractions: 7,
    days: 7,
    price: 199,
    color: '#0077B6',
    textColor: '#fff',
  },
];

export default function PassesScreen() {
  const { passes, addPass } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPass, setSelectedPass] = useState(null);
  const [ownerName, setOwnerName] = useState('');

  const handleBuy = (passOption) => {
    setSelectedPass(passOption);
    setOwnerName('');
    setModalVisible(true);
  };

  const confirmPurchase = () => {
    if (!ownerName.trim()) {
      Alert.alert('Atenção', 'Digite o nome do titular do passe.');
      return;
    }
    const today = new Date();
    const expiry = new Date(today);
    expiry.setDate(today.getDate() + selectedPass.days);

    const newPass = {
      id: Date.now().toString(),
      type: selectedPass.type,
      attractions: selectedPass.attractions,
      days: selectedPass.days,
      price: selectedPass.price,
      owner: ownerName.trim(),
      purchaseDate: today.toLocaleDateString('pt-BR'),
      expiryDate: expiry.toLocaleDateString('pt-BR'),
    };

    addPass(newPass);
    setModalVisible(false);
    Alert.alert('Sucesso! 🎉', `Passe ${selectedPass.type} adquirido para ${ownerName.trim()}!`);
  };

  const isExpired = (expiryDate) => {
    const [day, month, year] = expiryDate.split('/');
    return new Date(`${year}-${month}-${day}`) < new Date();
  };

  return (
    <ScrollView style={styles.container}>

      {/* Comprar novo passe */}
      <Text style={styles.sectionTitle}>Adquirir Passe</Text>
      {PASS_OPTIONS.map((option) => (
        <View key={option.type} style={[styles.passCard, { backgroundColor: option.color }]}>
          <View style={styles.passInfo}>
            <Text style={[styles.passType, { color: option.textColor }]}>{option.type}</Text>
            <Text style={[styles.passDetail, { color: option.textColor }]}>
              {option.attractions} atrações • {option.days} dias
            </Text>
            <Text style={[styles.passPrice, { color: option.textColor }]}>
              R$ {option.price}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.buyBtn, { borderColor: option.textColor }]}
            onPress={() => handleBuy(option)}
          >
            <Text style={[styles.buyBtnText, { color: option.textColor }]}>Comprar</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Passes adquiridos */}
      <Text style={styles.sectionTitle}>Meus Passes</Text>
      {passes.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="ticket-outline" size={50} color="#aaa" />
          <Text style={styles.emptyText}>Nenhum passe adquirido ainda.</Text>
        </View>
      ) : (
        [...passes].reverse().map((pass) => {
          const expired = isExpired(pass.expiryDate);
          return (
            <View
              key={pass.id}
              style={[styles.myPassCard, expired && styles.expiredCard]}
            >
              <View style={styles.myPassHeader}>
                <Text style={styles.myPassType}>Passe {pass.type}</Text>
                {expired ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Expirado</Text>
                  </View>
                ) : (
                  <View style={[styles.badge, styles.activeBadge]}>
                    <Text style={[styles.badgeText, { color: '#fff' }]}>Ativo</Text>
                  </View>
                )}
              </View>
              <Text style={styles.myPassDetail}>
                <Ionicons name="person-outline" size={13} /> {pass.owner}
              </Text>
              <Text style={styles.myPassDetail}>
                <Ionicons name="map-outline" size={13} /> {pass.attractions} atrações • {pass.days} dias
              </Text>
              <Text style={styles.myPassDetail}>
                <Ionicons name="calendar-outline" size={13} /> Comprado em: {pass.purchaseDate}
              </Text>
              <Text style={styles.myPassDetail}>
                <Ionicons name="time-outline" size={13} /> Válido até: {pass.expiryDate}
              </Text>
              <Text style={styles.myPassPrice}>R$ {pass.price}</Text>
            </View>
          );
        })
      )}

      {/* Modal de compra */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirmar Compra</Text>
            {selectedPass && (
              <>
                <Text style={styles.modalInfo}>
                  Passe {selectedPass.type} — {selectedPass.attractions} atrações / {selectedPass.days} dias
                </Text>
                <Text style={styles.modalPrice}>R$ {selectedPass.price}</Text>
              </>
            )}
            <Text style={styles.modalLabel}>Nome do titular:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: João Silva"
              value={ownerName}
              onChangeText={setOwnerName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.confirmBtn]}
                onPress={confirmPurchase}
              >
                <Text style={styles.confirmBtnText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 12,
    marginTop: 8,
  },
  passCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  passInfo: {
    flex: 1,
  },
  passType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  passDetail: {
    fontSize: 13,
    marginTop: 2,
  },
  passPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  buyBtn: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buyBtnText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#aaa',
    marginTop: 10,
    fontSize: 15,
  },
  myPassCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
  },
  expiredCard: {
    opacity: 0.6,
  },
  myPassHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  myPassType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#023E8A',
  },
  myPassDetail: {
    fontSize: 13,
    color: '#555',
    marginBottom: 3,
  },
  myPassPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0077B6',
    marginTop: 6,
  },
  badge: {
    backgroundColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  activeBadge: {
    backgroundColor: '#2ecc71',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#023E8A',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalInfo: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  modalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0077B6',
    textAlign: 'center',
    marginVertical: 8,
  },
  modalLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#eee',
  },
  cancelBtnText: {
    color: '#555',
    fontWeight: 'bold',
  },
  confirmBtn: {
    backgroundColor: '#0077B6',
  },
  confirmBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});