import loginImage from '../assets/login.jpg'
import '../styles/login.css'

const AuthLayout = ({ children }) => {
  return (
    <div className='auth-body'>
      <div className='auth-layout'>
        <div className='img-container'>
          <img src={loginImage} alt='login' className='img-login' />
        </div>
        <div className='form-container'>{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
