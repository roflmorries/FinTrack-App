import { BrowserRouter } from 'react-router-dom'
import '../shared/ui/App.css'
import AppRoutes from './providers/router/AppRoutes'
import { useAppDispatch, useAppSelector } from '../shared/lib/hooks/redux/reduxTypes'
import { onAuthStateChanged } from 'firebase/auth';
import { fetchUserData } from '../entities/user/model/userThunks';
import { auth } from '../shared/config/firebase';
import { useEffect } from 'react';
import Loader from '../widgets/Loader/Loader';
import { fetchTransactions } from '../entities/transactions/model/transactionThunk';
import { fetchCategories } from '../entities/categories/model/categoryThunk';

function App() {

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.user.isLoading)
  const user = useAppSelector(state => state.user.currentUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(fetchUserData(firebaseUser.uid));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);


  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchTransactions(user.uid));
      dispatch(fetchCategories(user.uid));
    }
  }, [user])


  if (isLoading) return <Loader/>
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
