import { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import useLogOut from '../hooks/UseLogOut'
import { useAuthContext } from '../context/AuthContext.jsx'

const Home = () => {

  const [males, setMales] = useState([])
  const [females, setFemales] = useState([])
  const {logout} = useLogOut()
  const {id} = useParams()
  const navigate = useNavigate()
  const {authUser} = useAuthContext()

  if(authUser.id !== id) { navigate(`/`) }

  useEffect(() => {

    const showStudent = async () => {
      try {
        const res = await axios.get(`/${authUser.id}`)
        if(res.data.error){ 
          toast.error(res.data.error)
        }
        setMales(res.data.Male)
        setFemales(res.data.Female)
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
            toast.error('An error occurred. Please try again.');
        }
      }
    }

    toast.promise(
      showStudent(),
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

       <div className="flex flex-col min-h-screen">
      
      <header className="bg-blue-500 text-white p-2 sticky top-0 z-50">
           <div className='text-center'>
             <span className="text-xl font-bold">Student Monitoring</span>
           </div>
           <div className="flex items-center justify-between">
             <button className="btn btn-primary" onClick={logout}>LOG OUT</button>
             <button className="btn btn-primary" onClick={() => {navigate(`/io/${authUser.id}`)}}>IN || OUT</button>
             <button className="btn btn-primary" onClick={() => {navigate(`/user/edit/${authUser.id}`)}}>EDIT</button>
           </div>
         </header>
         <main className="flex-grow p-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             
             <div>
               <h1 className="text-2xl font-bold mb-4">MALE</h1>
               <table className="table-auto w-full">
                 <thead>
                   <tr>
                     <th className="border px-4 py-2">No</th>
                     <th className="border px-4 py-2">Name</th>
                     <th className="border px-4 py-2">Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {males.map((male, index) => (
                     <tr key={male._id} className="text-center">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{male.fullName}</td>
                      <td >
                        <button onClick={() => {navigate(`/view/${male._id}`)}} className="btn btn-outline hover:text-white hover:bg-blue-500">
                          {male.status}
                        </button>
                      </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
             <div>
               <h1 className="text-2xl font-bold mb-4">FEMALE</h1>
               <table className="table-auto w-full">
                 <thead>
                   <tr>
                     <th className="border px-4 py-2">No</th>
                     <th className="border px-4 py-2">Name</th>
                     <th className="border px-4 py-2">Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {females.map((female, index) => (
                     <tr key={female._id} className="text-center">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{female.fullName}</td>
                      <td >
                        <button onClick={() => {navigate(`/view/${female._id}`)}} className="btn btn-outline hover:text-white hover:bg-blue-500">
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
         <footer className="bg-gray-200 text-center py-4">
           <label>Alright received</label>
           <label>Alright received</label>
           <label>Alright received</label>
         </footer>
      </div> 

   )
}

export default Home