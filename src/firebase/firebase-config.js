import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCsu9eynh6hxhURqD1tEnfbCVeprT-eds0',
  authDomain: 'simple-movie-app-8a4ff.firebaseapp.com',
  projectId: 'simple-movie-app-8a4ff',
  storageBucket: 'simple-movie-app-8a4ff.firebasestorage.app',
  messagingSenderId: '1071296411699',
  appId: '1:1071296411699:web:657f5fb6cdb50c6c69cb46',
  measurementId: 'G-LC1446TEPG',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// Init services
export const db = getFirestore(app)
export const auth = getAuth(app)
