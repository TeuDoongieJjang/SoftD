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
        <Route path='/' element={authUser ? <Navigate to={`/${authUser.id}`} /> : <Navigate to='/login' />} />
        <Route path='/:id' element={<Home />} />
        <Route path='/signup' element={authUser ? <Navigate to={`/${authUser.id}`} /> : <SignUp />} />
        <Route path='/login' element={authUser ? <Navigate to={`/${authUser.id}`} /> : <LogIn />} />
        <Route path='/io/:id' element={<InOrOut />} />
        <Route path='/io/:id/:action' element={<InOut />} />
        <Route path='/view/:id' element={<View />} />
        <Route path='/user/edit/:id' element={<UserEdit />} />
      </Routes>
    </>
  )
}

export default App
