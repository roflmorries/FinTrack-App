import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks/redux/reduxTypes'
import { Button, DatePicker, Form, Input, InputNumber } from 'antd';

type GoalFormProps = {}

export default function GoalForm({}: GoalFormProps) {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const userId = useAppSelector(state => state.user.currentUser?.uid)

  const handleSaveGoal = (values: any) => {
    if (!userId) return;
  }

  return (
    <Form
    form={form}
    onFinish={handleSaveGoal}
    layout='vertical'
    >

      <Form.Item
      name='name'
      label='Название цели'
      rules={[{ required: true }]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
      name='amount'
      label='Сумма'
      rules={[{ required: true }]}
      >
        <InputNumber min={1}/>
      </Form.Item>

      <Form.Item
      name='deadline'
      label='Срок'
      rules={[{required: true}]}
      >
        <DatePicker/>
      </Form.Item>

      <Button htmlType='submit' type='primary'>Save</Button>

    </Form>
  )
}