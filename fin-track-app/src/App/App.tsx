import { BrowserRouter } from 'react-router-dom'
import '../shared/ui/App.css'
import AppRoutes from './providers/router/AppRoutes'
import { useAppDispatch } from '../shared/lib/hooks/redux/reduxTypes'
import { checkAuth } from '../entities/user/model/userThunks';
import { useEffect } from 'react';

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
