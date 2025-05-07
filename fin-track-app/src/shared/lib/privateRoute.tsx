import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../app/store/store";


export default function PrivateRoute() {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  return (
    isAuth ? <Outlet /> : <Navigate to="/" />
  );
}