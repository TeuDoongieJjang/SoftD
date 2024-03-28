import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogOut = () => {
    
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.get("/api/logout");
      if (res.error) {
        toast.error(res.error);
        navigate('/api/login')
      } else {
        toast.success("Succesfully Logged Out");
        localStorage.removeItem("AuthUser");
        setAuthUser(null);
        navigate("/api/login");
      }
    } catch (error) {
      toast.error(error.message);
      navigate('/api/login')
    }
  };
  return { logout };
};

export default useLogOut;
