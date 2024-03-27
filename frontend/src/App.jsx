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

axios.defaults.baseURL = 'https://softd.onrender.com'
axios.defaults.withCredentials = true

function App() {
  const { authUser } = useAuthContext()
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />
      <Routes>
        <Route path='/' element={authUser ? <Navigate to={`/io/${authUser.id}`} /> : <Navigate to='/login' />} />
        <Route path='/:id' element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/io/:id' element={authUser ? <InOrOut /> : <Navigate to='/login' />} />
        <Route path='/io/:id/:action' element={authUser ? <InOut /> : <Navigate to='/login' />} />
        <Route path='/view/:id' element={authUser ? <View /> : <Navigate to='/login' />} />
        <Route path='/user/edit/:id' element={authUser ? <UserEdit /> : <Navigate to='/login' />} />
      </Routes>
    </>
  )
}

export default App
