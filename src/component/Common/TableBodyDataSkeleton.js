import { Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'

export const TableBodyDataSkeleton = ({numberOfColumns,imagePreview,editAction,deleteAction}) => {

  const [colsArray, setColsArray] = useState([])
  const [rowsArray, setRowsArray] = useState([]);



  useEffect(() => {
    const totalRows = imagePreview ? 5 : 9
    const totalColumns = numberOfColumns

    let rowsArr = []
    let colArr = []

    for (let row = 0; row < totalRows; row++) {
      const element = `row ${row + 1}`
      rowsArr.push(element)
    }
    for (let col = 0; col < totalColumns; col++) {
      const element = `col ${col + 1}`
      colArr.push(element)
    }
    setColsArray(colArr)
    setRowsArray(rowsArr)
  }, [])

  return (
    <TableBody>
      {rowsArray.map((colElement, rowInd) => (
        <TableRow key={rowInd}>
          {colsArray.map((rowElement, colInd) => (<TableCell sx={{py:3}} key={colInd}>{' '}
            {imagePreview && colInd + 2 === colsArray.length ? <Skeleton variant='rectangular' width={'100px'} height={'100px'} /> : colInd + 1 === colsArray.length && editAction && deleteAction ? <Stack direction='row' justifyContent='center' spacing={3}>
            <Skeleton width={'30%'} />
            <Skeleton width={'30%'} />
          </Stack> : colInd + 1 === colsArray.length && editAction || deleteAction ? <Stack direction='row' justifyContent='center' spacing={3}>
            <Skeleton width={'30%'} />
          </Stack> 
          : <Skeleton /> }
          </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
