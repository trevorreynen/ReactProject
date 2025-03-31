//import RecipeTable from '@/components/Tables/RecipeTable/RecipeTable'

// =========================< IMPORTS: REACT >=================================
import { useState, useEffect, useMemo } from 'react'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================
import { fetchRecipes } from '@/api/recipes'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'

// =========================< IMPORTS: COMPONENTS >============================
import AddRecipeModal from '../../Modals/AddRecipeModal/AddRecipeModal'

// =========================< IMPORTS: CSS >===================================
import './RecipeTable.scss'



export default function RecipeTable() {
  const [data, setData] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetchRecipes().then(setData)
  }, [])

  const refreshData = () => {
    fetchRecipes().then(setData)
  }

  const columns = useMemo(() => {
    const uniqueIngredients = new Set<string>()

    data.forEach((recipe) => {
      recipe.Ingredients?.forEach((ing: any) => {
        uniqueIngredients.add(ing.name)
      })
    })

    return [
      {
        accessorKey: 'name',
        header: 'Recipe',
        cell: (info: any) => info.getValue(),
      },
      ...Array.from(uniqueIngredients).map((name) => ({
        accessorKey: name,
        header: name,
        cell: ({ row }: any) => {
          const found = row.original.Ingredients.find((i: any) => i.name === name)
          return found?.RecipeIngredient?.quantity ?? ''
        },
      })),
    ]
  }, [data])

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })


  return (
    <div className='RecipeTable'>


      <button onClick={() => setModalOpen(true)}>Add Recipe</button>

      <div className='table-scroll-container'>
        <table>
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddRecipeModal open={modalOpen} onClose={() => setModalOpen(false)} onRecipeCreated={refreshData} />


    </div>
  )
}

