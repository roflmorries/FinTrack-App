import { Form, Input } from "antd";


export default function ResetPasswordPage() {
  return (
    <Form>
      <Form.Item>
        <Input placeholder="Введите email"/>
      </Form.Item>
    </Form>
  )
}