import { Router, Request, Response } from 'express'
import { Recipe, Ingredient } from '../models'

const router = Router()


// GET: all recipes (with their ingredients)
router.get('/', async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.findAll({ include: Ingredient })

    res.json(recipes)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recipes' })
  }
})


// POST: create a new recipe with ingredients
router.post('/', async (req: Request, res: Response) => {
  const { name, ingredients } = req.body

  try {
    const recipe = await Recipe.create({ name })

    if (Array.isArray(ingredients)) {
      for (const ing of ingredients) {
        // Cast the options as 'any' to allow the 'through' property
        await recipe.addIngredient(ing.ingredientId, {
          through: { quantity: ing.quantity }
        } as any)
      }
    }

    res.status(201).json(recipe)
  } catch (error) {
    res.status(500).json({ error: 'Error creating recipe' })
  }
})


// PUT: update a recipe
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { name, ingredients } = req.body

  try {
    const recipe = await Recipe.findByPk(id)

    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' })
      return
    }

    await recipe.update({ name })
    await recipe.setIngredients([])

    if (Array.isArray(ingredients)) {
      for (const ing of ingredients) {
        await recipe.addIngredient(ing.ingredientId, {
          through: { quantity: ing.quantity }
        } as any)
      }
    }

    res.json({ message: 'Recipe updated' })

    return
  } catch (error) {
    res.status(500).json({ error: 'Error updating recipe' })

    return
  }
})


// DELETE: recipe
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const recipe = await Recipe.findByPk(id)

    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' })

      return
    }

    await recipe.destroy()

    res.json({ message: 'Recipe deleted' })

    return
  } catch (error) {
    res.status(500).json({ error: 'Error deleting recipe' })

    return
  }
})

export default router

