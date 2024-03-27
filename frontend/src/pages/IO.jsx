import toast from 'react-hot-toast'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext.jsx'

const InOrOut = () => {

  const { id } = useParams()
  const { authUser } = useAuthContext()
  const navigate = useNavigate()

  if (authUser.id !== id) { navigate(`/io/${authUser.id}`) }

  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')

  const [timeStatsIn, setTimeStatsIn] = useState()
  const [timeStatsOut, setTimeStatsOut] = useState()


  useEffect(() => {
    const io = async () => {
      try {
        const res = await axios.get(`/io/${authUser.id}`)
        if (res.data && res.data.error) {
          toast.error(res.data.error)
          navigate('/login')
        } else {
          if (res.data) {
            setName(res.data.name)
            setTimeStatsIn(res.data.statusIn)
            setTimeStatsOut(res.data.statusOut)
            setLoading(false)
          } else {
            toast.error('User ID not found in response')
            navigate('/login')
          }
        }

      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error)
          navigate('/login')
        } else {
          toast.error('An error occurred. Please try again.')
          navigate('/login')
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

  }, [authUser.id, navigate])



  return (
    <div className='bg-blue-500 min-h-screen pt-5 pb-5 pl-2 pr-2 flex flex-col items-center justify-center'>
      {loading ? <div></div> : <>
          <div className='w-full max-w-md mx-auto bg-white shadow-md rounded-2xl pr-8 pl-8 pt-4 pb-4'>
            <div className='flex items-center justify-center pt-4 pb-4 pl-2 pr-2'>
              <label className='text-black font-bold text-2xl text-center break-words'>{name}</label>
            </div>
            <div className='flex items-center justify-between'>
              <button disabled={timeStatsIn} className='btn btn-primary bg-yellow-500 text-black hover:bg-blue-500 hover:text-white' onClick={() => { navigate(`/io/${id}/in`); }} >
                IN
              </button>
              <button className='btn btn-primary bg-yellow-500 text-black hover:bg-blue-500 hover:text-white' onClick={() => navigate(`/${id}`)}>HOME</button>
              <button disabled={timeStatsOut} className='btn btn-primary bg-yellow-500 text-black hover:bg-blue-500 hover:text-white' onClick={() => { navigate(`/io/${id}/out`); }} >
                OUT
              </button>
            </div>
          </div>
      </>}
    </div>
  )
}

export default InOrOut