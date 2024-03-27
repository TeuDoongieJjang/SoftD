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
        email: '',
        birthdate: '',
    });

    const { signUp } = useSignUp()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signUp(formData)
    }

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 p-1">
            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto bg-white shadow-md rounded-2xl pr-8 pl-8 pt-4 pb-4">
                <h1 className="text-3xl pb-3 font-bold text-black text-center">SIGN UP</h1>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">FULL NAME</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="LAST, FIRST MIDDLE"
                        name="fullName"
                        value={formData.fullName.toUpperCase()}
                        onChange={handleChange}
                        className="bg-black input input-bordered w-full max-w-xs"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@rtu.edu.ph"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-black input input-bordered w-full max-w-xs"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        className="bg-black input input-bordered w-full max-w-xs"
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
                <div className="mb-4 flex-row flex justify-between">
                    <div >
                        <label htmlFor="sport" className="flex text-gray-700 text-sm font-bold mb-2">SPORT</label>
                        <select
                            id="sport"
                            name="sport"
                            value={formData.sport}
                            onChange={handleChange}
                            className="bg-black input input-bordered w-full max-w-xs"
                        >
                            <option value="">SELECT</option>
                            <option value="BASKETBALL">BASKETBALL</option>
                            <option value="VOLLEYBALL">VOLLEYBALL</option>
                            <option value="FOOTBALL">FOOTBALL</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="level" className="flex text-gray-700 text-sm font-bold mb-2">LEVEL</label>
                        <select
                            id="level"
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="bg-black input input-bordered w-full max-w-xs"
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
                        <label htmlFor="sex" className="block text-gray-700 text-sm font-bold mb-2">SEX</label>
                        <select
                            id="sex"
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="bg-black input input-bordered w-full max-w-xs"
                        >
                            <option value="">SELECT</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                            <option value="SIKRET">SIKRET</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="birthdate" className="block text-gray-700 text-sm font-bold mb-2">BIRTHDATE</label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            className="bg-black input input-bordered w-full max-w-xs"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between pb-2 pt-2">
                    <Link to='/login'><button className="btn btn-outline hover:text-black hover:bg-yellow-500">
                        LOG IN
                    </button></Link>
                    <button type='submit' className="btn bg-yellow-500 hover:outline hover:bg-white hover:ring-blue-500 hover:text-gray-500 text-black" >
                        SIGN UP
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;