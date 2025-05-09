import { BrowserRouter } from 'react-router-dom'
import '../shared/ui/App.css'
import AppRoutes from './providers/router/AppRoutes'
import { useAppDispatch } from '../shared/lib/hooks/redux/reduxTypes'
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { fetchUserData } from '../entities/user/model/userThunks';
import { auth } from '../shared/config/firebase';

function App() {

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
  //     if (firebaseUser) {
  //       dispatch(fetchUserData(firebaseUser.uid));
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [dispatch]);


  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
