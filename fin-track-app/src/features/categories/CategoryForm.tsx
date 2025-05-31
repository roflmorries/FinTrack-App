import { Button, Form, Input, ColorPicker } from 'antd'
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks/redux/reduxTypes';
import { v4 as uuidv4 } from 'uuid'
import { addCategory, updateCategory } from '../../entities/categories/model/categorySlice';
import { useEffect } from 'react';
import { selectCategoryById } from '../../entities/categories/model/categorySelectors';

type CategoryFormProps = {
  onSave: () => void;
  categoryId?: string
}

export default function CategoryForm({ onSave, categoryId }: CategoryFormProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.user.currentUser?.uid);
  const currentCategory = useAppSelector(state => categoryId ? selectCategoryById(state, categoryId) : undefined);


  useEffect(() => {
    if (categoryId && currentCategory) {
      form.setFieldsValue({
        name: currentCategory.name,
        color: currentCategory.color
      });
    } else {
      form.resetFields();
    }
  }, [categoryId, currentCategory, form]);

  const handleSaveCategory = (values: {name: string, color: string}) => {
    if (!userId) return;

    const newCategory = {
      id: uuidv4(),
      userId,
      name: values.name,
      color: values.color
    }
    console.log(newCategory)

    dispatch(addCategory(newCategory));

    form.resetFields()
    onSave()
  }

  const handleEditCategory = (values: {name: string, color: string}) => {
    if (!categoryId) return;

    const updatedCategory = {
      id: categoryId,
      userId,
      changes: {
        name: values.name,
        color: values.color
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

      <Form.Item
      name='color'
      label='Color'
      rules={[{ required: true, message: 'Please choose category color' }]}
      getValueFromEvent={color => color.toHexString()}
      >
        <ColorPicker format='hex'/>
      </Form.Item>
      
      <Button type='primary' htmlType='submit'>Save</Button>
    </Form>
  )
}