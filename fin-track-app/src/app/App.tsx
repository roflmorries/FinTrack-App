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
import { fetchGoals } from '../entities/fin-goals/goalThunk';
import { fetchAllNotifications } from '../entities/notifications/notificationThunk';
import AlertNotification from '../widgets/Notifications/AlertNotification';
import { StyledToastContainer } from '../shared/ui/App/app.styled';
import { useFetchTransactionsQuery } from './store/api/transactionApi';

function App() {

  const dispatch = useAppDispatch();
  // const isLoading = useAppSelector(state => state.user.isLoading);
  const user = useAppSelector(state => state.user.currentUser);

  const { data, error, isLoading } = useFetchTransactionsQuery(user?.uid ?? '', { skip: !user });

  console.log('transactions', data);

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
      dispatch(fetchGoals(user.uid));
      dispatch(fetchAllNotifications(user.uid))
    }
  }, [user])


  if (isLoading) return <Loader/>
  return (
    <BrowserRouter>
      <AlertNotification/>
      <AppRoutes/>
      <StyledToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  )
}

export default App
