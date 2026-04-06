import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [interests, setInterests] = useState([]);
  const [passes, setPasses] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const savedInterests = await AsyncStorage.getItem('interests');
        const savedPasses = await AsyncStorage.getItem('passes');
        if (savedInterests) setInterests(JSON.parse(savedInterests));
        if (savedPasses) setPasses(JSON.parse(savedPasses));
      } catch (e) {
        console.log('Erro ao carregar dados:', e);
      }
    })();
  }, []);

  const toggleInterest = async (id) => {
    const updated = interests.includes(id)
      ? interests.filter(i => i !== id)
      : [...interests, id];
    setInterests(updated);
    await AsyncStorage.setItem('interests', JSON.stringify(updated));
  };

  const addPass = async (pass) => {
    const updated = [...passes, pass];
    setPasses(updated);
    await AsyncStorage.setItem('passes', JSON.stringify(updated));
  };

  return (
    <AppContext.Provider value={{ interests, toggleInterest, passes, addPass }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);