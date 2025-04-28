import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import '../LoginView/LoginView.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../../Loader/Loader';
import jwtAxios from '../../../Services/JwtAxios';

interface Credentials {
    email: string;
    password: string;
}

interface LoginViewProps {
    flip: () => void;
}

export default function LoginView({ flip }: LoginViewProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Credentials>();
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Login function
    async function login(credentials: Credentials) {
        setIsLoading(true);
        try {
            const response = await jwtAxios.post('/auth/login', credentials);

            localStorage.setItem('loginData', JSON.stringify(response.data));
            localStorage.setItem('loginTime', Date.now().toString());

            reset();
            setMessage('');
            window.location.reload();
        } catch (error: any) {
            console.error('Login error:', error);
            setMessage(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setMessage('');
            }, 4000);
        }
    }

    return (
        <div className='LoginView'>
            {isLoading && <Loader />}
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit(login)}>
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
                                transition: "background-color 5000s",
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

                    <div>
                        <Button className='submitBtn' variant='contained' type='submit'>Login</Button>
                    </div>
                    <p className='message'>
                        {message}
                    </p>
                </form>
                <p className="register-link">
                    Don't have an account ?
                    <button
                        className="link-button"
                        onClick={() => {
                            flip();
                            setTimeout(() => {
                                navigate('/register')
                            }, 200);
                        }}
                    >
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
}