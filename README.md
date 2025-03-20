The goal of this project is begin testing the creation of spreadsheets into scalable websites. I want to move the spreadsheets I use for games, on a personal website, that I can customize a bit more than having to be stuck with the structure of Google Sheets/Excel.

==================================================

My goal is to use:
- My custom React/webpack frontend setup.
- The following frameworks/libraries for styles (I may add more to the list, I may or may not use them all, idk. The idea is prevent myself sitting and trying to style/design components and stuff as least as possible.)
  - [And Design - Design](https://ant.design/docs/spec/introduce)
  - [Ant Design - Components](https://ant.design/components/overview)
  - [React Table Library](https://react-table-library.com/?path=/docs/compact-table--editable)
  - [TanStack Table - (see the example of the link for custom column sizing by dragging)](https://tanstack.com/table/latest/docs/framework/react/examples/column-sizing)
  ==================
  - [React Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Material UI (Hard maybe on this one. Issue is they really want pricing so some features for some things (like table sorting) aren't available for free)](https://mui.com/)



==================================================


Running everything:
- Frontend:
  ```
  cd frontend
  npm start
  ```
- Backend:
  ```
  cd backend
  npx nodemon index.js
  ```


When you make changes to the database (that are big, or if you are having issues in general), run the following commands in order to resync and redo the backend:
1️⃣ Delete the existing database (Optional if it's a fresh setup):
`npx sequelize-cli db:drop`

2️⃣ Recreate the database:
`npx sequelize-cli db:create`

3️⃣ Run migrations again:
`npx sequelize-cli db:migrate`

4️⃣ Seed the ingredients again:
`npx sequelize-cli db:seed:all`

5️⃣ Restart the backend server:
`npx nodemon index.js`



==================================================

Backend Process:
1. Install Dependencies
  - `npm init -y`
  - `npm install express mysql2 sequelize sequelize-cli cors dotenv`
    - `express` → Web framework for handling API requests.
    - `mysql2` → MySQL driver.
    - `sequelize` → ORM for working with MySQL.
    - `sequelize-cli` → Command-line tool for migrations & models.
    - `cors` → Allows cross-origin requests from your frontend.
    - `dotenv` → Loads environment variables from .env.
2. Setup Sequelize & Database Connection
  - `npx sequelize-cli init`
3. Create Database
  - Open MySQL Workbench, select Local Connection (and make sure it's running), File > New Query Tab. Type `CREATE DATABASE recipe_db;`. Press the lightning symbol to the right of the save symbol. This creates the database. Go to Schemas and right click and refresh all to see it.
4. Define Models (for this project's first test).
  - Run the following code one after another:
    - `npx sequelize-cli model:generate --name Recipe --attributes name:string`
    - `npx sequelize-cli model:generate --name Ingredient --attributes name:string`
    - `npx sequelize-cli model:generate --name RecipeIngredient --attributes recipeId:integer,ingredientId:integer,amount:decimal`
  - Above commands generated models inside `models/`
  - Now, edit `models/recipe.js`:
    ```js
    module.exports = (sequelize, DataTypes) => {
      const Recipe = sequelize.define('Recipe', {
        name: DataTypes.STRING
      })

      Recipe.associate = (models) => {
        Recipe.belongsToMany(models.Ingredient, {
          through: models.RecipeIngredient,
          foreignKey: 'recipeId'
        })
      }

      return Recipe
    }
    ```
  - Next, edit `models/ingredient.js`:
    ```js
    module.exports = (sequelize, DataTypes) => {
      const Ingredient = sequelize.define('Ingredient', {
        name: DataTypes.STRING
      })

      Ingredient.associate = (models) => {
        Ingredient.belongsToMany(models.Recipe, {
          through: models.RecipeIngredient,
          foreignKey: 'ingredientId'
        })
      }

      return Ingredient
    }
    ```
  - Next, edit `models/recipeingredient.js`:
    ```js
    module.exports = (sequelize, DataTypes) => {
      const RecipeIngredient = sequelize.define('RecipeIngredient', {
        recipeId: DataTypes.INTEGER,
        ingredientId: DataTypes.INTEGER,
        amount: DataTypes.DECIMAL(10, 2)
      })

      return RecipeIngredient
    }
    ```
  - Next, run **migrations** to update the database: `npx sequelize-cli db:migrate`
5. Create `./backend/index.js` and add:
  ```js
  require('dotenv').config()
  const express = require('express')
  const cors = require('cors')
  const { Recipe, Ingredient, RecipeIngredient } = require('./models')

  const app = express()
  app.use(cors())
  app.use(express.json())

  /** GET all recipes */
  app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.findAll({ include: Ingredient })
    res.json(recipes)
  })

  /** POST create a new recipe */
  app.post('/recipes', async (req, res) => {
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
  })

  /** GET total ingredient requirements */
  app.get('/ingredients-summary', async (req, res) => {
    const summary = await RecipeIngredient.findAll({
      attributes: ['ingredientId', [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']],
      group: ['ingredientId'],
      include: [{ model: Ingredient, attributes: ['name'] }]
    })

    res.json(summary)
  })

  /** Start server */
  app.listen(3001, () => {
    console.log('Server running on port 3001')
  })
  ```



