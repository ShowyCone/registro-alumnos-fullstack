import Navbar from '../components/Navbar'
import '../styles/main.css'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <main className='main-container'>
        <Outlet />
      </main>
    </>
  )
}

export default DashboardLayout
