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

  if (authUser.id !== id) { navigate(`/api/${authUser.id}`) }

  const [loading, setLoading] = useState(true)
  const [males, setMales] = useState([])
  const [females, setFemales] = useState([])
  const { logout } = useLogOut()
  const [sport, setSport] = useState('ALL')
  const [level, setLevel] = useState('ALL')
  const [sex, setSex] = useState('ALL')
  const [status, setStatus] = useState('ALL')
  const [filter, setFilter] = useState(true)

  useEffect(() => {

    const showStudent = async () => {
      try {
        const res = await axios.get(`/api/${authUser.id}`)
        if (res.data.error) {
          toast.error(res.data.error)
          navigate('/api/login')
        }
        setMales(res.data.Male)
        setFemales(res.data.Female)
        setLoading(false)
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
          navigate('/api/login')
        } else {
          toast.error('An error occurred. Please try again.');
          navigate('/api/login')
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
          <div className="flex items-center justify-around pt-3">
            <button className="btn btn-primary text-black bg-yellow-500  hover:bg-blue-500  hover:text-gray-500" onClick={logout}>LOG OUT</button>
            <button className="btn btn-primary text-black bg-yellow-500 hover:bg-blue-500  hover:text-gray-500" onClick={() => { navigate(`/api/io/${authUser.id}`) }}>IN || OUT</button>
            <button className="btn btn-primary text-black bg-yellow-500 hover:bg-blue-500  hover:text-gray-500" onClick={() => { navigate(`/api/user/edit/${authUser.id}`) }}>EDIT</button>
          </div>
        </header>
        <main className="flex-grow p-4 ">
          <div className='flex flex-col'>
            <div className='flex justify-between'>
              {filter ? <div></div> : <>
                <button onClick={() => { setSport("ALL"); setLevel("ALL"); setSex("ALL"); setStatus("ALL") }} className=" btn btn-primary text-black bg-yellow-500  hover:bg-gray-800  hover:text-gray-500">RESET</button>
              </>}
              <button onClick={() => filter ? setFilter(false) : setFilter(true)} className="btn btn-primary text-black bg-yellow-500  hover:bg-gray-800  hover:text-gray-500">FILTER</button>

            </div>
            {filter ? <div></div> : <>
              <div className='flex items-center bg-white justify-around pt-2 shadow-md rounded-xl p-2'>
                <div >
                  <label htmlFor="sport" className="flex text-gray-500 text-sm font-bold mb-2">SPORT</label>
                  <select
                    id="sport"
                    name="sport"
                    value={sport}
                    onChange={(e) => { setSport(e.target.value) }}
                    className="bg-gray-800 text-white text-base input input-bordered w-fit max-w-fit"
                  >
                    <option value="ALL">ALL</option>
                    <option value="BASKETBALL">BASKETBALL</option>
                    <option value="VOLLEYBALL">VOLLEYBALL</option>
                    <option value="FOOTBALL">FOOTBALL</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="level" className="flex text-gray-500 text-sm font-bold mb-2">LEVEL</label>
                  <select
                    id="level"
                    name="level"
                    value={level}
                    onChange={(e) => { setLevel(e.target.value) }}
                    className="bg-gray-800 text-white text-base input input-bordered w-fit max-w-fit"
                  >
                    <option value="ALL">ALL</option>
                    <option value="FRESHMEN">FRESHMEN</option>
                    <option value="SOPHOMORE">SOPHOMORE</option>
                    <option value="JUNIOR">JUNIOR</option>
                    <option value="SENIOR">SENIOR</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sex" className="block text-gray-500 text-sm font-bold mb-2">SEX</label>
                  <select
                    id="sex"
                    name="sex"
                    value={sex}
                    onChange={(e) => { setSex(e.target.value) }}
                    className="bg-gray-800 text-white text-base input input-bordered w-fit max-w-fit"
                  >
                    <option value="ALL">ALL</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="SIKRET">SIKRET</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="status" className="block text-gray-500 text-sm font-bold mb-2">STATUS</label>
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => { setStatus(e.target.value) }}
                    className="bg-gray-800 text-white text-base input input-bordered w-fit max-w-fit"
                  >
                    <option value="ALL">ALL</option>
                    <option value="IN">IN</option>
                    <option value="OUT">OUT</option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
            </>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 pt-2 gap-4">
            {sex !== "MALE" && sex !== "ALL" ? <div></div> : <>
              <div>
                <h1 className="text-2xl font-bold mb-4  text-white">MALE</h1>
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 text-white">NO</th>
                      <th className="border px-4 py-2 text-white">NAME</th>
                      <th className="border px-4 py-2 text-white">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {males.filter(male => ((sport === "ALL" ? true : male.sport === sport) && (level === "ALL" ? true : male.level === level) && (status === "ALL" ? true : male.status === status))).map((filteredMale, index) => (
                      <tr key={filteredMale._id} className="text-center">
                        <td className="border px-4 py-2 text-white">{index + 1}</td>
                        <td className="border px-4 py-2 text-white">{filteredMale.fullName}</td>
                        <td>
                          <button onClick={() => navigate(`/api/view/${filteredMale._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                            {filteredMale.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>}
            {sex !== "FEMALE" && sex !== "ALL" ? <div></div> : <>
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
                    {females.filter(female => ((sport === "ALL" ? true : female.sport === sport) && (level === "ALL" ? true : female.level === level) && (status === "ALL" ? true : female.status === status))).map((filteredFemale, index) => (
                      <tr key={filteredFemale._id} className="text-center">
                        <td className="border px-4 py-2 text-white">{index + 1}</td>
                        <td className="border px-4 py-2 text-white">{filteredFemale.fullName}</td>
                        <td>
                          <button onClick={() => navigate(`/api/view/${filteredFemale._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                            {filteredFemale.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>}
          </div>

        </main>
        <footer className="bg-gray-200 text-center py-2 rounded-t-xl">
          <label className='text-xl text'>BY RTU/CEIT-03-402P</label>
        </footer>
      </>
      }
    </div>

  )
}

export default Home