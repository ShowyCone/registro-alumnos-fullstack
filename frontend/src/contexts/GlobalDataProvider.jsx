import { createContext, useState } from 'react'

export const GlobalDataContext = createContext(null)

export const GlobalDataProvider = ({ children }) => {
  const [allData, setAllData] = useState([])

  const [yearSelected, setYearSelected] = useState('') // id

  const contextValue = {
    allData,
    setAllData,
    yearSelected,
    setYearSelected,
  }

  return (
    <GlobalDataContext.Provider value={contextValue}>
      {children}
    </GlobalDataContext.Provider>
  )
}
