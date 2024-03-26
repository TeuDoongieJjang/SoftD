import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'

const useLogOut = () => {
    const {setAuthUser} = useAuthContext()
    const navigate = useNavigate()

    const logout = async () => {

        try {
            const res = await axios.get('/logout')
            if(res.error){
                toast.error(res.error)
            } else {
                toast.success('Succesfully Logged Out')
                localStorage.removeItem("AuthUser")
                setAuthUser(null)
                navigate('/login')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return {logout}

}

export default useLogOut