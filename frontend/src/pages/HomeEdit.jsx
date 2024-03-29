import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const HomeEdit = () => {
 const { id } = useParams();
 const navigate = useNavigate();
 const { authUser } = useAuthContext();
 
    useEffect(() => {
        const studentDelete = async () => {
            try {
                const res = await axios.delete(`/api/delete/${id}`);
                if (res.data.error) {
                    toast.error(res.data.error);
                    navigate('/api/login')
                } else {
                    navigate(`/api/${authUser.id}`); 
                }
                
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data.error);
                    navigate('/api/login'); 
                } else {
                    toast.error('An error occurred. Please try again.');
                    navigate('/api/login');
                }
            }
        }

        toast.promise(
            studentDelete(),
            {
              loading: 'Loading',
              success: 'Loaded Successfully',
              error: 'Loading Failed',
            },
            {
              duration: 2000,
            }
          );

    }, [id, navigate, authUser.id])

    return null
};

export default HomeEdit
