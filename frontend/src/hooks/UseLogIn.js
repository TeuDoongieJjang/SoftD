import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogIn = () => {
    
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({ fullName, password }) => {
    if (!fullName || !password) {
      toast.error("Incomplete Information");
      return false;
    }

    const data = { fullName, password };

    try {
      const res = await axios.post("/api/login", data);
      if (res.data.error) {
        toast.error(res.data.error);
        navigate('/api/login')
      } else {
        toast.success("Successfully Logged In");
        localStorage.setItem("AuthUser", JSON.stringify(res.data));
        setAuthUser(res.data);
        if (res.data) {
          navigate(`/api/io/${res.data.id}`);
        } else {
          toast.error("User ID not found in response");
          navigate('/api/login')
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
        navigate('/api/login')
      } else {
        toast.error("An error occurred. Please try again.");
        navigate('/api/login')
      }
    }
  };

  return { login };
};
