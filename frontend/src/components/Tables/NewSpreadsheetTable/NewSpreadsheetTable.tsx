// import NewSpreadsheetTable from '@/components/Tables/NewSpreadsheetTable/NewSpreadsheetTable'

// =========================< IMPORTS: REACT >=================================
import React, { useState, useRef } from 'react'

// =========================< IMPORTS: OTHER >=================================
import { colIndexToLetter } from '@/utils/usefulFunctions'

// =========================< IMPORTS: COMPONENTS >============================

// =========================< IMPORTS: CSS >===================================
import './NewSpreadsheetTable.scss'

interface NewSpreadsheetTableProps {
  numRows: number
  numCols: number
  showCoordinates?: boolean
}

type CellValues = {
  [cellId: string]: string
}

type SelectedCell = {
  row: number
  col: number
}

export default function NewSpreadsheetTable({ numRows, numCols, showCoordinates = true }: NewSpreadsheetTableProps) {
  // Map cellId (e.g. "A1") to cell value
  const [cellValues, setCellValues] = useState<CellValues>({})
  // Track the currently selected cell (if any)
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null)
  // The editing value for the selected cell
  const [editingValue, setEditingValue] = useState<string>('')

  const tableRef = useRef<HTMLTableElement>(null)

  // Helper: returns cell id based on 1-indexed row and 0-indexed col
  const getCellId = (row: number, col: number): string => {
    return `${colIndexToLetter(col)}${row}`
  }

  // Handle cell click: select the cell and load its current value
  const handleCellClick = (row: number, col: number) => {
    const cellId = getCellId(row, col)
    setSelectedCell({ row, col })
    setEditingValue(cellValues[cellId] || '')
  }

  // Update editing value as the user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value)
  }

  // On input blur, save the value and clear selection
  const handleInputBlur = () => {
    if (selectedCell) {
      const cellId = getCellId(selectedCell.row, selectedCell.col)

      setCellValues((prev) => ({ ...prev, [cellId]: editingValue }))
    }

    setSelectedCell(null)
    setEditingValue('')
  }

  // Handle Enter/Escape in input
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur()
    } else if (e.key === 'Escape') {
      setSelectedCell(null)
      setEditingValue('')
    }
  }

  // Handle paste: parse clipboard text and fill cells starting from the selected cell
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (!selectedCell) {
      return
    }

    const pasteData = e.clipboardData.getData('Text')
    const rows = pasteData.split(/\r?\n/).filter((r) => r.trim() !== '')

    if (rows.length === 0) {
      return
    }

    const newValues = { ...cellValues }

    for (let r = 0; r < rows.length; r++) {
      const cols = rows[r].split('\t')

      for (let c = 0; c < cols.length; c++) {
        const targetRow = selectedCell.row + r
        const targetCol = selectedCell.col + c

        if (targetRow > numRows || targetCol >= numCols) {
          continue // ignore overflow
        }

        const cellId = getCellId(targetRow, targetCol)
        newValues[cellId] = cols[c]
      }
    }

    setCellValues(newValues)
    e.preventDefault()
  }

  // Render the table grid with coordinate headers
  const renderGrid = () => {
    const rowsJSX = []

    // Coordinate row (top header for columns)
    if (showCoordinates) {
      const coordRow = []
      // Top-left empty cell
      coordRow.push(<th key='coord-empty' className='coord-cell'></th>)

      for (let col = 0; col < numCols; col++) {
        const letter = colIndexToLetter(col)
        coordRow.push(
          <th key={`coord-col-${col}`} className='coord-cell' data-col={letter}>
            {letter}
          </th>
        )
      }

      rowsJSX.push(<tr key='coord-row'>{coordRow}</tr>)
    }

    // Data rows
    for (let r = 1; r <= numRows; r++) {
      const cells = []

      // Row coordinate header (left column)
      if (showCoordinates) {
        cells.push(
          <th key={`coord-row-${r}`} className='coord-cell' data-row={r}>
            {r}
          </th>
        )
      }

      for (let c = 0; c < numCols; c++) {
        const cellId = getCellId(r, c)
        const isSelected = selectedCell && selectedCell.row === r && selectedCell.col === c
        cells.push(
          <td key={cellId} data-cell={cellId} data-row={r} data-col={colIndexToLetter(c)} className={`spreadsheet-cell ${isSelected ? 'selected' : ''}`} onClick={() => handleCellClick(r, c)}>
            {isSelected ? <input type='text' value={editingValue} onChange={handleInputChange} onBlur={handleInputBlur} onKeyDown={handleInputKeyDown} autoFocus /> : cellValues[cellId] || ''}
          </td>,
        )
      }

      rowsJSX.push(<tr key={`row-${r}`}>{cells}</tr>)
    }

    return rowsJSX
  }


  return (
    <div className='NewSpreadsheetTableWrapper' onPaste={handlePaste}>


      <table ref={tableRef} className='NewSpreadsheetTable'>
        <thead>{showCoordinates && renderGrid()[0]}</thead>
        <tbody>{showCoordinates ? renderGrid().slice(1) : renderGrid()}</tbody>
      </table>


    </div>
  )
}

