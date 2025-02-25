"use client"
import { useEffect } from 'react';
import axios from 'axios';
import { URL } from '@/utils/constants';
import { useAppDispatch } from '@/lib/hooks';
import { setEmail,setRole } from '@/lib/features/todos/usersDataSlice';

const AuthProvider = ({ children }) => {
  const dispatch = useAppDispatch();

  const verifyUser = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        const response = await axios.post(`${URL}/auth/verify`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.code === 200) {
          return response.data.data;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyUser()
      .then(res => {
        console.log(res);
        
        if (res) {
          dispatch(setEmail(res.email));
          dispatch(setRole(res.role));
        }
      });

  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;