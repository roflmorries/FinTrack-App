import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
import { v4 as uuidv4 } from 'uuid';
import { addTransaction } from "../../entities/transactions/model/transactionSlice";
import { saveTransactionsToStorage } from "../../entities/transactions/model/transactionThunk";


const categories = ['Salary', 'Food', 'Transport', 'Entertainment', 'Other'];


export default function TransactionForm() {

  const userId = useAppSelector(state => state.user.currentUser?.uid)
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(state => state.transaction.entities)

  const [form] = Form.useForm();

  const handleTransactionForm = (values: any) => {
    if (!userId) return;

    const newTransaction = {
      id: uuidv4(),
      userId,
      ...values,
      date: values.date.toISOString(),
      amount: Number(values.amount)
    };

    dispatch(addTransaction(newTransaction));

    const updated = Object.values(transactions || {}).concat(newTransaction);
    saveTransactionsToStorage({ userId, transactions: updated })

    form.resetFields();
  }

  return (
    <Form
    layout="vertical"
    onFinish={handleTransactionForm}
    form={form}
    >

      <Form.Item
      name='type'
      label='Type'
      initialValue='expense'
      rules={[{ required: true }]}
      >
        <Radio.Group>
          <Radio.Button value='income'>Income</Radio.Button>
          <Radio.Button value='expense'>Expense</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
      name='amount'
      label='Amount'
      rules={[{ required: true }]}
      >
        <Input type="number" min={0.01} step={0.01}/>
      </Form.Item>

      <Form.Item
      name='category'
      label='Category'
      rules={[{ required: true }]}
      >
        <Select options={categories.map(category => ({ value: category, label: category }))} />
      </Form.Item>

      <Form.Item
      name='date'
      label='Date'
      rules={[{ required: true }]}
      initialValue={dayjs()}
      >
        <DatePicker/>
      </Form.Item>

      <Form.Item
      name='comment'
      label='Comment'
      >
        <Input/>
      </Form.Item>

      <Button htmlType="submit" type="primary">Save</Button>

    </Form>
  )
}