import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import LogIn from './pages/LogIn.jsx'
import View from './pages/View.jsx'
import UserEdit from './pages/UserEdit.jsx'
import InOrOut from './pages/IO.jsx'
import InOut from './pages/InOut.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useAuthContext } from './context/AuthContext.jsx'

axios.defaults.baseURL = 'https://softd.onrender.com/api'
axios.defaults.withCredentials = true

function App() {
  const { authUser } = useAuthContext()
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />
      <Routes>
        <Route path='/' element={authUser ? <Navigate to={`/api/io/${authUser.id}`} /> : <Navigate to='/api/login' />} />
        <Route path='/api/:id' element={authUser ? <Home /> : <Navigate to='/api/login' />} />
        <Route path='/api/signup' element={<SignUp />} />
        <Route path='/api/login' element={<LogIn />} />
        <Route path='/api/io/:id' element={authUser ? <InOrOut /> : <Navigate to='/api/login' />} />
        <Route path='/api/io/:id/:action' element={authUser ? <InOut /> : <Navigate to='/api/login' />} />
        <Route path='/api/view/:id' element={authUser ? <View /> : <Navigate to='/api/login' />} />
        <Route path='/api/user/edit/:id' element={authUser ? <UserEdit /> : <Navigate to='/api/login' />} />
      </Routes>
    </>
  )
}

export default App
