import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import useLogOut from '../hooks/UseLogOut'
import { useAuthContext } from '../context/AuthContext.jsx'

const UserEdit = () => {

  const { id } = useParams()
  const { authUser } = useAuthContext()
  const navigate = useNavigate()

  if (authUser.id !== id) { navigate(`/user/edit/${authUser.id}`) }

  const [loading, setLoading] = useState(true)
  const [timeIn, setTimeIn] = useState([])
  const [timeOut, setTimeOut] = useState([])

  const { logout } = useLogOut()
  const [fullName, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const [sport, setSport] = useState('')
  const [sex, setSex] = useState('')
  const [level, setLevel] = useState('')
  const [email, setEmail] = useState('')
  const [birthdate, setBirthdate] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/api/user/edit/${id}`)
        console.log(res.data)
        if (!res.data) {
          toast.error(res.data.error)
          navigate('/api/login')
          setLoading(false)
        } else {
          if (res.data.student) {
            setFullname(res.data.student.fullName)
            setPassword(res.data.student.password)
            setSport(res.data.student.sport)
            setSex(res.data.student.sex)
            setLevel(res.data.student.level)
            setEmail(res.data.student.email)
            setBirthdate(res.data.student.birthdate)
            setLoading(false)
          } 
          if(res.data.student && res.data.studentTimeIn && res.data.studentTimeOut){
            setTimeIn(res.data.studentTimeIn)
            setTimeOut(res.data.studentTimeOut)
            setFullname(res.data.student.fullName)
            setPassword(res.data.student.password)
            setSport(res.data.student.sport)
            setSex(res.data.student.sex)
            setLevel(res.data.student.level)
            setEmail(res.data.student.email)
            setBirthdate(res.data.student.birthdate)
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
      fetchUserData(),
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { fullName, password, sport, sex, level, email, birthdate }
    try {
      const res = await axios.put(`/api/user/edit/${id}`, data)
      if (res.data.error) {
        toast.error(res.data.error)
      }
      navigate(`/api/${id}`)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    }
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <div className="bg-gray-800 flex flex-col min-h-screen">
      {loading ? <div></div> : <>
        <header className="bg-blue-500 rounded-b-xl text-white p-4 sticky top-0 z-50">
          <div>
            <div className='text-center'><span className="text-xl text-center font-bold">{name}</span></div>
            <div className="flex justify-between">
              <button className="btn btn-primary text-black bg-yellow-500  hover:bg-blue-500  hover:text-white" onClick={logout}>LOG OUT</button>
              <button className="btn btn-primary text-black bg-yellow-500  hover:bg-blue-500  hover:text-white" onClick={() => { navigate(`/api/${authUser.id}`) }}>HOME</button>
              <button className="btn btn-primary text-black bg-yellow-500  hover:bg-blue-500  hover:text-white" onClick={handleSubmit}>SAVE</button>
            </div>
          </div>
        </header>
        <main className="p-4 flex-grow">
          <div >
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-2xl pr-8 pl-8 pt-4 pb-4">
              <h1 className="text-3xl font-bold text-black text-center">EDIT </h1>
              <div className="mb-4">
                  <label htmlFor="fullName" className="block text-gray-500 text-sm font-bold mb-2">FULL NAME</label>
                  <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={fullName.toUpperCase()}
                      onChange={(e) => {setFullname(e.target.value.toUpperCase())}}
                      className="bg-gray-800 text-white input input-bordered w-full max-w-xs"
                  />
              </div>
              <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-500 text-sm font-bold mb-2">Email</label>
                  <input
                      type="email"
                      id="email"
                      placeholder="example@rtu.edu.ph"
                      name="email"
                      value={email}
                      onChange={(e) => {setEmail(e.target.value)}}
                      className="bg-gray-800 text-white input input-bordered w-full max-w-xs"
                  />
              </div>
              <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-500 text-sm font-bold mb-2">Password</label>
                  <input type={isPasswordVisible ? "text" : "password"}
                      placeholder="Password"
                      className="bg-gray-800 text-white input input-bordered w-full max-w-xs"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => {setPassword(e.target.value)}}
                  />
                  <label className="flex items-center mt-2">
                      <input
                          type="checkbox"
                          className="mr-2 w-4 h-4"
                          checked={isPasswordVisible}
                          onChange={togglePasswordVisibility}
                      />
                      <span className="text-sm text-gray-600">Show password</span>
                  </label>
              </div>
              <div className="mb-4 flex-row flex justify-between">
                    <div >
                        <label htmlFor="sport" className="flex text-gray-500 text-sm font-bold mb-2">SPORT</label>
                        <select
                            id="sport"
                            name="sport"
                            value={sport}
                            onChange={(e) => {setSport(e.target.value)}}
                            className="bg-gray-800 text-white input input-bordered w-full max-w-xs"
                        >
                            <option value="">SELECT</option>
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
                            onChange={(e) => {setLevel(e.target.value)}}
                            className="bg-gray-800 text-white input input-bordered w-full max-w-xs"
                        >
                            <option value="">SELECT</option>
                            <option value="FRESHMEN">FRESHMEN</option>
                            <option value="SOPHOMORE">SOPHOMORE</option>
                            <option value="JUNIOR">JUNIOR</option>
                            <option value="SENIOR">SENIOR</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4 flex-row flex justify-between">
                    <div>
                        <label htmlFor="sex" className="block text-gray-500 text-sm font-bold mb-2">SEX</label>
                        <select
                            id="sex"
                            name="sex"
                            value={sex}
                            onChange={(e) => {setSex(e.target.value)}}
                            className="bg-gray-800 text-white input input-bordered w-full max-w-xs"
                        >
                            <option value="">SELECT</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                            <option value="SIKRET">SIKRET</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="birthdate" className="block text-gray-500 text-sm font-bold mb-2">BIRTHDATE</label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={birthdate}
                            onChange={(e) => {setBirthdate(e.target.value)}}
                            className="bg-gray-800 text-white input input-bordered w-full max-w-xs"
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 pt-4 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 text-white">No</th>
                      <th className="border px-4 py-2 text-white">Time In</th>
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
                      <th className="border px-4 py-2 text-white">No</th>
                      <th className="border px-4 py-2 text-white">Time Out</th>
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
        <footer className="bg-gray-200 rounded-t-xl text-center py-2">
          <label className='text-xl text'>BY RTU/CEIT-03-402P</label>
        </footer>
      </>}
    </div>
  );
};

export default UserEdit;