import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { GlobalDataContext } from '../contexts/GlobalDataProvider'
import CircularProgress from '@mui/material/CircularProgress'

const AdminIndex = () => {
  const { yearSelected, setYearSelected } = useContext(GlobalDataContext) //id
  const [years, setYears] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('https://registro-alumnos-fullstack.onrender.com/api/a%C3%B1os/')
      .then((response) => {
        setYears(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los datos:', error)
        setIsLoading(false)
      })
  }, [])

  const handleClick = (e) => {
    console.log(e)
  }

  return (
    <div>
      <h1>Selecciona un año escolar</h1>
      <div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          years.map((year) => (
            <button
              onClick={() => {
                setYearSelected(year.id_año)
              }}
              key={year.id_año}
            >
              {year.año}
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminIndex
