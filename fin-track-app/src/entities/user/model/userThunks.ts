import { createUserWithEmailAndPassword, getIdToken, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, FacebookAuthProvider } from "firebase/auth";
import { User } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../shared/config/firebase";
import axios from "axios";
import { API_URL } from "../../../shared/config/config";

export const registerUser = createAsyncThunk<User,
  { email: string; password: string; fullName: string; avatar: string;},
  { rejectValue: string }>
  ('user/registerUser',
  async ({ email, fullName, password, avatar}, {rejectWithValue}) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const uid = result.user.uid;

      const token = await getIdToken(result.user);

      const userData: User = { uid, email, fullName, avatar };
      await axios.post(`${API_URL}/users`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // console.log('writing user to store')
      // await setDoc(doc(db, 'users', uid), userData);
      // console.log('success')

      const res = await axios.get<User>(`${API_URL}/users/${uid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // return userData;
      return res.data
    } catch (error: any) {
      console.error('Firebase error:', error.code, error.message);
      return rejectWithValue(error.message)
    }
  }
);

export const loginUser = createAsyncThunk<User, { email: string; password: string }>('user/loginUser',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const uid = result.user.uid;
      const token = await getIdToken(result.user);

      // const userData = await getDoc(doc(db, 'users', uid));
      // if (!userData.exists()) throw new Error('user not found');
      const res = await axios.get<User>(`${API_URL}/users/${uid}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk<User, string>('user/fetchUserData', 
  async (uid, {rejectWithValue}) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not found');
      const token = await getIdToken(user);

      await new Promise(res => setTimeout(res, 500));
      const res = await axios.get<User>(`${API_URL}/users/${uid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInUserWithGoogle = createAsyncThunk<User, void>(
  'user/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const uid = user.uid;
      const email = user.email || '';
      const fullName = user.displayName || '';
      const avatar = user.photoURL || '';
      const token = await getIdToken(user);

      try {
        await axios.post(`${API_URL}/users`, { uid, email, fullName, avatar }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error: any) {
        if (!axios.isAxiosError(error) || error.response?.status !== 409) {
          throw error;
        }
      }

      const res = await axios.get<User>(`${API_URL}/users/${uid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInUserWithFacebook = createAsyncThunk<User, void>(
  'user/signInWithFacebook',
  async(_, {rejectWithValue}) => {
    try {
      const provider = new FacebookAuthProvider();

      provider.addScope('email');
      provider.addScope('public_profile');

      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const uid = user.uid;
      const email = user.email || '';
      const fullName = user.displayName || '';
      const avatar = user.photoURL || '';
      const token = await getIdToken(user);

      try {
        await axios.post(`${API_URL}/users`, { uid, email, fullName, avatar }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error: any) {
        if (!axios.isAxiosError(error) || error.response?.status !== 409) {
          throw error;
        }
      }

      const res = await axios.get<User>(`${API_URL}/users/${uid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const userLogOut = createAsyncThunk<void, void>('user/logout',
  async (_, {rejectWithValue}) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateUser = createAsyncThunk<User, Partial<User>>('user/updateUser',
  async (changes,  {rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not found');
      const token = await getIdToken(user);

      await axios.patch(`${API_URL}/users/${user.uid}`, changes, {
        headers: { Authorization: `Bearer ${token}`}
      });

      const res = await axios.get<User>(`${API_URL}/users/${user.uid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)