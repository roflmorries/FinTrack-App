import { Button, Form, Input, Upload } from 'antd'
import { RcFile } from 'antd/es/upload';
import { useState } from 'react'

type Props = {}

export default function RegistrationForm({}: Props) {
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleRegisterForm = () => {

  }

  const handleUploadAvatar = (file: RcFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  }

  return (
    <Form name='registration' onFinish={handleRegisterForm} autoComplete='off'>

      <Form.Item
      label='Fullname'
      name='fullname'
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
      ></Form.Item>

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

    </Form>
  )
}