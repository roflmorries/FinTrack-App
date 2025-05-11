import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { resetPassword } from "../../shared/config/authReset";


export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async ({email}: {email: string}) => {
    try {
      setLoading(true);
      await resetPassword(email);
      message.success('Проверьте почту для восстановления пароля');
    } catch (error: any) {
      message.error('Ошибка при сбросе пароля')
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form onFinish={handleResetPassword}>
      <Form.Item
      label='Email'
      name='email'
      rules={[{ required: true, message: "Введите email!" }]}
      >
        <Input type="email" placeholder="Введите email"/>
      </Form.Item>
      <Button htmlType="submit" type="primary" loading={loading}>Восстановить пароль</Button>
    </Form>
  )
}