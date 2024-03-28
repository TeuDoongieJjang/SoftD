import toast from 'react-hot-toast'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext.jsx'

const InOut = () => {

    const { id, action } = useParams()
    const { authUser } = useAuthContext()
    const navigate = useNavigate()

    if (authUser.id !== id) { navigate(`/api/${authUser.id}`) }

    useEffect(() => {
        const io = async () => {
            try {
                const res = await axios.put(`/api/io/${id}/${action}`)
                if (res.data.error) {
                    toast.error(res.data.error)
                } else {
                    toast.success(res.data.message)
                    navigate(`/api/${id}`)
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
                loading: 'Loading',
                success: 'Loaded Successfully',
                error: 'Loading Failed',
            },
            {
                duration: 2000,
            }
        );

    }, [id, action, navigate])
}

export default InOut