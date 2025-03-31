
const BASE_URL = `${process.env.API_BASE}/recipes`

export type IngredientEntry = {
  ingredientId: number
  quantity: number
}

export type RecipePayload = {
  name: string
  ingredients: IngredientEntry[]
}


export async function fetchRecipes() {
  const res = await fetch(BASE_URL)

  if (!res.ok) {
    throw new Error('Failed to fetch recipes')
  }

  return res.json()
}


export async function createRecipe(data: RecipePayload) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Failed to create recipe')
  }

  return res.json()
}


export async function updateRecipe(id: number, data: RecipePayload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Failed to update recipe')
  }

  return res.json()
}


export async function deleteRecipe(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete recipe')
  }

  return res.json()
}

