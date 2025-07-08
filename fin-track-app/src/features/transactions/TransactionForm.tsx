import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
import { useEffect, useState } from "react";
import { SelectTransactionById } from "../../entities/transactions/model/transactionsSelectors";
import { createTransaction, updateTransaction } from "../../entities/transactions/model/transactionThunk";
import { selectAllCategories } from "../../entities/categories/model/categorySelectors";
import { selectAllGoals } from "../../entities/fin-goals/goalSelectors";
import { debounce } from 'lodash';
import axios from "axios";
import { API_URL } from "../../shared/config/config";
import { fetchCategories } from "../../entities/categories/model/categoryThunk";


interface TransactionFormProps {
  onSave: () => void;
  transactionId?: string;
}

export default function TransactionForm({ onSave, transactionId }: TransactionFormProps) {
  const categories = useAppSelector(selectAllCategories);
  const userId = useAppSelector(state => state.user.currentUser?.uid)
  const dispatch = useAppDispatch();
  const currentTransaction = useAppSelector(state => transactionId ? SelectTransactionById(state, transactionId) : undefined);
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const goals = useAppSelector(selectAllGoals);
  const [autoDetectCategory, setAutoDetectCategory] = useState<string | null>(null);

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
    onSave();
  }

  const detectCategory = debounce(async (comment: string) => {
    if (!comment || !userId) return;

    try {
      const { data } = await axios.post<{ category: string }>(`${API_URL}/detect-category`,
        { description: comment, userId }
      );
      if (data.category) {
        setSelectedCategory(data.category);
        setAutoDetectCategory(data.category)
        form.setFieldValue('category', data.category)
        dispatch(fetchCategories(userId))
      };
    } catch (error) {
      console.error(error);
    }
  }, 400);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    detectCategory(event.target.value);
    setAutoDetectCategory(null);
  }

  const handleChangeCategory = (value: string) => {
    setSelectedCategory(value);
    setAutoDetectCategory(null);
  }

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
      extra={autoDetectCategory ? 'Категория автоматически определена' : undefined}
      >
        <Select
        options={categories.map(category => ({ value: category.name, label: category.name }))}
        onChange={handleChangeCategory}
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
        <Input onChange={handleCommentChange}/>
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