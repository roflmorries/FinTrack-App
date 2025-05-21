import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
import { v4 as uuidv4 } from 'uuid';
import { addTransaction, updateTransaction } from "../../entities/transactions/model/transactionSlice";
import { useEffect } from "react";
import { SelectTransactionById } from "../../entities/transactions/model/transactionsSelectors";
// import { saveTransactionsToStorage } from "../../entities/transactions/model/transactionThunk";


const categories = ['Salary', 'Food', 'Transport', 'Entertainment', 'Other'];


interface TransactionFormProps {
  onSave: () => void;
  transactionId?: string;
}

export default function TransactionForm({ onSave, transactionId }: TransactionFormProps) {

  const userId = useAppSelector(state => state.user.currentUser?.uid)
  const dispatch = useAppDispatch();
  const currentTransaction = useAppSelector(state => transactionId ? SelectTransactionById(state, transactionId) : undefined);
  // const transactions = useAppSelector(state => state.transaction.entities)
  // const [initialDate, setDate] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    if (transactionId && currentTransaction) {
      form.setFieldsValue({
        type: currentTransaction.type,
        amount: currentTransaction.amount,
        category: currentTransaction.category,
        date: dayjs(currentTransaction.date),
        comment: currentTransaction.comment
      });
    } else {
      form.resetFields();
    }
  }, [transactionId, currentTransaction, form]);


  const handleTransactionForm = (values: any) => {
    if (!userId) return;

    const newTransaction = {
      id: uuidv4(),
      userId,
      ...values,
      date: values.date ? dayjs(values.date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
      amount: Number(values.amount)
    };

    dispatch(addTransaction(newTransaction));

    form.resetFields();

    if (onSave) onSave();
  }

  const handleTransactionEdit = (values: any) => {
    if (!transactionId) return;
    // console.log(values)

    const updateTransactione = {
      id: transactionId,
      changes: {
        userId,
        ...values,
        date: values.date ? dayjs(values.date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
        amount: Number(values.amount)
      }
    }
    dispatch(updateTransaction(updateTransactione))

    // form.resetFields(); // <--- сбрасываем форму!
    onSave();
  }

  // const onChangeDate = (dateString : string) => {
  //   setDate(dateString)
  // }

  return (
    <Form
    layout="vertical"
    onFinish={!transactionId ? handleTransactionForm : handleTransactionEdit}
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
      initialValue={transactionId && currentTransaction ? dayjs(currentTransaction?.date) : dayjs()}
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