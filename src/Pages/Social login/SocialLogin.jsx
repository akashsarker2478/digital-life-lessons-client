import React from "react";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";

const SocialLogin = () => {
    const { googleSignIn } = UseAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        Swal.fire({
            title: 'Signing in with Google',
            text: 'Please wait...',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        googleSignIn()
            .then(res => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Google login successful',
                    icon: 'success',
                    confirmButtonColor: '#10b981',
                    confirmButtonText: 'Continue',
                    timer: 2000,
                    timerProgressBar: true,
                }).then(() => {
                    navigate('/');
                });
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: err.message || 'Login failed',
                    icon: 'error',
                    confirmButtonColor: '#ef4444',
                    confirmButtonText: 'Try Again'
                });
            });
    };

    return (
        <div className="text-center">
            <button 
                onClick={handleGoogleSignIn}
                className="mx-auto btn bg-white text-black border-gray-300 hover:bg-gray-50 hover:border-red-300 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 w-full max-w-xs"
            >
                <FaGoogle className="text-red-500 text-lg" />
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;