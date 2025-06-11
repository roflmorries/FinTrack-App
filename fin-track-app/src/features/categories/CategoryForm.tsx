import { Button, Form, Input, ColorPicker } from 'antd'
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks/redux/reduxTypes';
import { useEffect } from 'react';
import { selectCategoryById } from '../../entities/categories/model/categorySelectors';
import { createCategory, updateCategory } from '../../entities/categories/model/categoryThunk';

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

  const handleSaveCategory = async (values: {name: string, color: string}) => {
    if (!userId) return;

    const newCategory = {
      userId,
      name: values.name,
      color: values.color
    }
    console.log(newCategory)

    await dispatch(createCategory(newCategory));

    form.resetFields()
    onSave()
  }

  const handleEditCategory = async (values: {name: string, color: string}) => {
    if (!categoryId) return;

    const updatedCategory = {
      id: categoryId,
      userId,
      changes: {
        name: values.name,
        color: values.color
      }
    }

    await dispatch(updateCategory(updatedCategory))
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