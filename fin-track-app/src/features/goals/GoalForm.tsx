import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks/redux/reduxTypes'
import { Button, DatePicker, Form, Input, InputNumber } from 'antd';
import { v4 as uuidv4 } from 'uuid'
import { selectGoalById } from '../../entities/fin-goals/goalSelectors';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { addGoal, updateGoal } from '../../entities/fin-goals/goalSlice';

type GoalFormProps = {
  onSave: () => void,
  goalId?: string,

}

export default function GoalForm({onSave, goalId}: GoalFormProps) {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const userId = useAppSelector(state => state.user.currentUser?.uid);
  // const goals = useAppSelector(state => state.goal.entities ? Object.values(state.goal.entities) : []);
  const currentGoal = useAppSelector(state => goalId ? selectGoalById(state, goalId) : undefined);

  useEffect(() => {
    if (goalId && currentGoal) {
      form.setFieldsValue({
        name: currentGoal.name,
        amount: currentGoal.amount,
        deadline: dayjs(currentGoal.deadline)
      });
    } else {
      form.resetFields();
    }
  }, [goalId, currentGoal, form]);

  const handleSaveGoal = (values: any) => {
    if (!userId) return;

    const newGoal = {
      id: uuidv4(),
      userId,
      ...values,
      deadline: values.deadline ? dayjs(values.deadline).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD")
    }
    console.log(newGoal);

    dispatch(addGoal(newGoal));


    onSave();
  }

  const handleEditGoal = (values: any) => {
    if (!goalId) return;

    const updatedgoal = {
      id: goalId,
      userId,
      changes: {
        ...values,
        deadline: values.deadline ? dayjs(values.deadline).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
      }
    }

    dispatch(updateGoal(updatedgoal));

    onSave();
  }

  return (
    <Form
    form={form}
    onFinish={!goalId ? handleSaveGoal : handleEditGoal}
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
      initialValue={goalId && currentGoal ? dayjs(currentGoal?.deadline) : dayjs()}
      >
        <DatePicker/>
      </Form.Item>

      <Button htmlType='submit' type='primary'>Save</Button>

    </Form>
  )
}