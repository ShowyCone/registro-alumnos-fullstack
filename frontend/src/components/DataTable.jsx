import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

const DataTable = ({ rows }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 120,
      editable: true,
    },
    {
      field: 'apellido',
      headerName: 'Apellido',
      width: 120,
      editable: true,
    },
    {
      field: 'cedula',
      headerName: 'Cedula',
      width: 100,
      editable: true,
    },
    {
      field: 'nota1',
      headerName: 'Lapso 1',
      width: 90,
      editable: true,
    },
    {
      field: 'nota2',
      headerName: 'Lapso 2',
      width: 90,
      editable: true,
    },
    {
      field: 'nota3',
      headerName: 'Lapso 3',
      width: 90,
      editable: true,
    },
    {
      field: 'promedio',
      headerName: 'Promedio',
      width: 90,
      editable: false,
    },
    {
      field: 'fullName',
      headerName: 'Nombre completo',
      description: 'Esta columna no puede ser ordenada.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.nombre || ''} ${row.apellido || ''}`,
    },
  ]

  return (
    <Box
      sx={{
        height: '90%',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 9,
            },
          },
        }}
        pageSizeOptions={[9]}
        disableRowSelectionOnClick
        processRowUpdate={(newRow, oldRow) => {
          const id = newRow.id
          console.log(`ID de la fila: ${id}`)
          axios
            .put(
              'https://registro-alumnos-fullstack.onrender.com/api/estudiante-notas/' +
                id,
              {
                nombre: newRow.nombre,
                apellido: newRow.apellido,
                cedula: newRow.cedula,
                nota1: parseInt(newRow.nota1),
                nota2: parseInt(newRow.nota2),
                nota3: parseInt(newRow.nota3),
              }
            )
            .then((response) => {
              console.log(response.data)
            })
            .catch((error) => {
              console.error('Hubo un error al obtener los datos:', error)
            })

          return newRow
        }}
      />
    </Box>
  )
}

export default DataTable
