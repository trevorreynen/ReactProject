const BASE_URL = `${process.env.API_BASE}/ingredients`


export async function fetchIngredients() {
  const res = await fetch(BASE_URL)

  if (!res.ok) {
    throw new Error('Failed to fetch ingredients')
  }

  return res.json()
}


export async function createIngredient(name: string) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })

  if (!res.ok) {
    throw new Error('Failed to create ingredient')
  }

  return res.json()
}


export async function fetchIngredientSummary() {
  const res = await fetch(`${BASE_URL}/summary`)

  if (!res.ok) {
    throw new Error('Failed to fetch summary')
  }

  return res.json()
}

