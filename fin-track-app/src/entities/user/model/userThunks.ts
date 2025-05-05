import { User } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

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