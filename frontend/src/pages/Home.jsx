import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import useLogOut from '../hooks/UseLogOut'
import { useAuthContext } from '../context/AuthContext.jsx'

const Home = () => {

  const { id } = useParams()
  const { authUser } = useAuthContext()
  const navigate = useNavigate()

  if (authUser.id !== id) { navigate(`/${authUser.id}`) }

  const [loading, setLoading] = useState(true)
  const [males, setMales] = useState([])
  const [females, setFemales] = useState([])
  const { logout } = useLogOut()

  useEffect(() => {

    const showStudent = async () => {
      try {
        const res = await axios.get(`/${authUser.id}`)
        if (res.data.error) {
          toast.error(res.data.error)
          navigate('/login')
        }
        setMales(res.data.Male)
        setFemales(res.data.Female)
        setLoading(false)
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
          navigate('/login')
        } else {
          toast.error('An error occurred. Please try again.');
          navigate('/login')
        }
      }
    }

    toast.promise(
      showStudent(),
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

    <div className="bg-gray-800 flex flex-col min-h-screen">
      {loading ? <div></div> : <>
        <header className="bg-blue-500 rounded-b-xl text-white pl-4 pr-4 pt-3 pb-3 sticky top-0 z-50">
          <div className='text-center'>
            <label className="text-3xl font-bold">STUDENT MONITORING</label>
          </div>
          <div className="flex items-center justify-between pt-3">
            <button className="btn btn-primary text-black bg-yellow-500  hover:bg-blue-500  hover:text-white" onClick={logout}>LOG OUT</button>
            <button className="btn btn-primary text-black bg-yellow-500 hover:bg-blue-500  hover:text-white" onClick={() => { navigate(`/io/${authUser.id}`) }}>IN || OUT</button>
            <button className="btn btn-primary text-black bg-yellow-500 hover:bg-blue-500  hover:text-white" onClick={() => { navigate(`/user/edit/${authUser.id}`) }}>EDIT</button>
          </div>
        </header>
        <main className="flex-grow p-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <h1 className="text-2xl font-bold mb-4 text-white">MALE</h1>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-white">NO</th>
                    <th className="border px-4 py-2 text-white">NAME</th>
                    <th className="border px-4 py-2 text-white">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {males.map((male, index) => (
                    <tr key={male._id} className="text-center">
                      <td className="border px-4 py-2 text-white">{index + 1}</td>
                      <td className="border px-4 py-2 text-white">{male.fullName}</td>
                      <td >
                        <button onClick={() => { navigate(`/view/${male._id}`) }} className="btn btn-outline hover:text-black hover:bg-yellow-500 text-white">
                          {male.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-4 text-white">FEMALE</h1>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-white">NO</th>
                    <th className="border px-4 py-2 text-white">NAME</th>
                    <th className="border px-4 py-2 text-white">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {females.map((female, index) => (
                    <tr key={female._id} className="text-center">
                      <td className="border px-4 py-2 text-white">{index + 1}</td>
                      <td className="border px-4 py-2 text-white">{female.fullName}</td>
                      <td >
                        <button onClick={() => { navigate(`/view/${female._id}`) }} className="btn btn-outline hover:text-black hover:bg-yellow-500 text-white">
                          {female.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
        <footer className="bg-gray-200 text-center py-4 rounded-t-xl">
          <label className='text-3xl text'>BY RTU/CEIT-03-402P</label>
        </footer>
      </>
      }
    </div>

  )
}

export default Home