import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
import { useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuth} = useAppSelector((state) => state.user)
  
    useEffect(() => {
      if (isAuth) {
        navigate('/dashboard')
      }
    }, [isAuth, navigate])
  return (
    <>
      <h1>HELLO THERE</h1>
      <Button onClick={() => navigate('/login')}>Login</Button>
      <Button onClick={() => navigate('/registration')}>Registration</Button>
    </>
  )
}