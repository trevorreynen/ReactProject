// src/api/nutritionProducts.ts

import axios from 'axios'
import { NutritionProduct } from '@/types/NutritionFactTableTypes'

const BASE_URL = `${process.env.API_BASE}/nutritionfact`

// Fetch all products
export const fetchAllNutritionProducts = async (): Promise<NutritionProduct[]> => {
  const response = await axios.get<NutritionProduct[]>(BASE_URL)
  return response.data
}

// Fetch a single product by ID
export const fetchNutritionProductById = async (id: number): Promise<NutritionProduct> => {
  const response = await axios.get<NutritionProduct>(`${BASE_URL}/${id}`)
  return response.data
}

// Create a new product
export const createNutritionProduct = async (data: Partial<NutritionProduct>): Promise<NutritionProduct> => {
  const response = await axios.post<NutritionProduct>(BASE_URL, data)
  return response.data
}

// Update a product
export const updateNutritionProduct = async (id: number, updates: Partial<NutritionProduct>): Promise<NutritionProduct> => {
  const response = await axios.put<NutritionProduct>(`${BASE_URL}/${id}`, updates)
  return response.data
}

// Delete a product
export const deleteNutritionProduct = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`)
}
