import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import SocialLogin from '../Social login/SocialLogin';

const SignUp = () => {
    const {createUser} = UseAuth()
    const {register,handleSubmit,formState:{errors}} = useForm()

    const handleRegister = (data) =>{
        console.log('after register',data)
        createUser(data.email,data.password)
        .then(res=>{
            console.log(res.user)
            alert('register success!')
        })
        .catch(err=>{
            console.log(err.massage)
        })
    }
    return (
        <div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body"></div>
           <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
                {/* email  */}
          <label className="label">Email</label>
          <input type="email" {...register('email',{ required: true })}
           className="input" placeholder="Email" />
           {errors.email?.type === 'required' && <p className='text-red-400'>Email is Required</p>}

           {/* password */}
          <label className="label">Password</label>
          <input type="password" {...register('password',{ required: true,
          minLength:6,
          pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/


           })}
           className="input" placeholder="Password" />
            {errors.password?.type === 'required' && <p className='text-red-400'>Password is Required</p>}
            {
                errors.password?.type === 'minLength' && <p className='text-red-400'>Password must be 6 character or longer</p>
            }
            {
                errors.password?.type === 'pattern' && <p className='text-red-500'>password must have at least 1 upper case 1 lower case 1 number  must be 6 character or longer</p>
            }
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
           </form>
           <SocialLogin></SocialLogin>
            </div>
    </div>
    
    );
};

export default SignUp;
