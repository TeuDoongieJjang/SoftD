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
        <main className="flex-grow p-1 overflow-scroll">
          <div className='flex flex-col '>
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
              <button onClick={() => filter ? Reset(false) : Reset(true)} className="btn justify-end mt-2 btn-primary text-black bg-yellow-500  hover:bg-gray-800  hover:text-gray-500">FILTER</button>
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
                    <option value="OTHERS">OTHERS</option>
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
                    <div className="bg-white md:p-4 md:px-4 md:pb-4 sm:p-3 sm:px-3 sm:pb-3 rounded-xl shadow-md p-2 px-3 pb-3 mt-4">
                      <h1 className="text-2xl sm:text-3xl md:text:4xl font-bold pt-1 mb-3 text-center text-black">ALL</h1>
                      <div className="rounded-xl border border-white overflow-hidden shadow-md">
                        <table className="bg-gray-800 table-auto border">
                          <thead>
                            <tr>
                              <th className="border sm:text-lg sm:px-3 md:px-4 md:text-xl px-2 py-1 w-fit text-white">NO</th>
                              <th className="border sm:text-lg sm:px-3 md:px-4 md:text-xl px-2 py-1 w-full text-white">NAME</th>
                              <th className="border sm:text-lg sm:px-3 md:px-4 md:text-xl border-b-gray-800 border-t-white-800 px-2 py-1 w-fit text-white ">STATUS</th>
                              <th className="sm:text-lg sm:px-3 md:px-4 md:text-xl px-2 py-1 w-fit text-white ">EDIT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredSearch.filter(pupil => ((sport === "ALL" ? true : pupil.sport === sport) && (level === "ALL" ? true : pupil.level === level) && (status === "ALL" ? true : pupil.status === status) && (sex === "ALL" ? true : pupil.sex === sex))).map((filteredAll, index) => (
                              <tr key={filteredAll._id} className="text-center">
                                <td className="border p-1 sm:text-lg sm:p-3 md:p-4 md:text-xl text-white">{index + 1}</td>
                                <td className="border p-1 sm:text-base sm:p-2 md:p-3 md:text-lg text-sm text-white">{filteredAll.fullName}</td>
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
                    </div>
                    :
                    <>
                      <div className="bg-white md:p-4 md:px-4 md:pb-4 sm:p-3 sm:px-3 sm:pb-3 rounded-xl shadow-md p-2 px-3 pb-3 mt-4">
                        <h1 className="text-2xl sm:text-3xl md:text:4xl font-bold pt-1 mb-3 text-center text-black">ALL</h1>
                        <div className="rounded-xl border border-white overflow-hidden shadow-md">
                          <table className="bg-gray-800 table-auto border">
                            <thead>
                              <tr>
                                <th className="border sm:text-lg sm:px-3 md:px-4 md:text-xl px-2 py-1 w-fit text-white">NO</th>
                                <th className="border sm:text-lg sm:px-3 md:px-4 md:text-xl px-2 py-1 w-full text-white">NAME</th>
                                <th className="border sm:text-lg sm:px-3 md:px-4 md:text-xl border-b-gray-800 px-2 py-1 w-fit text-white">STATUS</th>
                                <th className="sm:text-lg sm:px-3 md:px-4 md:text-xl px-2 py-1 w-fit text-white">EDIT</th>
                              </tr>
                            </thead>
                            <tbody>
                              {students.filter(pupil => ((sport === "ALL" ? true : pupil.sport === sport) && (level === "ALL" ? true : pupil.level === level) && (status === "ALL" ? true : pupil.status === status) && (sex === "ALL" ? true : pupil.sex === sex))).map((filteredPupil, index) => (
                                <tr key={filteredPupil._id} className="text-center">
                                  <td className="border p-1 sm:text-lg sm:p-3 md:p-4 md:text-xl text-white">{index + 1}</td>
                                  <td className="border p-1 sm:text-base sm:p-2 md:p-3 md:text-lg text-sm text-white">{filteredPupil.fullName}</td>
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
                      </div>
                    </>}
                </>
                :
                <>
                  <div className="flex flex-row gap-1">
                    {!males.length ? <></> : <>
                      <div className="bg-white md:p-2 md:px-3 md:pb-3 sm:p-2 sm:px-2 sm:pb-2 flex flex-col flex-grow rounded-xl h-fit shadow-md p-1 px-1 pb-1 mt-3">
                        <h1 className="text-2xl font-bold pt-2 mb-3 text-center text-black">MALE</h1>
                        <div className="rounded-xl border border-white overflow-hidden shadow-md">
                          <table className="bg-gray-800 table-auto border">
                            <thead>
                              <tr>
                                <th className="border sm:text-base sm:px-2 md:px-2 md:text-lg px-1 py-1 text-sm w-fit text-white">NO</th>
                                <th className="border sm:text-base sm:px-2 md:px-2 md:text-lg px-1 py-1 text-sm w-full text-white">NAME</th>
                                <th className="border sm:text-base sm:px-2 md:px-2 md:text-lg border-b-gray-800 px-1 py-1 text-sm w-fit text-white">STATUS</th>
                                <th className="px-1 sm:text-base sm:px-2 md:px-2 md:text-lg py-1 text-sm w-fit text-white">EDIT</th>
                              </tr>
                            </thead>
                            <tbody>
                              {males.map((male, index) => (
                                <tr key={male._id} className="text-center">
                                  <td className="border p-1 sm:text-base sm:p-2 md:p-2 md:text-lg text-sm  text-white">{index + 1}</td>
                                  <td className="border p-1 sm:text-base sm:p-2 md:p-2 md:text-base text-xs text-white">{male.fullName}</td>
                                  <td>
                                    <button onClick={() => navigate(`/api/view/${male._id}`)} className="btn btn-primary font-bold h-10 min-h-10 px-3 md:px-4 text-xs sm:text-sm md:text-base lg:text-lg text-black bg-yellow-500 hover:bg-gray-800 hover:text-gray-500">
                                      {male.status}
                                    </button>
                                  </td>
                                  <td>
                                    <button onClick={() => navigate(`/api/delete/${male._id}`)} className="btn btn-primary font-bold h-10 min-h-10 px-3 md:px-4 text-xs sm:text-sm md:text-base lg:text-lg text-black bg-yellow-500 hover:bg-gray-800 hover:text-gray-500">
                                      DELETE
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>}
                    {!females.length ? <div></div> : <>
                      <div className="bg-white md:p-2 md:px-3 md:pb-3 sm:p-2 sm:px-2 sm:pb-2 flex flex-col flex-grow rounded-xl h-fit shadow-md p-1 px-1 pb-1 mt-3 mr-1">
                        <h1 className="text-2xl font-bold pt-2 mb-3 text-center text-black">FEMALE</h1>
                        <div className="rounded-xl border border-white overflow-hidden shadow-md">
                          <table className="bg-gray-800 table-auto border">
                            <thead>
                              <tr>
                                <th className="border sm:text-base sm:px-2 md:px-2 md:text-lg px-1 py-1 text-sm w-fit text-white ">NO</th>
                                <th className="border sm:text-base sm:px-2 md:px-2 md:text-lg px-1 py-1 text-sm w-full text-white ">NAME</th>
                                <th className="border sm:text-base sm:px-2 md:px-2 md:text-lg px-1 py-1 text-sm w-fit text-white border-b-gray-800 ">STATUS</th>
                                <th className="px-1 sm:text-base sm:px-2 md:px-2 md:text-lg py-1 text-sm w-fit text-white ">EDIT</th>
                              </tr>
                            </thead>
                            <tbody>
                              {females.map((female, index) => (
                                <tr key={female._id} className="text-center">
                                  <td className="border p-1 sm:text-base sm:p-2 md:p-2 md:text-lg text-sm text-white">{index + 1}</td>
                                  <td className="border p-1 sm:text-base sm:p-2 md:p-2 md:text-base text-xs text-white">{female.fullName}</td>
                                  <td>
                                    <button onClick={() => navigate(`/api/view/${female._id}`)} className="btn btn-primary font-bold h-10 min-h-10 px-3 md:px-4 text-xs sm:text-sm md:text-base lg:text-lg text-black bg-yellow-500 hover:bg-gray-800 hover:text-gray-500">
                                      {female.status}
                                    </button>
                                  </td>
                                  <td>
                                    <button onClick={() => navigate(`/api/delete/${female._id}`)} className="btn btn-primary font-bold h-10 min-h-10 px-3 md:px-4 text-xs sm:text-sm md:text-base lg:text-lg text-black bg-yellow-500 hover:bg-gray-800 hover:text-gray-500">
                                      DELETE
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
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
                    <div className="bg-white md:p-4 md:px-4 md:pb-4 sm:p-3 sm:px-3 sm:pb-3 rounded-xl shadow-md p-2 px-3 pb-3 mt-4">
                      <h1 className="text-2xl font-bold pt-1 mb-3 sm:text-3xl md:text:4xl text-center text-black">ALL</h1>
                      <div className="rounded-xl border border-white overflow-hidden shadow-md">
                        <table className="bg-gray-800 table-auto border">
                          <thead>
                            <tr>
                              <th className="border sm:text-lg sm:px-3 md:px-4 md:text-xl px-2 py-1 w-fit text-white">NO</th>
                              <th className="border sm:text-lg sm:px-3 md:px-4 md:text-xl px-2 py-1 w-full text-white">NAME</th>
                              <th className="border sm:text-lg sm:px-3 md:px-4 md:text-xl border-b-gray-800 px-2 py-1 w-fit text-white">STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredSearch.filter(pupil => ((sport === "ALL" ? true : pupil.sport === sport) && (level === "ALL" ? true : pupil.level === level) && (status === "ALL" ? true : pupil.status === status) && (sex === "ALL" ? true : pupil.sex === sex))).map((filteredAll, index) => (
                              <tr key={filteredAll._id} className="text-center">
                                <td className="border sm:text-lg sm:p-3 md:p-4 md:text-xl p-1 text-white">{index + 1}</td>
                                <td className="border sm:text-base sm:p-2 md:p-3 md:text-lg p-1 text-sm text-white">{filteredAll.fullName}</td>
                                <td >
                                  <button onClick={() => navigate(`/api/view/${filteredAll._id}`)} className="btn btn-primary  bg-yellow-500 text-black hover:bg-gray-800 hover:text-gray-500">
                                    {filteredAll.status}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    :
                    <>
                      <div className="bg-white md:p-4 md:px-4 md:pb-4 sm:p-3 sm:px-3 sm:pb-3 rounded-xl shadow-md p-2 px-3 pb-3 mt-4">
                        <h1 className="text-2xl mb-3 sm:text-3xl md:text:4xl font-bold pt-1 text-center text-black">ALL</h1>
                        <div className="rounded-xl border border-white overflow-hidden shadow-md">
                          <table className="bg-gray-800 table-auto border ">
                            <thead>
                              <tr>
                                <th className="border sm:text-lg sm:px-3 md:px-4 md:text-xl px-2 py-1 w-fit text-white">NO</th>
                                <th className="border sm:text-lg sm:px-3 md:px-4 md:text-xl px-2 py-1 w-full text-white">NAME</th>
                                <th className="border sm:text-lg sm:px-3 md:px-4 md:text-xl border-b-gray-800 px-2 py-1 w-fit text-white">STATUS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {students.filter(pupil => ((sport === "ALL" ? true : pupil.sport === sport) && (level === "ALL" ? true : pupil.level === level) && (status === "ALL" ? true : pupil.status === status) && (sex === "ALL" ? true : pupil.sex === sex))).map((filteredPupil, index) => (
                                <tr key={filteredPupil._id} className="text-center">
                                  <td className="border p-1 sm:text-lg sm:p-3 md:p-4 md:text-xl text-white">{index + 1}</td>
                                  <td className="border p-1 sm:text-base sm:p-2 md:p-3 md:text-lg text-sm text-white">{filteredPupil.fullName}</td>
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
                      </div>
                    </>}
                </>
                :
                <>
                  <div className="flex flex-row pt-1 gap-1">
                    {!males.length ? <div></div> : <>
                      <div className="bg-white md:p-2 md:px-3 md:pb-3 sm:p-2 sm:px-2 sm:pb-2 flex flex-col flex-grow rounded-xl h-fit shadow-md p-1 px-1 pb-1 mt-3">
                        <h1 className="text-2xl font-bold pt-2 mb-3 text-center text-black">MALE</h1>
                        <div className="rounded-xl border border-white overflow-hidden shadow-md">
                          <table className="bg-gray-800 table-auto border">
                            <thead>
                              <tr>
                                <th className="border sm:text-base sm:px-2 md:px-2 md:text-lg px-1 text-sm py-1 w-fit text-white">NO</th>
                                <th className="border sm:text-base sm:px-2 md:px-2 md:text-lg px-1 text-sm py-1 w-full text-white">NAME</th>
                                <th className="border sm:text-base sm:px-2 md:px-2 md:text-lg text-sm border-b-gray-800 px-1 py-1 w-fit text-white">STATUS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {males.map((male, index) => (
                                <tr key={male._id} className="text-center">
                                  <td className="border sm:text-base sm:p-2 md:p-2 md:text-lg p-1 text-sm text-white">{index + 1}</td>
                                  <td className="border sm:text-sm sm:p-2 md:p-2 md:text-base p-1 text-xs text-white">{male.fullName}</td>
                                  <td>
                                    <button onClick={() => navigate(`/api/view/${male._id}`)} className="btn btn-primary font-bold h-10 min-h-10 px-3 md:px-4 text-xs sm:text-sm md:text-base lg:text-lg text-black bg-yellow-500 hover:bg-gray-800 hover:text-gray-500">
                                      {male.status}
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>}
                    {!females.length ? <div></div> : <>
                      <div className="bg-white md:p-2 md:px-3 md:pb-3 sm:p-2 sm:px-2 sm:pb-2 flex flex-col flex-grow rounded-xl h-fit shadow-md mt-3 p-1 px-1 pb-1 ">
                        <h1 className="text-2xl font-bold pt-2 mb-3 text-center text-black">FEMALE</h1>
                        <div className="rounded-xl border border-white overflow-hidden shadow-md">
                          <table className="bg-gray-800 table-auto border">
                            <thead>
                              <tr>
                                <th className="border sm:text-base sm:px-2 md:px-2 md:text-lg px-1 text-sm py-1 w-fit text-white">NO</th>
                                <th className="border sm:text-base sm:px-2 md:px-2 md:text-lg px-1 text-sm py-1 w-full text-white">NAME</th>
                                <th className="border sm:text-base sm:px-2 md:px-2 md:text-lg text-sm border-b-gray-800 px-1 py-1 w-fit text-white">STATUS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {females.map((female, index) => (
                                <tr key={female._id} className="text-center">
                                  <td className="border sm:text-base sm:p-2 md:p-2 md:text-lg p-1 text-sm text-white">{index + 1}</td>
                                  <td className="border sm:text-base sm:p-2 md:p-2 md:text-base p-1 text-xs text-white">{female.fullName}</td>
                                  <td>
                                    <button onClick={() => navigate(`/api/view/${female._id}`)} className="btn btn-primary font-bold h-10 min-h-10 px-3 md:px-4 text-xs sm:text-sm md:text-base lg:text-lg text-black bg-yellow-500 hover:bg-gray-800 hover:text-gray-500">
                                      {female.status}
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>}
                  </div>
                </>}
            </>
          }
        </main>
        <footer className="bg-white text-center py-2 rounded-t-xl">
          <label className='text-xl text'>BY RTU/CEIT-03-402P</label>
        </footer>
      </>
      }
    </div>
  )
}

export default Home