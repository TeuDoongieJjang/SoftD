import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useLogIn } from '../hooks/UseLogIn'

const LogIn = () => {

    const { login } = useLogIn()

    const [formData, setFormData] = useState({
        fullName: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(formData)
    }

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 p-1">
            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto bg-white shadow-md rounded-2xl pr-8 pl-8 pt-4 pb-4">
                <h1 className="text-3xl pt-2 pb-3 font-bold text-black text-center">LOG IN</h1>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">FULL NAME</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="LAST, FIRST MIDDLE"
                        name="fullName"
                        value={formData.fullName.toUpperCase()}
                        onChange={handleChange}
                        className="bg-gray-800 text-white input input-bordered w-full max-w-xs"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        className="bg-gray-800 text-white input input-bordered w-full max-w-xs"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label className=" flex items-center mt-2">
                        <input
                            type="checkbox"
                            className="mr-2 w-4 h-4"
                            checked={isPasswordVisible}
                            onChange={togglePasswordVisibility}
                        />
                        <span className="text-sm text-gray-500">Show password</span>
                    </label>
                </div>

                <div className="flex items-center justify-between pb-2 pt-2">
                    <Link to='/api/signup'><button className="btn btn-outline hover:text-black hover:bg-yellow-500">
                        SIGN UP
                    </button></Link>
                    <button type='submit' className="btn bg-yellow-500 hover:outline hover:bg-white hover:ring-blue-500 hover:text-gray-500 text-black" >
                        LOG IN
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogIn;