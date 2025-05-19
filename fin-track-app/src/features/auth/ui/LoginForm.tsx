import { Button, Form, Input } from "antd"
import GoogleLoginButton from "./GoogleLoginButton"
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks/redux/reduxTypes"
import { loginUser } from "../../../entities/user/model/userThunks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import { browserLocalPersistence, browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from "../../../shared/config/firebase";

const CustomForm = styled.div`
  width: 35%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #a100ff;
  min-height: 70vh;
  align-items: center;
  

  .ant-form {
    width: 90%;
  }
`

const HeaderForm = styled.div`
  img {
    width: 100px;
    height: 100px;
  }
  h3 {
    font-size: 20px;
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 14px;
    font-weight: 300;
  }
`

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

  const handleLoginForm = async (values: {email: string; password: string; rememberMe: boolean}) => {
    try {
      await setPersistence(
        auth, values.rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      await dispatch(loginUser(values))
    } catch(error) {
      console.error('Login error:', error)
    }
  }

  return (
    <CustomForm>

      <HeaderForm>
        <img src="/icon.png"></img>
        <h3>Welcome to FinTrack</h3>
        <p>Log in using the form below</p>
      </HeaderForm>

    {error && <div>Ошибка: {error}</div>}
    <Form
    name='Login'
    onFinish={handleLoginForm}
    layout="vertical"
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

      <Form.Item
      name='rememberMe'
      valuePropName="checked"
      >
        <Input type="checkbox"/>Remember Me
      </Form.Item>
      <Button type="primary" htmlType="submit">Войти</Button>
    </Form>
    <GoogleLoginButton/>
    <Button onClick={() => navigate('/reset-password')}>Forget Password?</Button>
    </CustomForm>
  )
}