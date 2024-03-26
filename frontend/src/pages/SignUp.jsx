import { useState } from 'react';
import useSignUp from '../hooks/UseSignUp.js'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
 const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    sport: '',
    sex: '',
    level: '',
 });

 const {signUp} = useSignUp()

 const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
 };

const handleSubmit  = async (e) => {
    e.preventDefault()
    await signUp(formData)
}

 const [isPasswordVisible, setIsPasswordVisible] = useState(false);

 function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-1">
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto bg-white shadow-md rounded-2xl pr-8 pl-8 pt-4 pb-4">
            <h1 className="text-3xl font-bold text-black text-center">SIGN UP</h1>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    placeholder="First Middle Last"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
                    placeholder="Sport"
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="sex" className="block text-gray-700 text-sm font-bold mb-2">Sex</label>
                <select
                    id="sex"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="level" className="block text-gray-700 text-sm font-bold mb-2">Level</label>
                <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                >
                    <option value="">Select</option>
                    <option value="Freshmen">Freshmen</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                </select>
            </div>
            <div className="flex items-center justify-between pb-2 pt-2">
                <Link to='/login'><button className="btn btn-outline hover:text-white hover:bg-blue-500">
                    Log In
                </button></Link>
                <button type='submit' className="btn bg-blue-500 hover:outline hover:bg-white hover:ring-blue-500 hover:text-blue-500 text-white" >
                    Sign Up
                </button>
            </div>
        </form>
    </div>
 );
};

export default SignUpPage;