import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './SignUp.css'

const SignUp = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data)
        // create user
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                // update suer
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('success update')
                        reset()
                        Swal.fire({
                            title: "Profile Update Successfully!",
                            icon: "success",
                            draggable: true,
                            customClass: {
                                popup: 'my-popup',
                                title: 'my-title',
                                icon: 'my-icon',
                                confirmButton: 'my-button',
                            }
                        });
                        navigate('/')


                    })
                    .catch(error => {
                        console.log('Profile Update Successfully', error)
                    })

            })
    }

    console.log(watch("example"))

    return (
        <>
            <Helmet><title>bistro boss | Sign Up</title></Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="name"  {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-sm text-red-600">Name input is required</span>}
                            </div>


                            
                            {/* photo */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PHoto URL</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-sm text-red-600">Photo URL is required</span>}
                            </div>
                            {/* email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-sm text-red-600">email input is required</span>}
                            </div>
                            {/* password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&+*])(?=.*[0-9])(?=.*[a-z])/
                                })} name="password" placeholder="password" className="input input-bordered" />

                                {errors.password?.type === "required" && (
                                    <p className="text-red-500 ">password is required</p>
                                )}

                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-500 ">password must be 6 characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-500 ">password less then 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-500 ">password password must have one number, one uppercase , one lowercase and one number</p>
                                )}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" />
                            </div>
                        </form>
                        <p>Already Have account <Link to='/login' className="text-purple-500">login</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;