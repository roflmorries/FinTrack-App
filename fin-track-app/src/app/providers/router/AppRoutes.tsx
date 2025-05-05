import { Route, Routes } from "react-router-dom"
import HomePage from "../../../pages/HomePage/HomePage"
import PrivateRoute from "../../../shared/lib/privateRoute"
import ApplicationPage from "../../../pages/ApplicationPage/ApplicationPage"
import RegistrationPage from "../../../pages/RegistrationPage/RegistrationPage"
import LoginPage from "../../../pages/LoginPage/LoginPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/registration" element={<RegistrationPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>

      <Route element={<PrivateRoute/>}>
        <Route element={<ApplicationPage/>}>
          {/* ...TBC */}
        </Route>
      </Route>
    </Routes>
  )
}