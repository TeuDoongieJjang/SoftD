import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
    
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const signUp = async ({ fullName, password, sport, sex, level, email, birthdate }) => {
    const success = handleSucess({ fullName, password, sport, sex, level, email, birthdate });
    if (!success) {
      return;
    }

    const data = { fullName, password, sport, sex, level, email, birthdate };

    try {
      const res = await axios.post("/api/signup", data);
      if (res.data.error) {
        toast.error(res.data.error);
        navigate('/api/signup')
      } else {
        toast.success("Succesfully Signed Up");
        localStorage.setItem("AuthUser", JSON.stringify(res.data));
        setAuthUser(res.data);
        if (res.data && res.data.id) {
          navigate(`/api/io/${res.data.id}`);
        } else {
          toast.error("User ID not found in response");
          navigate('/api/signup')
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
        navigate('/api/signup')
      } else {
        toast.error("An error occurred. Please try again.");
        navigate('/api/signup')
      }
    }
  };
  return { signUp };
};

export default useSignUp;

function handleSucess({ fullName, password, sport, sex, level, email, birthdate }) {
  if (!fullName || !password || !sport || !sex || !level || !email || !birthdate) {
    toast.error("Incomplete Information");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 Characters");
    return false;
  }
  return true;
}
