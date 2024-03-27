import toast from 'react-hot-toast'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useLogOut from '../hooks/UseLogOut'
import { useAuthContext } from '../context/AuthContext'

const View = () => {

  const { id } = useParams()
  const { authUser } = useAuthContext()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [sport, setSport] = useState('')
  const [sex, setSex] = useState('')
  const [level, setLevel] = useState('')
  const [email, setEmail] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [timeIn, setTimeIn] = useState([])
  const [timeOut, setTimeOut] = useState([])

  const { logout } = useLogOut()

  useEffect(() => {
    const view = async () => {
      try {
        const res = await axios.get(`/view/${id}`)
        if (!res.data) {
          toast.error(res.data.error)
          setLoading(false)
        } else {
          if (res.data.studentData) {
            setName(res.data.studentData.fullName)
            setSport(res.data.studentData.sport)
            setSex(res.data.studentData.sex)
            setLevel(res.data.studentData.level)
            setEmail(res.data.studentData.email)
            setBirthdate(res.data.studentData.birthdate)
            setLoading(false)
          } 
          if(res.data.studentData && res.data.studentTimeIn && res.data.studentTimeOut ){
            setName(res.data.studentData.fullName)
            setSport(res.data.studentData.sport)
            setSex(res.data.studentData.sex)
            setLevel(res.data.studentData.level)
            setEmail(res.data.studentData.email)
            setBirthdate(res.data.studentData.birthdate)
            setTimeIn(res.data.studentTimeIn)
            setTimeOut(res.data.studentTimeOut)
            setLoading(false)
          } 
        }

      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error)
          setLoading(false)
        } else {
          toast.error('An error occurred. Please try again.')
        }
      }
    }

    toast.promise(
      view(),
      {
        loading: 'Loading',
        success: 'Loaded Successfully',
        error: 'Loading Failed',
      },
      {
        duration: 2000,
      }
    );

  }, [id])

  return (

    <div className="bg-gray-800 flex flex-col min-h-screen">
      {loading ? <div></div> : <>
        <header className="bg-blue-500 rounded-b-xl text-white pl-4 pr-4 pt-3 pb-3 sticky top-0 z-50">
          <div>
            <div className='text-center'><span className="text-xl text-center font-bold">{name}</span></div>
            <div className="flex justify-between">
              <button className="btn btn-primary text-black bg-yellow-500  hover:bg-blue-500  hover:text-white" onClick={logout}>LOG OUT</button>
              <button className="btn btn-primary text-black bg-yellow-500  hover:bg-blue-500  hover:text-white" onClick={() => { navigate(`/${authUser.id}`) }}>HOME</button>
            </div>
          </div>
        </header>
        <main className="p-4 flex-grow">
          <div >
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-2xl pr-8 pl-8 pt-4 pb-4 ">
              <span className='block mb-2 text-2xl text-center text-black font-bold'>INFORMATION</span>
              <div>
                <label className='text-black text-md font-bold'>EMAIL :</label>
                <span className="block mb-2 input input-bordered pt-1 pb-1 text-center text-lg text-white  h-fit"> {email}</span>
              </div>
              <div>
                <label className='text-black text-md font-bold'>LEVEL :</label>
                <span className="block mb-2 input input-bordered pt-1 pb-1 text-center text-lg text-white  h-fit"> {level}</span>
              </div>
              <div>
                <label className='text-black text-md font-bold'>SPORT :</label>
                <span className="block mb-2 input input-bordered pt-1 pb-1 text-center text-lg text-white  h-fit"> {sport}</span>
              </div>
              <div>
                <label className='text-black text-md font-bold'>SEX :</label>
                <span className="block mb-2 input input-bordered pt-1 pb-1 text-center text-lg text-white  h-fit"> {sex}</span>
              </div>
              <div>
                <label className='text-black text-md font-bold'>BIRTHDATE :</label>
                <span className="block mb-2 input input-bordered pt-1 pb-1 text-center text-lg text-white  h-fit"> {birthdate}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 pt-4 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 text-white">NO</th>
                      <th className="border px-4 py-2 text-white">TIME IN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeIn.map((time, index) => (
                      <tr key={`time-${index}`} className="text-center">
                        <td className="border px-4 py-2 text-white">{index + 1}</td>
                        <td className="border px-4 py-2 text-white">{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 text-white">NO</th>
                      <th className="border px-4 py-2 text-white">TIME OUT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeOut.map((time, index) => (
                      <tr key={`time-${index}`} className="text-center">
                        <td className="border px-4 py-2 text-white">{index + 1}</td>
                        <td className="border px-4 py-2 text-white">{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-gray-200 text-center rounded-t-xl py-4">
          <label className='text-3xl text'>BY RTU/CEIT-03-402P</label>
        </footer>
      </>}
    </div>
  );
}

export default View