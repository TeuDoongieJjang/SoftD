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
        const res = await axios.get(`/api/view/${id}`)
        if (!res.data) {
          toast.error(res.data.error)
          navigate('/api/login')
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
          if (res.data.studentData && res.data.studentTimeIn && res.data.studentTimeOut) {
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
          navigate('/api/login')
          setLoading(false)
        } else {
          toast.error('An error occurred. Please try again.')
          navigate('/api/login')
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

  }, [id, navigate])

  return (

    <div className="bg-gray-800 flex flex-col min-h-screen">
      {loading ? <div></div> : <>
        <header className="bg-blue-500 rounded-b-xl text-white pl-4 pr-4 pt-3 pb-3 sticky top-0 z-50">
          <div>
            <div className='pb-2 text-center'><span className="text-2xl text-center font-bold">{name}</span></div>
            <div className="flex justify-between">
              <button className="btn btn-primary text-black bg-yellow-500  hover:bg-blue-500  hover:text-white" onClick={logout}>LOG OUT</button>
              <button className="btn btn-primary text-black bg-yellow-500  hover:bg-blue-500  hover:text-white" onClick={() => { navigate(`/api/${authUser.id}`) }}>HOME</button>
            </div>
          </div>
        </header>
        <main className="p-4 flex-grow">
          <div >
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-2xl pr-8 pl-8 pt-4 pb-4 ">
              <span className='block mb-2 text-2xl text-center text-black font-bold'>INFORMATION</span>
              <div>
                <label className='text-gray-500 text-sm font-bold'>EMAIL</label>
                <span className="bg-gray-800 block mb-2 input input-bordered pt-1 pb-1 text-center text-lg text-white  h-fit"> {email}</span>
              </div>
              <div>
                <label className='text-gray-500 text-sm font-bold'>LEVEL</label>
                <span className="bg-gray-800 block mb-2 input input-bordered pt-1 pb-1 text-center text-lg text-white  h-fit"> {level}</span>
              </div>
              <div>
                <label className='text-gray-500 text-sm font-bold'>SPORT</label>
                <span className="bg-gray-800 block mb-2 input input-bordered pt-1 pb-1 text-center text-lg text-white  h-fit"> {sport}</span>
              </div>
              <div>
                <label className='text-gray-500 text-sm font-bold'>SEX</label>
                <span className="bg-gray-800 block mb-2 input input-bordered pt-1 pb-1 text-center text-lg text-white  h-fit"> {sex}</span>
              </div>
              <div>
                <label className='text-gray-500 text-sm font-bold'>BIRTHDATE</label>
                <span className="bg-gray-800 block mb-2 input input-bordered pt-1 pb-1 text-center text-lg text-white  h-fit"> {birthdate}</span>
              </div>
            </div>
            <div className="flex flex-row pt-4 gap-4">
              {!timeIn.length ? <></> : <>
                <div className="flex flex-col flex-grow mb-1 md:mb-4 p-3 h-fit rounded-xl border bg-white border-white shadow-md">
                  <h1 className="text-2xl sm:text-3xl font-bold pt-1 mb-4 text-center text-black">TIME IN</h1>
                  <div className="rounded-xl border border-white overflow-hidden shadow-md">
                    <table className="bg-gray-800 table-auto border w-full">
                      <thead>
                        <tr>
                          <th className="border sm:text-lg md:tex-xl px-2 py-1 w-fit text-white">NO</th>
                          <th className="border sm:text-lg md:text-xl px-2 py-1 w-full text-white">DATE TIME</th>
                        </tr>
                      </thead>
                      <tbody>
                        {timeIn.map((time, index) => (
                          <tr key={`time-${index}`} className="text-center">
                            <td className="border sm:text-lg md:text-xl px-2 py-1 text-white">{index + 1}</td>
                            <td className="border text-sm sm:text-base md:text-lg px-2 py-1 text-white">{time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>}
              {!timeOut.length ? <></> : <>
                <div className="flex flex-col flex-grow mb-4 p-3 h-fit rounded-xl border bg-white border-white shadow-md">
                  <h1 className="text-2xl sm:text-3xl font-bold pt-1 mb-4 text-center text-black">TIME OUT</h1>
                  <div className="rounded-xl border border-white overflow-hidden shadow-md">
                    <table className="bg-gray-800 table-auto border w-full">
                      <thead>
                        <tr>
                          <th className="border sm:text-lg md:tex-xl px-2 py-1 w-fit text-white">NO</th>
                          <th className="border sm:text-lg md:tex-xl px-2 py-1 w-full text-white">DATE TIME</th>
                        </tr>
                      </thead>
                      <tbody>
                        {timeOut.map((time, index) => (
                          <tr key={`time-${index}`} className="text-center">
                            <td className="border sm:text-lg md:text-xl px-2 py-1 text-white">{index + 1}</td>
                            <td className="border sm:text-base md:text-lg text-sm px-2 py-1 text-white">{time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>}
            </div>
          </div>
        </main>
        <footer className="bg-white text-center rounded-t-xl py-2">
          <label className='text-xl text'>BY RTU/CEIT-03-402P</label>
        </footer>
      </>}
    </div>
  );
}

export default View