import toast from 'react-hot-toast'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext.jsx'

const InOrOut = () => {
 const [name, setName] = useState('')
 const {id} = useParams()
 const navigate = useNavigate()
 const [timeStatsIn, setTimeStatsIn] = useState()
 const [timeStatsOut, setTimeStatsOut] = useState()
 const {authUser} = useAuthContext()

 if(authUser.id !== id) { navigate(`/`) }

 useEffect(() => {
    const io = async () => {
        try {
            const res = await axios.get(`/io/${authUser.id}`)
            if(res.data && res.data.error){
                toast.error(res.data.error)
            } else {
                if(res.data){
                    setName(res.data.name)
                    setTimeStatsIn(res.data.statusIn)
                    setTimeStatsOut(res.data.statusOut)
                } else {
                    toast.error('User ID not found in response')
                }
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

 }, [authUser.id])

 

 return (
    <div className='min-h-screen pt-5 pb-5 pl-2 pr-2 flex flex-col items-center justify-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded-2xl pr-8 pl-8 pt-4 pb-4'>
        <div className='flex items-center justify-center pt-4 pb-4 pl-2 pr-2'>
          <label className='text-black text-3xl text-center'>{name}</label>
        </div>
        <div className='flex items-center justify-between'>
          <button disabled={timeStatsIn} className='btn btn-primary' onClick={()=>{ navigate(`/io/${id}/in`);} } >
            IN
          </button>
          <button className='btn btn-primary' onClick={() => navigate(`/${id}`)}>HOME</button>
          <button disabled={timeStatsOut} className='btn btn-primary' onClick={()=>{ navigate(`/io/${id}/out`);}} >
            OUT
          </button>
        </div>
      </div>
      
    </div>
 )
}

export default InOrOut