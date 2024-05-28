import { NavLink } from 'react-router-dom'
import { SlChemistry } from 'react-icons/sl'
import { PiMathOperations } from 'react-icons/pi'
import { TbMathXDivideY2, TbAbc } from 'react-icons/tb'
import { CiLogout } from 'react-icons/ci'
import { MdBiotech } from 'react-icons/md'
import { RiEnglishInput } from 'react-icons/ri'
import Divider from '@mui/material/Divider'
import Select from './Select'
import '../styles/navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar-vertical'>
      <ul>
        <div>
          <li>
            <Select />
          </li>
          <Divider variant='middle' component='li' />
          <li className='nav-materias'>
            <NavLink
              to='/admin/quimica'
              className={({ isActive }) =>
                isActive ? 'active navlink' : 'navlink'
              }
            >
              <span className='icons'>
                <SlChemistry />
              </span>
              Química
            </NavLink>
          </li>
          <li className='nav-materias'>
            <NavLink
              to='/admin/matematicas'
              className={({ isActive }) =>
                isActive ? 'active navlink' : 'navlink'
              }
            >
              <span className='icons'>
                <PiMathOperations />
              </span>
              Matemáticas
            </NavLink>
          </li>
          <li className='nav-materias'>
            <NavLink
              to='/admin/castellano'
              className={({ isActive }) =>
                isActive ? 'active navlink' : 'navlink'
              }
            >
              <span className='icons'>
                <TbAbc />
              </span>
              Castellano
            </NavLink>
          </li>
          <li className='nav-materias'>
            <NavLink
              to='/admin/fisica'
              className={({ isActive }) =>
                isActive ? 'active navlink' : 'navlink'
              }
            >
              <span className='icons'>
                <TbMathXDivideY2 />
              </span>
              Física
            </NavLink>
          </li>
          <li className='nav-materias'>
            <NavLink
              to='/admin/biologia'
              className={({ isActive }) =>
                isActive ? 'active navlink' : 'navlink'
              }
            >
              <span className='icons'>
                <MdBiotech />
              </span>
              Biología
            </NavLink>
          </li>
          <li className='nav-materias'>
            <NavLink
              to='/admin/ingles'
              className={({ isActive }) =>
                isActive ? 'active navlink' : 'navlink'
              }
            >
              <span className='icons'>
                <RiEnglishInput />
              </span>
              Inglés
            </NavLink>
          </li>
        </div>
        <div>
          <Divider variant='middle' component='li' />
          <li className='nav-materias'>
            <NavLink
              to='/login'
              className={({ isActive }) =>
                isActive ? 'active navlink' : 'navlink'
              }
            >
              <span className='icons'>
                <CiLogout />
              </span>
              Cerrar Sesión
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
