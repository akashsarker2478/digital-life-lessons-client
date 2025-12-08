import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../Social login/SocialLogin';

const Login = () => {
  const {loginUser} = UseAuth()
   const {register,handleSubmit,formState:{errors}} = useForm()
  const navigate = useNavigate()
   const handleLogin = (data)=>{
    console.log(data)
    loginUser(data.email,data.password)
    .then(res=>{
      console.log(res.user)
      alert('login successful')
      navigate('/')
    })
    .then(err=>{
      console.log(err.user)
    })

   }
   
  return (
     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
      <div className="card-body">
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register('email',{ required: true })} className="input" placeholder="Email" />
           {errors.email?.type === 'required' && <p className='text-red-400'>Email is Required</p>}
          {/* password */}
          <label className="label">Password</label>
          <input type="password" {...register('password',{ required: true,minLength:6 })}  className="input" placeholder="Password" />
           {errors.password?.type === 'minLength' && <p className='text-red-400'>password lust be 6 character or longer</p>}
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        </form>
        <div>
          <h2>don't have an account ? <Link to={'/signUp'}>register</Link></h2>
        </div>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;