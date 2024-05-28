import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import DataTable from '../components/DataTable'
import { CircularProgress } from '@mui/material'
import { GlobalDataContext } from '../contexts/GlobalDataProvider'

const Quimica = () => {
  const [items, setItems] = useState([])
  const [load, setLoad] = useState(true)
  const { yearSelected } = useContext(GlobalDataContext)

  useEffect(() => {
    setLoad(true)
    if (yearSelected)
      axios
        .get(
          `http://localhost:3000/api/estudiantes/year/${yearSelected}/materia/1`
        )
        .then((response) => {
          setItems(response.data)
          setLoad(false)
        })
        .catch((error) => {
          console.error('Hubo un error al obtener los datos:', error)
        })
  }, [yearSelected])

  useEffect(() => {
    console.log(items.length === 0)
  }, [items])
  return (
    <div>
      {load ? (
        <CircularProgress />
      ) : items.length === 0 ? (
        <h1>Datos no encontrados</h1>
      ) : (
        <DataTable rows={items} />
      )}
    </div>
  )
}

export default Quimica
