import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import useLogOut from '../hooks/UseLogOut'
import { useAuthContext } from '../context/AuthContext.jsx'

const UserEdit = () => {

 const [timeIn, setTimeIn] = useState([])
 const [timeOut, setTimeOut] = useState([])
 const {id} = useParams()
 const {logout} = useLogOut()
 const navigate = useNavigate()
 const {authUser} = useAuthContext()

 const [fullName, setFullname] = useState('')
 const [password, setPassword] = useState('')
 const [sport, setSport] = useState('')
 const [sex, setSex] = useState('')
 const [level, setLevel] = useState('')

 if(authUser.id !== id) { navigate(`/`) }

 useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/user/edit/${id}`)
        console.log(res.data)
        if(res.data && res.data.error){
          toast.error(res.data.error)
        } else {
          if(res.data){
            setTimeIn(res.data.studentData.studentTimeIn)
            setTimeOut(res.data.studentData.studentTimeOut)
            setFullname(res.data.studentData.fullName)
            setPassword(res.data.studentData.password)
            setSport(res.data.studentData.sport)
            setSex(res.data.studentData.sex)
            setLevel(res.data.studentData.level)
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
      fetchUserData(),
      {
        loading: 'Loading data...',
        success: 'Data loaded successfully',
        error: 'Failed to load data',
      },
      {
        duration: 2000,
      }
   );

 }, [id])

 const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {fullName, password, sport, sex, level}
    try {
      const res = await axios.put(`/user/edit/${id}`, data)
      if(res.data.error){
        toast.error(res.data.error)
      }
      navigate(`/${id}`)
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
  <div className="flex flex-col min-h-screen">
     <header className="bg-blue-500 text-white p-2 sticky top-0 z-50">
       <div>
         <div className='text-center'><span className="text-xl text-center font-bold">{name}</span></div>
         <div className="flex justify-between">
           <button className="btn btn-primary" onClick={logout}>LOG OUT</button>
           <button className="btn btn-primary" onClick={() => {navigate(`/${authUser.id}`)}}>HOME</button>
           <button className="btn btn-primary" onClick={handleSubmit}>SAVE</button>
         </div>
       </div>
     </header>
     <main className="p-4 flex-grow">
       <div >
         <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-2xl pr-8 pl-8 pt-4 pb-4">
         <h1 className="text-3xl font-bold text-black text-center">SIGN UP</h1>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullname(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input type={isPasswordVisible ? "text" : "password"}
                    className="input input-bordered w-full max-w-xs"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            <div className="mb-4">
                <label htmlFor="sport" className="block text-gray-700 text-sm font-bold mb-2">Sport</label>
                <input
                    type="text"
                    id="sport"
                    name="sport"
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="sex" className="block text-gray-700 text-sm font-bold mb-2">Sex</label>
                <select
                    id="sex"
                    name="sex"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                >
                    <option value=''>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="level" className="block text-gray-700 text-sm font-bold mb-2">Level</label>
                <select
                    id="level"
                    name="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                >
                    <option value="">Select</option>
                    <option value="Freshmen">Freshmen</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                </select>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="mb-4">
             <table className="table-auto w-full">
               <thead>
                 <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Time In</th>
                 </tr>
               </thead>
               <tbody>
                 {timeIn.map((time, index) => (
                  <tr key={`time-${index}`} className="text-center">
                     <td className="border px-4 py-2">{index + 1}</td>
                     <td className="border px-4 py-2">{time}</td>
                  </tr>
                 ))}
               </tbody>
             </table>
           </div>
           <div>
             <table className="table-auto w-full">
               <thead>
                 <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Time Out</th>
                 </tr>
               </thead>
               <tbody>
                 {timeOut.map((time, index) => (
                  <tr key={`time-${index}`} className="text-center">
                     <td className="border px-4 py-2">{index + 1}</td>
                     <td className="border px-4 py-2">{time}</td>
                  </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>
     </main>
     <footer className="bg-gray-200 text-center py-4">
       <label>Student Monitoring</label>
     </footer>
  </div>
 );
};

export default UserEdit;