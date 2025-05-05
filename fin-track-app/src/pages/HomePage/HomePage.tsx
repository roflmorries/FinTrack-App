import { Button } from "antd"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>HELLO THERE</h1>
      <Button onClick={() => navigate('/login')}>Login</Button>
      <Button onClick={() => navigate('/registration')}>Registration</Button>
    </>
  )
}