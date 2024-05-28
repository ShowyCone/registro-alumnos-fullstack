import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import DataTable from '../components/DataTable'
import { CircularProgress } from '@mui/material'
import { GlobalDataContext } from '../contexts/GlobalDataProvider'

const Fisica = () => {
  const [items, setItems] = useState([])
  const [load, setLoad] = useState(true)
  const { yearSelected } = useContext(GlobalDataContext)

  useEffect(() => {
    setLoad(true)
    axios
      .get(
        `http://localhost:3000/api/estudiantes/year/${yearSelected}/materia/4`
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

export default Fisica