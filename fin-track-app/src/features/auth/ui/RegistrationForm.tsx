import { Button, Form, Input, Upload } from 'antd'
import { RcFile } from 'antd/es/upload';
import { useEffect, useState } from 'react'
import { registerUser } from '../../../entities/user/model/userThunks';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes';
import { useNavigate } from 'react-router-dom';
// import imageCompression from 'browser-image-compression';

type Props = {}

export default function RegistrationForm({}: Props) {

  const [avatar, setAvatar] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.user)
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard', {replace: true})
    }
  }, [isAuth, navigate])

  console.log(isAuth)


  const handleRegisterForm = (values: any) => {
    try {
    const newUser = {...values, avatar}
    console.log(newUser)
    dispatch(registerUser(newUser))} catch (error) {
      console.error(error);
    }
  }

  const handleUploadAvatar = (file: RcFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <Form name='registration' onFinish={handleRegisterForm} autoComplete='off'>

      <Form.Item
      label='Fullname'
      name='fullName'
      rules={[{ required: true, message: 'Введите ваше имя!' }]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
      label='Email'
      name='email'
      rules={[
        { required: true, message: 'Введите ваш email!' },
        { type: 'email', message: 'Некорректный email!' },
      ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
      label='Password'
      name='password'
      rules={[{ required: true, message: 'Введите ваш пароль!' }]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
      label='Avatar'
      >
        <Upload
        beforeUpload={handleUploadAvatar}
        showUploadList={false}
        accept='image/*'
        >
          <Button>Upload Avatar</Button>
        </Upload>
        {avatar && (
          <img
          src={avatar}
          alt="avatar"
          style={{ marginTop: 10, maxWidth: 100, borderRadius: 8 }}
          />
        )}
      </Form.Item>
      <Button type="primary" htmlType="submit">Register</Button>
    </Form>
  )
}