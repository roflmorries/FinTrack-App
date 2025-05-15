import { Route, Routes } from "react-router-dom"
import HomePage from "../../../pages/HomePage/HomePage"
import PrivateRoute from "../../../shared/lib/privateRoute"
import ApplicationPage from "../../../pages/ApplicationPage/ApplicationPage"
import RegistrationPage from "../../../pages/RegistrationPage/RegistrationPage"
import LoginPage from "../../../pages/LoginPage/LoginPage"
import ResetPasswordPage from "../../../pages/ResetPasswordPage/ResetPasswordPage"
import Dashboard from "../../../widgets/Dashboard/Dashboard"
import TransactionPage from "../../../pages/TransactionPage/TransactionPage"
import CategoriesPage from "../../../pages/CategoriesPage/CategoriesPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/registration" element={<RegistrationPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/reset-password" element={<ResetPasswordPage/>}/>

      <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<ApplicationPage/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='transactions' element={<TransactionPage/>}/>
          <Route path='categories' element={<CategoriesPage/>}/>
        </Route>
      </Route>
    </Routes>
  )
}