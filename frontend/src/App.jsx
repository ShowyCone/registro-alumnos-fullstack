import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Quimica from './routes/Quimica'
import Matematicas from './routes/Matematicas'
import Castellano from './routes/Castellano'
import Fisica from './routes/Fisica'
import Biologia from './routes/Biologia'
import Ingles from './routes/Ingles'
import Login from './routes/Login'
import Register from './routes/Register'
import Chat from './routes/Chat'
import AdminIndex from './components/AdminIndex'
import { GlobalDataProvider } from './contexts/GlobalDataProvider'

const App = () => {
  return (
    <GlobalDataProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate replace to='/login' />} />
          <Route
            path='/login'
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path='/register'
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
          <Route path='/chat' element={<Chat />} />
          <Route path='/admin' element={<DashboardLayout />}>
            <Route index element={<AdminIndex />} />
            <Route path='quimica' element={<Quimica />} />
            <Route path='matematicas' element={<Matematicas />} />
            <Route path='castellano' element={<Castellano />} />
            <Route path='fisica' element={<Fisica />} />
            <Route path='biologia' element={<Biologia />} />
            <Route path='ingles' element={<Ingles />} />
          </Route>
        </Routes>
      </Router>
    </GlobalDataProvider>
  )
}

export default App
