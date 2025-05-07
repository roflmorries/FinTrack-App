import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from "./types";
import { createAsyncThunk} from "@reduxjs/toolkit";
import { auth } from "../../../shared/config/firebase";

export const registerUser = createAsyncThunk<User, User>('user/registerUser', 
  async (newUser, {rejectWithValue}) => {
    const raw = localStorage.getItem('mock_users');
    const users: User[] = raw ? JSON.parse(raw) : [];

    const exist = users.find(u => u.email === newUser.email);
    if (exist) return rejectWithValue('User already exist');

    const updated = [...users, newUser];
    localStorage.setItem('mock_users', JSON.stringify(updated));
    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser
  }
);

export const signInUser = createAsyncThunk<User, {email: string; password: string}>('user/signInUser',
  async ({email, password}, {rejectWithValue}) => {
    const raw = localStorage.getItem('mock_users');
    const users: User[] = raw ? JSON.parse(raw) : [];

    const foundUser = users.find(u => u.email === email && u.password === password);
    if (!foundUser) return rejectWithValue('Wrong email or password');

    localStorage.setItem('user', JSON.stringify(foundUser));
    return foundUser;
  }
);

export const signInUserWithGoogle = createAsyncThunk<User>('user/signInUserWithGoogle',
  async (_, {rejectWithValue}) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user

      if (!user.email) {
        return rejectWithValue('Google account has no email');
      };

      const raw = localStorage.getItem('mock_users');
      const users: User[] = raw ? JSON.parse(raw) : [];

      let existingUser = users.find((u) => u.email === user.email)

      if (!existingUser) {
        existingUser = {
          id: user.uid,
          fullName: user.displayName || '',
          email: user.email,
          avatarUrl: user.photoURL || '',
          password: '', 
          token: ''
        };
        users.push(existingUser);
        localStorage.setItem('mock_users', JSON.stringify(users))
      }
      localStorage.setItem('users', JSON.stringify(users));
      return existingUser as User;
    } catch(error) {
      return rejectWithValue('Google login failed');
  }
  }
)