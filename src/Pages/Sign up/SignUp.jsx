import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import SocialLogin from '../Social login/SocialLogin';
import { useNavigate } from 'react-router';
import axios from 'axios';
import img from '../../assets/register img.jpg'

const SignUp = () => {
    const {createUser,updateUser} = UseAuth()
    const {register,handleSubmit,formState:{errors}} = useForm()
    const navigate = useNavigate()
  const handleRegister = (data) => {
  const profileImg = data.photo[0];

  createUser(data.email, data.password)
    .then(res => {
      const formData = new FormData();
      formData.append('image', profileImg);

      const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

      return axios.post(img_API_URL, formData);
    })
    .then(res => {
      const userProfile = {
        displayName: data.name,
        photoURL: res.data.data.url
      };

      return updateUser(userProfile);
    })
    .then(() => {
      alert('Register success!');
      navigate('/');
    })
    .catch(err => {
      console.log(err.message);
    });
};

    return (
        <div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body"></div>
           <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
                {/* name  */}
          <label className="label">Name</label>
          <input type="text" {...register('name',{ required: true })}
           className="input" placeholder="name" />
           {errors.name?.type === 'required' && <p className='text-red-400'>Name is Required</p>}
           {/* photo field */}
          <label className="label">Photo</label>

          <input type="file" {...register('photo',{ required: true })}
           className="file-input" placeholder="your photo" />

           {errors.photo?.type === 'required' && <p className='text-red-400'>photo is Required</p>}
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
