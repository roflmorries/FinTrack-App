import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
// import { addTransaction, updateTransaction } from "../../entities/transactions/model/transactionSlice";
import { useEffect, useState } from "react";
import { SelectTransactionById } from "../../entities/transactions/model/transactionsSelectors";
import { createTransaction, updateTransaction } from "../../entities/transactions/model/transactionThunk";
import { selectAllCategories } from "../../entities/categories/model/categorySelectors";
import { selectAllGoals } from "../../entities/fin-goals/goalSelectors";
// import { saveTransactionsToStorage } from "../../entities/transactions/model/transactionThunk";


interface TransactionFormProps {
  onSave: () => void;
  transactionId?: string;
}

export default function TransactionForm({ onSave, transactionId }: TransactionFormProps) {
  // const categories = useAppSelector(state => state.category.entities ? Object.values(state.category.entities) : []);
  const categories = useAppSelector(selectAllCategories);
  const userId = useAppSelector(state => state.user.currentUser?.uid)
  const dispatch = useAppDispatch();
  const currentTransaction = useAppSelector(state => transactionId ? SelectTransactionById(state, transactionId) : undefined);
  // const transactions = useAppSelector(state => state.transaction.entities)
  // const [initialDate, setDate] = useState('');
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  // const goals = useAppSelector(state => state.goal.entities ? Object.values(state.goal.entities) : []);
  const goals = useAppSelector(selectAllGoals);

  useEffect(() => {
    if (transactionId && currentTransaction) {
      setSelectedCategory(currentTransaction.category);
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


  const handleTransactionForm = async (values: any) => {
    if (!userId) return;

    const transactionData = {
      userId,
      ...values,
      date: values.date ? dayjs(values.date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
      amount: Number(values.amount)
    };

    await dispatch(createTransaction(transactionData))

    form.resetFields();

    if (onSave) onSave();
  }

  const handleTransactionEdit = async (values: any) => {
    if (!transactionId) return;

    const updatedransaction = {
      id: transactionId,
      changes: {
        userId,
        ...values,
        date: values.date ? dayjs(values.date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
        amount: Number(values.amount)
      }
    }
    
    await dispatch(updateTransaction(updatedransaction))

    // form.resetFields(); // check!
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
        <Select
        options={categories.map(category => ({ value: category.name, label: category.name }))}
        onChange={value => setSelectedCategory(value)}
        />
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

      {selectedCategory === 'Goals' && (
      <Form.Item
      name='goalId'
      label='Goal'
      >
        <Select
        placeholder='Выберите цель'
        options={goals.map(goal => ({value: goal.id, label: goal.name}))}
        allowClear
        />
      </Form.Item>
      )}

      <Button htmlType="submit" type="primary">Save</Button>

    </Form>
  )
}