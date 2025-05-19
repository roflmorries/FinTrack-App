import { Button, Form, Input } from 'antd'
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks/redux/reduxTypes';
import { v4 as uuidv4 } from 'uuid'
import { addCategory, updateCategory } from '../../entities/categories/model/categorySlice';

type CategoryFormProps = {
  onSave: () => void;
  categoryId?: string
}

export default function CategoryForm({ onSave, categoryId }: CategoryFormProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.user.currentUser?.uid)

  const handleSaveCategory = (values: {name: string}) => {
    if (!userId) return;

    const newCategory = {
      id: uuidv4(),
      userId,
      name: values.name
    }

    dispatch(addCategory(newCategory));

    form.resetFields()
    onSave()
  }

  const handleEditCategory = (values: {name: string}) => {
    if (!categoryId) return;

    const updatedCategory = {
      id: categoryId,
      userId,
      changes: {
        name: values.name
      }
    }

    dispatch(updateCategory(updatedCategory))
    onSave();
  }

  return (
    <Form
    onFinish={!categoryId ? handleSaveCategory : handleEditCategory}
    form={form}
    layout='vertical'
    >
      <Form.Item
      name='name'
      label='Category name'
      rules={[{ required: true, message: 'Please enter category name' }]}
      >
        <Input placeholder='Enter category name'/>
      </Form.Item>
      
      <Button type='primary' htmlType='submit'>Save</Button>
    </Form>
  )
}