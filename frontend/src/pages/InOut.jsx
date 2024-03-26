import toast from 'react-hot-toast'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext.jsx'

const InOut = () => {
    const { id, action } = useParams() 
    const navigate = useNavigate()
    const {authUser} = useAuthContext()

    if(authUser.id !== id) { navigate(`/`) }

    useEffect(() => {
        const io = async () => {
            try {
                const res = await axios.put(`/io/${id}/${action}`) 
                if (res.data.error) {
                    toast.error(res.data.error)
                } else {
                    toast.success(res.data.message)
                    navigate(`/${id}`)
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data.error)
                } else {
                    toast.error('An error occurred. Please try again.')
                }
            }
        }
        toast.promise(
            io(),
            {
              loading: 'Loading data...',
              success: 'Data loaded successfully',
              error: 'Failed to load data',
            },
            {
              duration: 2000,
            }
         );

    }, [id, action, navigate]) 
}

export default InOut