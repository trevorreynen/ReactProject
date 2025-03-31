//import AddRecipeModal from '@/components/Modals/AddRecipeModal/AddRecipeModal'

// =========================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'

// =========================< IMPORTS: LAYOUT >================================

// =========================< IMPORTS: OTHER >=================================
import { fetchIngredients } from '@/api/ingredients'
import { createRecipe } from '@/api/recipes'
import { Modal, Button, Input, Select, Form, Space } from 'antd'

// =========================< IMPORTS: COMPONENTS >============================

// =========================< IMPORTS: CSS >===================================
import './AddRecipeModal.scss'


const { Option } = Select

type Ingredient = { id: number; name: string }

type Props = {
  open: boolean
  onClose: () => void
  onRecipeCreated: () => void
}



export default function AddRecipeModal({ open, onClose, onRecipeCreated }: Props) {
  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState<{ ingredientId: number; quantity: number }[]>([])
  const [ingredientOptions, setIngredientOptions] = useState<Ingredient[]>([])

  useEffect(() => {
    fetchIngredients().then(setIngredientOptions)
  }, [])

  const addIngredientField = () => {
    setIngredients([...ingredients, { ingredientId: 0, quantity: 1 }])
  }

  const updateIngredient = (index: number, key: 'ingredientId' | 'quantity', value: any) => {
    const updated = [...ingredients]
    updated[index][key] = key === 'quantity' ? parseFloat(value) : Number(value)
    setIngredients(updated)
  }

  const handleCreate = async () => {
    await createRecipe({ name: recipeName, ingredients })

    onClose()
    setRecipeName('')
    setIngredients([])
    onRecipeCreated()
  }


  return (
    <div className='AddRecipeModal'>


      <Modal open={open} onCancel={onClose} onOk={handleCreate} title='Add New Recipe' okText='Create Recipe'>
        <Form layout='vertical'>

          <Form.Item label='Recipe Name'>
            <Input value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
          </Form.Item>

          <Form.Item label='Ingredients'>
            <Space direction='vertical' style={{ width: '100%' }}>
              {ingredients.map((ing, index) => (
                <Space key={index} style={{ display: 'flex', width: '100%' }}>
                  <Select placeholder='Select Ingredient' style={{ flex: 2 }} value={ing.ingredientId || undefined} onChange={(val) => updateIngredient(index, 'ingredientId', val)}>
                    {ingredientOptions.map((opt) => (
                      <Option key={opt.id} value={opt.id}>
                        {opt.name}
                      </Option>
                    ))}
                  </Select>
                  <Input type='number' placeholder='Quantity' style={{ flex: 1 }} value={ing.quantity} onChange={(e) => updateIngredient(index, 'quantity', e.target.value)} />
                </Space>
              ))}
              <Button onClick={addIngredientField}>Add Ingredient +</Button>
            </Space>
          </Form.Item>

        </Form>
      </Modal>


    </div>
  )
}

