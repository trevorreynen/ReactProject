// =========================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'

// =========================< IMPORTS: API >===================================
import { createNutritionProduct, fetchAllNutritionProducts, updateNutritionProduct, deleteNutritionProduct  } from '@/api/nutritionProducts'


// =========================< IMPORTS: OTHER >=================================
import { ModalField } from '@/types/UniversalFormModalTypes'
import { ProductEntry } from '@/types/NutritionFactTableTypes'

// =========================< IMPORTS: COMPONENTS >============================
import NutritionFactTable from '@/components/Tables/NutritionFactTable/NutritionFactTable'
import UniversalFormModal from '@/components/Modals/UniversalModal/UniversalFormModal'
import { formFields } from '@/config/NutritionProductFormModalConfig'

// =========================< IMPORTS: STYLES >================================
//import './TestPage3.scss'



function convertProductToFormData(product: ProductEntry): Record<string, any> {
  const formData: Record<string, any> = {
    productName: product.name,
    servingSize: product.values['1']?.unit || '',
    servingSizeMeasurement: product.values['2']?.unit || '',
    calories: product.values['3']?.unit || '',
  }

  const indexToKey: Record<string, string> = {
    4: 'totalFat',
    5: 'saturatedFat',
    6: 'transFat',
    7: 'polyunsaturatedFat',
    8: 'monounsaturatedFat',
    9: 'cholesterol',
    10: 'sodium',
    11: 'totalCarbohydrate',
    12: 'dietaryFiber',
    13: 'solubleFiber',
    14: 'insolubleFiber',
    15: 'totalSugars',
    16: 'addedSugars',
    17: 'erythritol',
    18: 'protein',
    19: 'calcium',
    20: 'copper',
    21: 'folate',
    22: 'iron',
    23: 'magnesium',
    24: 'niacin',
    25: 'pantothenicAcid',
    26: 'phosphorus',
    27: 'potassium',
    28: 'riboflavin',
    29: 'selenium',
    30: 'thiamin',
    31: 'vitaminA',
    32: 'vitaminB6',
    33: 'vitaminB12',
    34: 'vitaminC',
    35: 'vitaminD',
    36: 'vitaminE',
    37: 'vitaminK',
    38: 'zinc',
  }

  for (let i = 4; i <= 38; i++) {
    const key = indexToKey[i]
    const nutrient = product.values[String(i)]
    if (key && nutrient) {
      formData[`${key}_unit`] = nutrient.unit || ''
      formData[`${key}_dv`] = nutrient.dailyValue || ''
    }
  }

  return formData
}




export default function TestPage3() {
  const [modalOpen, setModalOpen] = useState(false)
  const [products, setProducts] = useState<ProductEntry[]>([])
  const [editingProduct, setEditingProduct] = useState<ProductEntry | null>(null)

  const handleEditProduct = (product: ProductEntry) => {
    setEditingProduct(product)
    setModalOpen(true)
  }


  const nutrientKeyToIndex: Record<string, number> = {
    totalFat: 4,
    saturatedFat: 5,
    transFat: 6,
    polyunsaturatedFat: 7,
    monounsaturatedFat: 8,
    cholesterol: 9,
    sodium: 10,
    totalCarbohydrate: 11,
    dietaryFiber: 12,
    solubleFiber: 13,
    insolubleFiber: 14,
    totalSugars: 15,
    addedSugars: 16,
    erythritol: 17,
    protein: 18,
    calcium: 19,
    copper: 20,
    folate: 21,
    iron: 22,
    magnesium: 23,
    niacin: 24,
    pantothenicAcid: 25,
    phosphorus: 26,
    potassium: 27,
    riboflavin: 28,
    selenium: 29,
    thiamin: 30,
    vitaminA: 31,
    vitaminB6: 32,
    vitaminB12: 33,
    vitaminC: 34,
    vitaminD: 35,
    vitaminE: 36,
    vitaminK: 37,
    zinc: 38,
  }

  const handleFormSubmit = async (data: Record<string, any>) => {
    try {
      const productPayload: Record<string, any> = {
        name: data.productName,
        servingSize: data.servingSize,
        servingSizeMeasurement: data.servingSizeMeasurement,
        calories: data.calories,
      }

      Object.entries(nutrientKeyToIndex).forEach(([key]) => {
        const formUnitKey = `${key}_unit`
        const formDvKey = `${key}_dv`

        const backendUnitKey = `${key}_Unit`
        const backendDvKey = `${key}_DV`

        productPayload[backendUnitKey] = data[formUnitKey] ?? ''
        productPayload[backendDvKey] = data[formDvKey] ?? ''

        console.log('Mapped', formUnitKey, '→', backendUnitKey, '→', productPayload[backendUnitKey])
        console.log('Mapped', formDvKey, '→', backendDvKey, '→', productPayload[backendDvKey])
      })

      // Decide: Create vs Update
      if (editingProduct?.id != null) {
        await updateNutritionProduct(editingProduct.id, productPayload)
        console.log('Product updated successfully!')
      } else {
        await createNutritionProduct(productPayload)
        console.log('Product created successfully!')
      }

      await fetchProducts()
      setModalOpen(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('Failed to submit product:', error)
      console.log('Error adding product. See console.')
    }
  }


  const indexToKey: Record<number, string> = Object.fromEntries(
    Object.entries(nutrientKeyToIndex).map(([k, v]) => [v, k])
  )

  const fetchProducts = async () => {
    try {
      const response = await fetchAllNutritionProducts()

      const transformed: ProductEntry[] = response.map((product: any) => {
        const values: ProductEntry['values'] = {}

        values['1'] = { unit: product.servingSize || '' }
        values['2'] = { unit: product.servingSizeMeasurement || '' }
        values['3'] = { unit: product.calories || '' }

        // Loop keys 4–38 for unit and daily value
        for (let i = 4; i <= 38; i++) {
          const key = indexToKey[i]
          const unitKey = `${key}_Unit`
          const dvKey = `${key}_DV`

          values[String(i)] = {
            unit: product[unitKey] || '',
            dailyValue: product[dvKey] || '',
          }
        }

        return {
          id: product.id,
          name: product.name,
          values,
        }
      })

      setProducts(transformed)
    } catch (err) {
      console.error('Failed to load products:', err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDeleteProduct = async () => {
    if (!editingProduct?.id) {
      return
    }

    try {
      await deleteNutritionProduct(editingProduct.id)
      console.log('Product deleted successfully')
      await fetchProducts()
      setModalOpen(false)
      setEditingProduct(null)
    } catch (err) {
      console.error('Failed to delete product:', err)
    }
  }


  return (
    <div className='TestPage3'>


      <div>Nutrition Fact Table</div>


      <NutritionFactTable entries={products} canEditProduct={true} onEditProduct={handleEditProduct} />


      <button onClick={() => setModalOpen(true)} className='open-modal-button'>
        Open Add Product Modal
      </button>

      <UniversalFormModal
        open={modalOpen}
        fields={formFields}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        modalHeader={editingProduct ? 'Edit Product Nutrition Fact' : 'Add Product Nutrition Fact'}
        onSubmit={handleFormSubmit}
        submitLabel={editingProduct ? 'Save Changes' : 'Add Product'}
        initialData={editingProduct ? convertProductToFormData(editingProduct) : {}}
        onDelete={editingProduct ? handleDeleteProduct : undefined}
      />


    </div>
  )
}

