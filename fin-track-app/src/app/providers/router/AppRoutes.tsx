import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence, motion, easeInOut } from "framer-motion";
import HomePage from "../../../pages/HomePage/HomePage"
import PrivateRoute from "../../../shared/lib/privateRoute"
import ApplicationPage from "../../../pages/ApplicationPage/ApplicationPage"
import RegistrationPage from "../../../pages/RegistrationPage/RegistrationPage"
import LoginPage from "../../../pages/LoginPage/LoginPage"
import ResetPasswordPage from "../../../pages/ResetPasswordPage/ResetPasswordPage"
import Dashboard from "../../../widgets/Dashboard/Dashboard"
import TransactionPage from "../../../pages/TransactionPage/TransactionPage"
import CategoriesPage from "../../../pages/CategoriesPage/CategoriesPage"
import GoalsPage from "../../../pages/GoalsPage/GoalsPage"
import AssistantPage from "../../../pages/AssistantPage/AssistantPage"


const pageTransition = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
  transition: { duration: 0.35, ease: easeInOut }
};

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageTransition}>
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/registration"
          element={
            <motion.div {...pageTransition}>
              <RegistrationPage />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div {...pageTransition}>
              <LoginPage />
            </motion.div>
          }
        />
        <Route
          path="/reset-password"
          element={
            <motion.div {...pageTransition}>
              <ResetPasswordPage />
            </motion.div>
          }
        />
        <Route
          element={<PrivateRoute />}
        >
          <Route
            path="/dashboard"
            element={<ApplicationPage/>}
          >
            <Route
              index
              element={<Dashboard />}
            />
            <Route
              path="transactions"
              element={<TransactionPage/>}
            />
            <Route
              path="categories"
              element={<CategoriesPage />}
            />
            <Route
              path="goals"
              element={<GoalsPage />}
            />
            <Route
              path="ai-assistant"
              element={<AssistantPage />}
            />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}