import { Button, Form, Input } from "antd"
import GoogleLoginButton from "./GoogleLoginButton"
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks/redux/reduxTypes"
import { loginUser } from "../../../entities/user/model/userThunks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {}

export default function LoginForm({}: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, error} = useAppSelector((state) => state.user)

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard')
    }
  }, [isAuth, navigate]);

  const handleLoginForm = async (values: {email: string; password: string}) => {
    try {
      await dispatch(loginUser(values))
    } catch(error) {
      console.error('Login error:', error)
    }
  }

  return (
    <>
    {error && <div>Ошибка: {error}</div>}
    <Form
    name='Login'
    onFinish={handleLoginForm}
    >

      <Form.Item
      label='Email'
      name='email'
      rules={[
        { required: true, message: 'Введите email' },
        { type: 'email', message: 'Некорректный email' },
      ]}
      >
        <Input placeholder="Введите Email" />
      </Form.Item>

      <Form.Item
      label='Password'
      name='password'
      rules={[
        { required: true, message: 'Введите email' },
      ]}
      >
        <Input placeholder="Введите пароль"/>
      </Form.Item>
      <Button type="primary" htmlType="submit">Войти</Button>
    </Form>
    <GoogleLoginButton/>
    <Button onClick={() => navigate('/reset-password')}>Forget Password?</Button>
    </>
  )
}