require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { sequelize, Recipe, Ingredient, RecipeIngredient } = require('./models')
const portfinder = require('portfinder')


const app = express()
app.use(cors())
app.use(express.json())


// Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => console.error('❌ Unable to connect to database:', err))


// GET all recipes
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.findAll({ include: Ingredient })

    res.json(recipes)
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: 'Failed to fetch recipes' })
  }
})


// POST create a new recipe
app.post('/recipes', async (req, res) => {
  try {
    const { name, ingredients } = req.body

    const recipe = await Recipe.create({ name })

    for (const ingredient of ingredients) {
      const [ing, created] = await Ingredient.findOrCreate({ where: { name: ingredient.name } })
      await RecipeIngredient.create({
        recipeId: recipe.id,
        ingredientId: ing.id,
        amount: ingredient.amount || null,
      })
    }

    res.json({ success: true })
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: 'Failed to create recipe' })
  }
})


// GET total ingredient requirements
app.get('/ingredients-summary', async (req, res) => {
  try {
    const summary = await RecipeIngredient.findAll({
      attributes: ['ingredientId', [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']],
      group: ['ingredientId'],
      include: [{ model: Ingredient, attributes: ['name'] }],
    })

    res.json(summary)
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: 'Failed to fetch ingredient summary' })
  }
})


// Start the server on an available port
const DEFAULT_PORT = process.env.PORT || 3001

portfinder.getPort({ port: DEFAULT_PORT }, async (err, port) => {
  if (err) {
    console.error('❌ Error finding available port:', err)

    process.exit(1)
  }

  app.listen(port, async () => {
    console.log(`🚀 Server running on port ${port}`)

    // Sync database models
    await sequelize.sync({ alter: true })
  })
})

