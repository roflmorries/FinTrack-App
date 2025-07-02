import { createSlice } from "@reduxjs/toolkit";
import { User } from "./types";
import { loginUser, registerUser, fetchUserData, signInUserWithGoogle, userLogOut } from "./userThunks";

interface UserState {
  currentUser: User | null,
  isAuth: boolean,
  isLoading: boolean,
  error: string | null
};


const initialState: UserState = {
  currentUser: null,
  isAuth: false,
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerUser.pending, state => {
      state.isLoading = true;
      state.error = null;
    }),
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.isAuth = true;
    }),
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    }),

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    }),
    builder.addCase(loginUser.pending, state => {
      state.isLoading = true;
      state.error = null;
    }),
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
      state.error = null;
      state.isLoading = false;
    })
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.currentUser = null;
      state.isAuth = false;
      state.error = action.payload as string;
    })
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    
    builder.addCase(signInUserWithGoogle.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    })

    builder.addCase(userLogOut.fulfilled, (state) => {
      state.currentUser = null;
      state.isAuth = false;
      state.isLoading = false;
      state.error = null;
    })
  }
});


export default userSlice.reducer;