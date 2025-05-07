import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAvi82jH4Y-amxtfmi1KegQgTTPtAJOTEI',
  authDomain: 'finance-tracker-172.firebaseapp.com',
  projectId: 'finance-tracker-172',
  storageBucket: 'finance-tracker-172.appspot.com',
  messagingSenderId: '...',
  appId: '...',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };