import React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import userAxiosPublic from '../../hooks/userAxiosPublic';

const SocialLogin = () => {
    const { googleSignIn } = useAuth()
    const axiosPublic = userAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                // console.log(result.user)
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate(from, { replace: true });
                    })


            })
            .catch(error => {
                console.log('google Login Error', error)
            })
    }

    return (
        <div>
            <div>
                <div className="divider"></div>
                <button onClick={handleGoogleSignIn} className="btn m-2">
                    <FaGoogle className='m-4'></FaGoogle>
                    Button
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;