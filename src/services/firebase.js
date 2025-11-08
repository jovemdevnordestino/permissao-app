import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getRemoteConfig } from 'firebase/remote-config';
import { getStorage } from 'firebase/storage';

// Suas credenciais fixas
const firebaseConfig = {
  apiKey: "AIzaSyDLqzSdSMS2BhMOmZtyzcZniUH608OtJ40",
  authDomain: "recicla-arcoverde.firebaseapp.com",
  databaseURL: "https://recicla-arcoverde-default-rtdb.firebaseio.com",
  projectId: "recicla-arcoverde",
  storageBucket: "recicla-arcoverde.firebasestorage.app",
  messagingSenderId: "594597215919",
  appId: "1:594597215919:web:48b8d31c9a4ae72a13de5a",
  measurementId: "G-33J95SXQXE"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

let auth;

try {
  // Tenta pegar a instância existente do Auth
  auth = getAuth();
} catch {
  // Se não existir, inicializa com persistência usando AsyncStorage
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Inicializa Firestore, Remote Config e Storage
const db = getFirestore(app);
const remoteConfig = getRemoteConfig(app);
const storage = getStorage(app);

export { app, auth, db, remoteConfig, storage };
