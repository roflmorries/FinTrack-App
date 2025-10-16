import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../../shared/config/config'
import { auth } from '../../../shared/config/firebase'
import { getIdToken } from 'firebase/auth';


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL,
    prepareHeaders: async headers => {
      const user = auth.currentUser;
      if (user) {
        const token = await getIdToken(user);
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers;
    }
   }),
  tagTypes: ['Transaction', 'Category', 'Goal', 'Notification', 'User'],
  endpoints: () => ({})
})