import { createSlice } from "@reduxjs/toolkit";
import { User } from "./types";
import { loginUser, registerUser, fetchUserData } from "./userThunks";

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
    })
  }
});

// export const selectIsAuth = (state: RootState) => state.user.isAuth;
// export const SelectCurrentUser = (state: RootState) => state.user.user;
// export const selectUserIsLoading = (state: RootState) => state.user.isLoading;
// export const selectUserError = (state: RootState) => state.user.error; 

export default userSlice.reducer;