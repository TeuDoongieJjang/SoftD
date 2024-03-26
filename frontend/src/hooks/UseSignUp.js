import axios from 'axios'
import { useState} from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'

const useSignUp = () => {
    const {setAuthUser} = useAuthContext()
    const navigate = useNavigate()

    const signUp = async ({fullName, password, sport, sex, level}) => {
        const success = handleSucess({fullName, password, sport, sex, level})
        if(!success) { return }

        const data = {fullName, password, sport, sex, level}


        try {
            const res = await axios.post('/signup', data)
            if(res.data.error){
                toast.error(res.data.error)
            } else {
                toast.success('Succesfully Signed Up')
                localStorage.setItem('AuthUser', JSON.stringify(res.data))
                setAuthUser(res.data)
                if(res.data && res.data.id ){
                    navigate(`/io/${res.data.id}`)
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
    return {signUp}
}

export default useSignUp

function handleSucess({fullName, password, sport, sex, level}){
    if(!fullName||!password||!sport||!sex||!level){
        toast.error('Incomplete Information')
        return false
    }
    if(password.length < 6){
        toast.error('Password must be at least 6 Characters')
        return false
    }
    return true
}