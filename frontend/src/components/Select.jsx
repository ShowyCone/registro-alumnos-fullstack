import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useContext } from 'react'
import { GlobalDataContext } from '../contexts/GlobalDataProvider'

export default function SelectAutoWidth() {
  const { yearSelected, setYearSelected } = useContext(GlobalDataContext) //id

  const handleChange = (event) => {
    setYearSelected(event.target.value)
  }

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 150,
        color: '#fff',
        margin: '20px',
        textAlign: 'center',
      }}
      size='small'
    >
      <InputLabel
        sx={{ color: '#fff' }}
        id='demo-simple-select-autowidth-label'
      >
        Año
      </InputLabel>
      <Select
        sx={{
          color: '#fff',
          borderColor: '#fff',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
        }}
        labelId='demo-simple-select-autowidth-label'
        id='demo-simple-select-autowidth'
        value={yearSelected}
        onChange={handleChange}
        autoWidth
        label='Año'
      >
        <MenuItem value={1}>3er año</MenuItem>
        <MenuItem value={2}>4to año</MenuItem>
        <MenuItem value={3}>5to año</MenuItem>
      </Select>
    </FormControl>
  )
}
