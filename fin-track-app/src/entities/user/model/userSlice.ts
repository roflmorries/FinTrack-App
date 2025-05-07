import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";
import { RootState } from "../../../app/store/store";
import { signInUser, registerUser, signInUserWithGoogle, checkAuth } from "./userThunks";

interface UserState {
  user: User | null,
  isAuth: boolean,
  isLoading: boolean,
  error: string | null
};


const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem('user');
    },
    loadUserFromStorage(state) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        state.user = JSON.parse(savedUser);
        state.isAuth = true;
      }
    }
  },
  extraReducers: builder => {

    builder.addCase(signInUser.pending, state => {
      state.isLoading = true;
      state.error = null;
    }),
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    }),
    builder.addCase(signInUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    }),

    builder.addCase(registerUser.pending, state => {
      state.isLoading = true;
      state.error = null;
    }),
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    }),
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    }),

    builder.addCase(signInUserWithGoogle.pending, state => {
      state.isLoading = true;
      state.error = null;
    }),
    builder.addCase(signInUserWithGoogle.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    }),
    builder.addCase(signInUserWithGoogle.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    builder.addCase(checkAuth.pending, state => {
      state.isLoading = true;
      state.error = null;
    }),
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    }),
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoading = false;
      state.isAuth = false;
    })
  }
});

export const { logout, loadUserFromStorage } = userSlice.actions;

export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const SelectCurrentUser = (state: RootState) => state.user.user;
export const selectUserIsLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error; 

export default userSlice.reducer;