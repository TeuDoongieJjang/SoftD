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
  const [students, setStudents] = useState([])
  const [filteredSearch, setFilteredSearch] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [email, setEmail] = useState('')

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
        setStudents(res.data.Student)
        setEmail(res.data.email)
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

  const Reset = (choice) => {
    setSearchInput(''); setSport("ALL"); setLevel("ALL"); setSex("ALL"); setStatus("ALL"); setFilter(choice)
  }


  return (

    <div className="bg-gray-800 flex flex-col min-h-screen">
      {loading ? <div></div> : <>
        <header className="bg-blue-500 rounded-b-xl text-white pl-4 pr-4 pt-3 pb-3 sticky top-0 z-50">
          <div className='text-center'>
            <label className="text-3xl font-bold">STUDENT MONITORING</label>
          </div>
          <div className="flex items-center justify-between pt-3">
            <button className="btn btn-primary text-black bg-yellow-500  hover:bg-blue-500  hover:text-gray-500" onClick={logout}>LOG OUT</button>
            <button className="btn btn-primary text-black bg-yellow-500 hover:bg-blue-500  hover:text-gray-500" onClick={() => { navigate(`/api/io/${authUser.id}`) }}>IN || OUT</button>
            <button className="btn btn-primary text-black bg-yellow-500 hover:bg-blue-500  hover:text-gray-500" onClick={() => { navigate(`/api/user/edit/${authUser.id}`) }}>EDIT</button>
          </div>
        </header>
        <main className="flex-grow p-4 ">
          <div className='flex flex-col'>
            <div className='flex justify-between'>
              {filter ? <div></div> : <>
                <input
                  type="text"
                  className='font-bold  form-control bg-white text-gray-500 text-base px-2 py-1 input input-bordered w-fit max-w-xs'
                  placeholder='SEARCH'
                  value={searchInput}
                  onChange={(e) => {
                    const upperCaseValue = e.target.value.toUpperCase();
                    setSearchInput(upperCaseValue);
                    setFilteredSearch(students.filter(pupil => pupil.fullName.includes(upperCaseValue)));
                  }}
                />
              </>}
              <button onClick={() => filter ? Reset(false) : Reset(true)} className="btn btn-primary text-black bg-yellow-500  hover:bg-gray-800  hover:text-gray-500">FILTER</button>
            </div>
            {filter ? <div></div> : <>
              <div className='flex items-center bg-white justify-around pt-2 shadow-md rounded-xl p-2'>
                <div >
                  <label htmlFor="sport" className="flex text-gray-500 text-xs font-bold mb-1">SPORT</label>
                  <select
                    id="sport"
                    name="sport"
                    value={sport}
                    onChange={(e) => { setSport(e.target.value) }}
                    className="bg-gray-800 text-white text-base px-2 py-1 input input-bordered w-fit max-w-xs"
                  >
                    <option value="ALL">ALL</option>
                    <option value="BASKETBALL">BASKETBALL</option>
                    <option value="VOLLEYBALL">VOLLEYBALL</option>
                    <option value="FOOTBALL">FOOTBALL</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="level" className="flex text-gray-500  text-xs font-bold mb-1">LEVEL</label>
                  <select
                    id="level"
                    name="level"
                    value={level}
                    onChange={(e) => { setLevel(e.target.value) }}
                    className="bg-gray-800 text-white text-base input px-2 py-1 input-bordered w-fit max-w-xs"
                  >
                    <option value="ALL">ALL</option>
                    <option value="FRESHMEN">FRESHMEN</option>
                    <option value="SOPHOMORE">SOPHOMORE</option>
                    <option value="JUNIOR">JUNIOR</option>
                    <option value="SENIOR">SENIOR</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sex" className="block text-gray-500 text-xs font-bold mb-1">SEX</label>
                  <select
                    id="sex"
                    name="sex"
                    value={sex}
                    onChange={(e) => { setSex(e.target.value) }}
                    className="bg-gray-800 text-white text-base input px-2 py-1 input-bordered w-fit max-w-xs"
                  >
                    <option value="ALL">ALL</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="status" className="block text-gray-500 text-xs font-bold mb-1">STATUS</label>
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => { setStatus(e.target.value) }}
                    className="bg-gray-800 text-white text-base input px-2 py-1 input-bordered w-fit max-w-xs"
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
          {email === '2022-111922@rtu.edu.ph' ||
           email === '2022-103284@rtu.edu.ph' ||
           email === '2022-103137@rtu.edu.ph' ||
           email === '2021-109061@rtu.edu.ph' ||
           email === '2022-103325@rtu.edu.ph' ?
            <>
              {!filter ?
                <>
                  {searchInput ?
                    <div>
                      <h1 className="text-2xl font-bold pt-2 mb-4 text-center text-white">ALL</h1>
                      <table className="table-auto">
                        <thead>
                          <tr>
                            <th className="border px-2 py-1 w-fit text-white">NO</th>
                            <th className="border px-2 py-1 w-full text-white">NAME</th>
                            <th className="border px-2 py-1 w-fit text-white">STATUS</th>
                            <th className="border px-2 py-1 w-fit text-white">EDIT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSearch.filter(pupil => ((sport === "ALL" ? true : pupil.sport === sport) && (level === "ALL" ? true : pupil.level === level) && (status === "ALL" ? true : pupil.status === status) && (sex === "ALL" ? true : pupil.sex === sex))).map((filteredAll, index) => (
                            <tr key={filteredAll._id} className="text-center">
                              <td className="border p-1 text-white">{index + 1}</td>
                              <td className="border p-1 text-white">{filteredAll.fullName}</td>
                              <td >
                                <button onClick={() => navigate(`/api/view/${filteredAll._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                  {filteredAll.status}
                                </button>
                              </td>
                              <td >
                                <button onClick={() => navigate(`/api/delete/${filteredAll._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                  DELETE
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    :
                    <>
                      <div>
                        <h1 className="text-2xl font-bold pt-2 mb-4 text-center text-white">ALL</h1>
                        <table className="table-auto">
                          <thead>
                            <tr>
                              <th className="border px-2 py-1 w-fit text-white">NO</th>
                              <th className="border px-2 py-1 w-full text-white">NAME</th>
                              <th className="border px-2 py-1 w-fit text-white">STATUS</th>
                              <th className="border px-2 py-1 w-fit text-white">EDIT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {students.filter(pupil => ((sport === "ALL" ? true : pupil.sport === sport) && (level === "ALL" ? true : pupil.level === level) && (status === "ALL" ? true : pupil.status === status) && (sex === "ALL" ? true : pupil.sex === sex))).map((filteredPupil, index) => (
                              <tr key={filteredPupil._id} className="text-center">
                                <td className="border p-1 text-white">{index + 1}</td>
                                <td className="border p-1 text-white">{filteredPupil.fullName}</td>
                                <td >
                                  <button onClick={() => navigate(`/api/view/${filteredPupil._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                    {filteredPupil.status}
                                  </button>
                                </td>
                                <td >
                                  <button onClick={() => navigate(`/api/delete/${students._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                    DELETE
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>}
                </>
                :
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 pt-2 gap-4">
                  {!males.length ? <></> : <>
                    <div>
                      <h1 className="text-2xl font-bold mb-4 text-center text-white">MALE</h1>
                      <table className="table-auto">
                        <thead>
                          <tr>
                            <th className="border px-2 py-1 w-fit text-white">NO</th>
                            <th className="border px-2 py-1 w-full text-white">NAME</th>
                            <th className="border px-2 py-1 w-fit text-white">STATUS</th>
                            <th className="border px-2 py-1 w-fit text-white">EDIT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {males.map((male, index) => (
                            <tr key={male._id} className="text-center">
                              <td className="border p-1 text-white">{index + 1}</td>
                              <td className="border p-1 text-white">{male.fullName}</td>
                              <td>
                                <button onClick={() => navigate(`/api/view/${male._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                  {male.status}
                                </button>

                              </td>
                              <td>
                                <button onClick={() => navigate(`/api/delete/${male._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                  DELETE
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    </>}
                    {console.log(females)}
                    {!females.length ? <div></div> : <>
                    <div>
                      <h1 className="text-2xl font-bold mb-4 text-center text-white">FEMALE</h1>
                      <table className="table-auto ">
                        <thead>
                          <tr>
                            <th className="border px-2 py-1 w-fit text-white">NO</th>
                            <th className="border px-2 py-1 w-full text-white">NAME</th>
                            <th className="border px-2 py-1 w-fit text-white">STATUS</th>
                            <th className="border px-2 py-1 w-fit text-white">EDIT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {females.map((female, index) => (
                            <tr key={female._id} className="text-center">
                              <td className="border p-1 text-white">{index + 1}</td>
                              <td className="border p-1 text-white">{female.fullName}</td>
                              <td>
                                <button onClick={() => navigate(`/api/view/${female._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                  {female.status}
                                </button>

                              </td>
                              <td>
                                <button onClick={() => navigate(`/api/delete/${female._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                  DELETE
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    </>}
                  </div>
                </>}
            </>
            :
            <>
              {!filter ?
                <>
                  {searchInput ?
                    <div>
                      <h1 className="text-2xl font-bold pt-2 mb-4 text-center text-white">ALL</h1>
                      <table className="table-auto">
                        <thead>
                          <tr>
                            <th className="border px-2 py-1 w-fit text-white">NO</th>
                            <th className="border px-2 py-1 w-full text-white">NAME</th>
                            <th className="border px-2 py-1 w-fit text-white">STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSearch.filter(pupil => ((sport === "ALL" ? true : pupil.sport === sport) && (level === "ALL" ? true : pupil.level === level) && (status === "ALL" ? true : pupil.status === status) && (sex === "ALL" ? true : pupil.sex === sex))).map((filteredAll, index) => (
                            <tr key={filteredAll._id} className="text-center">
                              <td className="border p-1 text-white">{index + 1}</td>
                              <td className="border p-1 text-white">{filteredAll.fullName}</td>
                              <td >
                                <button onClick={() => navigate(`/api/view/${filteredAll._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                  {filteredAll.status}
                                </button>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    :
                    <>
                      <div>
                        <h1 className="text-2xl font-bold pt-2 mb-4 text-center text-white">ALL</h1>
                        <table className="table-auto ">
                          <thead>
                            <tr>
                              <th className="border px-2 py-1 w-fit text-white">NO</th>
                              <th className="border px-2 py-1 w-full text-white">NAME</th>
                              <th className="border px-2 py-1 w-fit text-white">STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {students.filter(pupil => ((sport === "ALL" ? true : pupil.sport === sport) && (level === "ALL" ? true : pupil.level === level) && (status === "ALL" ? true : pupil.status === status) && (sex === "ALL" ? true : pupil.sex === sex))).map((filteredPupil, index) => (
                              <tr key={filteredPupil._id} className="text-center">
                                <td className="border p-1 text-white">{index + 1}</td>
                                <td className="border p-1 text-white">{filteredPupil.fullName}</td>
                                <td >
                                  <button onClick={() => navigate(`/api/view/${filteredPupil._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                    {filteredPupil.status}
                                  </button>
                                </td>

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>}
                </>
                :
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 pt-2 gap-4">
                  {!males.length ? <div></div> : <>
                    <div>
                      <h1 className="text-2xl font-bold mb-4 text-center text-white">MALE</h1>
                      <table className="table-auto ">
                        <thead>
                          <tr>
                            <th className="border px-2 py-1 w-fit text-white">NO</th>
                            <th className="border px-2 py-1 w-full text-white">NAME</th>
                            <th className="border px-2 py-1 w-fit text-white">STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {males.map((male, index) => (
                            <tr key={male._id} className="text-center">
                              <td className="border p-1 text-white">{index + 1}</td>
                              <td className="border p-1 text-white">{male.fullName}</td>
                              <td>
                                <button onClick={() => navigate(`/api/view/${male._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                  {male.status}
                                </button>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    </>}
                    {!females.length ? <div></div> : <>
                    <div>
                      <h1 className="text-2xl font-bold mb-4 text-center text-white">FEMALE</h1>
                      <table className="table-auto">
                        <thead>
                          <tr>
                            <th className="border px-2 py-1 w-fit text-white">NO</th>
                            <th className="border px-2 py-1 w-full text-white">NAME</th>
                            <th className="border px-2 py-1 w-fit text-white">STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {females.map((female, index) => (
                            <tr key={female._id} className="text-center">
                              <td className="border p-1 text-white">{index + 1}</td>
                              <td className="border p-1 text-white">{female.fullName}</td>
                              <td>
                                <button onClick={() => navigate(`/api/view/${female._id}`)} className="btn btn-primary bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                  {female.status}
                                </button>

                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    </>}
                  </div>
                </>}
            </>
          }
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