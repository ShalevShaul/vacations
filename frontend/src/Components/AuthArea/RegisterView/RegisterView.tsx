import { useForm } from 'react-hook-form';
import './RegisterView.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../../Loader/Loader';
import { Button, TextField } from '@mui/material';
import jwtAxios from '../../../Services/JwtAxios';

interface RegisterationProps {
    flip: () => void;
}

interface User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export default function RegisterView({ flip }: RegisterationProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<User>();
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Register function
    async function registerUser(user: User) {
        setIsLoading(true);
        try {
            const response = await jwtAxios.post('/auth/register', user);

            localStorage.setItem('loginData', JSON.stringify(response.data));
            localStorage.setItem('loginTime', Date.now().toString());

            reset();
            setMessage('');
            window.location.reload();
        } catch (error: any) {
            console.log(error);
            setMessage(error.response?.data || 'Registration failed');
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setMessage('');
            }, 4000);
        }
    }

    return (
        <div className='RegisterView'>
            {isLoading && <Loader />}
            <h2>Register</h2>
            <form onSubmit={handleSubmit(registerUser)}>
                {/* First name input */}
                <TextField className='fields' label="First name" variant="standard" type='text'
                    sx={{
                        "& .MuiInput-underline:before": {
                            borderBottomColor: "gray", // border default color
                        },
                        "& .MuiInput-underline:after": {
                            borderBottomColor: "green", // border focus color
                        },
                        "& .MuiInputLabel-root": {
                            color: "rgb(51, 51, 51)", // label default color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "green", // label focus color
                        },
                        "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px transparent inset !important",
                            WebkitTextFillColor: "inherit !important",
                            transition: "background-color 5000s ease-in-out 0s",
                        },
                    }} {...register('first_name', { required: true, minLength: 2 })} />
                {errors.first_name?.type === 'required' && <span className='inputError'>First name is required</span>}
                {errors.first_name?.type === 'minLength' && <span className='inputError'>First name is too short</span>}

                {/* Last name input */}
                <TextField className='fields' label="Last Name" variant="standard" type='text'
                    sx={{
                        "& .MuiInput-underline:before": {
                            borderBottomColor: "gray", // border default color
                        },
                        "& .MuiInput-underline:after": {
                            borderBottomColor: "green", // border focus color
                        },
                        "& .MuiInputLabel-root": {
                            color: "rgb(51, 51, 51)", // label default color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "green", // label focus color
                        },
                        "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px transparent inset !important",
                            WebkitTextFillColor: "inherit !important",
                            transition: "background-color 5000s ease-in-out 0s",
                        },
                    }} {...register('last_name', { required: true, minLength: 2 })} />
                {errors.last_name?.type === 'required' && <span className='inputError'>Last name is required</span>}
                {errors.last_name?.type === 'minLength' && <span className='inputError'>Last name is too short</span>}

                {/* Email input */}
                <TextField className='fields' label="Email" variant="standard" type='email'
                    sx={{
                        "& .MuiInput-underline:before": {
                            borderBottomColor: "gray", // border default color
                        },
                        "& .MuiInput-underline:after": {
                            borderBottomColor: "green", // border focus color
                        },
                        "& .MuiInputLabel-root": {
                            color: "rgb(51, 51, 51)", // label default color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "green", // label focus color
                        },
                        "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px transparent inset !important",
                            WebkitTextFillColor: "inherit !important",
                            transition: "background-color 5000s ease-in-out 0s",
                        },
                    }} {...register('email', { required: true })} />
                {errors.email?.type === 'required' && <span className='inputError'>Email is required</span>}

                {/* Password input */}
                <TextField className='fields' label="Password" variant="standard" type='password'
                    sx={{
                        "& .MuiInput-underline:before": {
                            borderBottomColor: "gray", // border default color
                        },
                        "& .MuiInput-underline:after": {
                            borderBottomColor: "green", // border focus color
                        },
                        "& .MuiInputLabel-root": {
                            color: "rgb(51, 51, 51)", // label default color
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "green", // label focus color
                        }
                    }} {...register('password', { required: true, minLength: 4 })} />
                {errors.password?.type === 'required' && <span className='inputError'>Password is required</span>}
                {errors.password?.type === 'minLength' && <span className='inputError'>Password is too short</span>}

                <p>
                    <Button className='submitBtn' variant='contained' type='submit'>Register</Button>
                </p>
                <p className='message'>
                    {message}
                </p>
            </form>
            <p className="login-link">
                Already have an account ?
                <button
                    className="link-button"
                    onClick={() => {
                        flip();
                        setTimeout(() => {
                            navigate('/login')
                        }, 200);
                    }}
                >
                    Login here
                </button>
            </p>
        </div>
    );
}