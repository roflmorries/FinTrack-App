import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { User } from "./types";
import { createAsyncThunk} from "@reduxjs/toolkit";
import { auth, db} from "../../../shared/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const registerUser = createAsyncThunk<User,
  { email: string; password: string; fullName: string; avatar: string;},
  { rejectValue: string }>
  ('user/registerUser',
  async ({ email, fullName, password, avatar}, {rejectWithValue}) => {
    try {
      console.log('creating user')
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const uid = result.user.uid;

      console.log('user create with uid', uid)

      const userData: User = { uid, email, fullName, avatar };
      console.log(userData)

      console.log('writing user to store')
      await setDoc(doc(db, 'users', uid), userData);
      console.log('success')
      
      return userData;
    } catch (error: any) {
      console.error('❌ Firebase error:', error.code, error.message);
      return rejectWithValue(error.message)
    }
  }
);

export const loginUser = createAsyncThunk<User, { email: string; password: string }>('user/loginUser',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const uid = result.user.uid;

      const userData = await getDoc(doc(db, 'users', uid));
      if (!userData.exists()) throw new Error('user not found')

      return userData.data() as User;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk<User, string>('user/fetchUserData', 
  async uid => {
    const userData = await getDoc(doc(db, 'users', uid));
    return userData.data() as User;
  }
);

export const signInUserWithGoogle = createAsyncThunk<User, void>('user/signInWithGoogle',
    async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const uid = user.uid;
      console.log(user)
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      let userData: User;

      if (!userSnap.exists()) {
        userData = {
          uid,
          email: user.email || '',
          fullName: user.displayName || '',
          avatar: user.photoURL || '',
        };
        await setDoc(userRef, userData);
      } else {
        userData = userSnap.data() as User;
      }

      return userData;
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