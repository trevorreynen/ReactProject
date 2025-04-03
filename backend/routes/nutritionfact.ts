import { Router, Request, Response } from 'express'
import { NutritionProduct } from '../models/NutritionProduct'

const router = Router()


// GET all nutrition products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await NutritionProduct.findAll()

    res.json(products)
  } catch (err) {
    console.error('Error fetching nutrition products:', err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})


// GET a single product by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const product = await NutritionProduct.findByPk(id)

    if (!product) {
      res.status(404).json({ error: 'Product not found' })
      return
    }

    res.json(product)
  } catch (err) {
    console.error('Error fetching product:', err)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})


// POST new product
router.post('/', async (req: Request, res: Response) => {
  try {
    const newProduct = await NutritionProduct.create(req.body)
    res.status(201).json(newProduct)
  } catch (err) {
    console.error('Error creating product:', err)
    res.status(500).json({ error: 'Failed to create product' })
  }
})


// PUT: update product by ID
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const product = await NutritionProduct.findByPk(id)

    if (!product) {
      res.status(404).json({ error: 'Product not found' })
      return
    }

    await product.update(req.body)
    res.json(product)
  } catch (err) {
    console.error('Error updating product:', err)
    res.status(500).json({ error: 'Failed to update product' })
  }
})


// DELETE: product by ID
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const product = await NutritionProduct.findByPk(id)

    if (!product) {
      res.status(404).json({ error: 'Product not found' })
      return
    }

    await product.destroy()
    res.json({ message: 'Product deleted successfully' })
  } catch (err) {
    console.error('Error deleting product:', err)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

export default router
