import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const [disable, setDisable] = useState(true)
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    // console.log("STATE In the location for login page: ", from)

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])


    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        // console.log(email, password)

        // firebase signIn
        signIn(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    title: "Thanks for login",
                    showClass: {
                        popup: ` animate__animated animate__fadeInUp animate__faster
                      `
                    },
                    hideClass: {
                        popup: ` animate__animated animate__fadeOutDown animate__faster
                      `
                    }
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log("Log In Error", error)
            })

    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisable(false)
        }
        else {
            setDisable(true)
        }
    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <Helmet><title>bistro boss | Login</title></Helmet>
            <div className="hero-content flex-col md:flex-row-reverse">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full md:w-1/2  shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {/* captcha */}
                        <div className="form-control">
                            <label className="label">
                                < LoadCanvasTemplate />
                            </label>
                            {/* TODO: apply disable for recaptcha */}
                            <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="Type the captcha text above" className="input input-bordered" required />
                            {/* <span onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-3">validate</span> */}
                        </div>
                        <div className="form-control mt-6">
                            <input disabled={false} className="btn btn-primary" type='submit' value='login' />
                        </div>
                    </form>
                    <div>
                        <small>New Here? <Link to='/signUp' className='text-blue-600 mb-3'>Create New Account</Link></small>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;