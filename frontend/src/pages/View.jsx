import toast from 'react-hot-toast'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useLogOut from '../hooks/UseLogOut'
import { useAuthContext } from '../context/AuthContext'

const View = () => {
 const [name, setName] = useState('')
 const [sport, setSport] = useState('')
 const [sex, setSex] = useState('')
 const [level, setLevel] = useState('')
 const [timeIn, setTimeIn] = useState([])
 const [timeOut, setTimeOut] = useState([])
 const {id} = useParams()
 const {logout} = useLogOut()
 const navigate = useNavigate()
 const {authUser} = useAuthContext()

 useEffect(() => {
    const view = async () => {
        try {
            const res = await axios.get(`/view/${id}`)
            console.log(res.data)
            if(res.data && res.data.error){
                toast.error(res.data.error)
            } else {
                if(res.data){
                    setName(res.data.studentData.fullName)
                    setSport(res.data.studentData.sport)
                    setSex(res.data.studentData.sex)
                    setLevel(res.data.studentData.level)
                    setTimeIn(res.data.studentData.studentTimeIn)
                    setTimeOut(res.data.studentData.studentTimeOut)
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
      view(),
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

 return (

   <div className="flex flex-col min-h-screen">
     <header className="bg-blue-500 text-white p-2 sticky top-0 z-50">
       <div>
         <div className='text-center'><span className="text-xl text-center font-bold">{name}</span></div>
         <div className="flex justify-between">
           <button className="btn btn-primary" onClick={logout}>LOG OUT</button>
           <button className="btn btn-primary" onClick={() => {navigate(`/${authUser.id}`)}}>HOME</button>
         </div>
       </div>
     </header>
     <main className="p-4 flex-grow">
       <div >
         <div className="flex flex-row justify-between">
           <span className="block mb-2">SPORT : {sport}</span>
           <span className="block mb-2">SEX : {sex}</span>
           <span className="block mb-2">LEVEL : {level}</span>
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
}

export default View