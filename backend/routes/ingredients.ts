import { Router } from 'express'
import { Ingredient } from '../models'

const router = Router()


// GET: all ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll()

    res.json(ingredients)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ingredients' })
  }
})


// POST: add a new ingredient
router.post('/', async (req, res) => {
  const { name } = req.body

  try {
    const ingredient = await Ingredient.create({ name })

    res.status(201).json(ingredient)
  } catch (error) {
    res.status(500).json({ error: 'Error creating ingredient' })
  }
})


// GET: ingredient summary: total per ingredient across all recipes
router.get('/summary', async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll({
      include: {
        association: 'Recipes',
        through: { attributes: ['quantity'] }
      }
    })

    const summary: Record<string, number> = {}

    ingredients.forEach((ingredient) => {
      const total = (ingredient as any).Recipes.reduce((sum: number, recipe: any) => {
        return sum + (recipe.RecipeIngredient?.quantity || 0)
      }, 0)

      summary[ingredient.name] = total
    })

    res.json(summary)
  } catch (error) {
    res.status(500).json({ error: 'Error generating ingredient summary' })
  }
})


export default router

