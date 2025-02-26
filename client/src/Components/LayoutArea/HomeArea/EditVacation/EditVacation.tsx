import React, { useEffect, useState } from 'react'
import './EditVacation.css';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Vacation from '../../../../model/Vacation';
import jwtAxios from '../../../../Services/JwtAxios';
import Loader from '../../../Loader/Loader';

interface VacationFields {
    vacation_id?: number;
    destination?: string;
    description?: string;
    start_time?: string;
    end_time?: string;
    price?: number;
    image?: any;
}

export default function EditVacation(props: VacationFields) {
    const [message, setMessage] = useState<'Server error, please try again later' | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Vacation>();
    // const user = JSON.parse(localStorage.getItem('loginData') || '{}');
    const { vacation_id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' });
        if(!state) {
            navigate('/home');
            return;
        }
    }, []);
    
    if(!state) return <Loader />

    // Edit vaction function (admin-only)
    async function editVacation(editedVacation: Vacation) {
        setIsLoading(true);
        const myData = new FormData();
        myData.append('destination', editedVacation.destination);
        myData.append('description', editedVacation.description);
        myData.append('start_time', editedVacation.start_time);
        myData.append('end_time', editedVacation.end_time);
        myData.append('price', editedVacation.price.toString());
        myData.append('image', editedVacation.image[0]);
        myData.append('role', 'admin');    // role:'admin' for server verifyAdmin
        try {
            await jwtAxios.put<Vacation>(`http://localhost:4000/vacations/editVacation/${vacation_id}`, myData);
            navigate('/home');
        } catch (error: any) {
            console.log(error);
            setMessage('Server error, please try again later');
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        } finally {
            setIsLoading(false);
        }
    }

    function formatForInput(d: string) {
        const date = new Date(d);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());    // Get correct UTC time
        return date.toISOString().split('T')[0];    // return the first part of converted ISO string
    }

    return (
        <div className='EditVacation'>
            {isLoading && <Loader />}
            <h2>Edit Vacation</h2>
            <form onSubmit={handleSubmit(editVacation)}>
                <p>
                    Destination: <br />
                    <input type="text" autoComplete='off' defaultValue={state.destination} {...register('destination', { required: true, minLength: 3 })} /> <br />
                    {errors.destination?.type === 'required' && <span className='inputError'>Destination is required</span>}
                    {errors.destination?.type === 'minLength' && <span className='inputError'>Destination is too short</span>}
                </p>
                <p>
                    Description: <br />
                    <textarea defaultValue={state.description} {...register('description', { required: true })}></textarea> <br />
                    {errors.description?.type === 'required' && <span className='inputError'>Description is required</span>}
                </p>
                <p>
                    Start time: <br />
                    <input type="date" defaultValue={formatForInput(state.start_time)} {...register('start_time', { required: true })} /> <br />
                    {errors.start_time?.type === 'required' && <span className='inputError'>Start time is required</span>}
                </p>
                <p>
                    End time: <br />
                    <input type="date" defaultValue={formatForInput(state.end_time)} {...register('end_time', { required: true })} /> <br />
                    {errors.end_time?.type === 'required' && <span className='inputError'>End time is required</span>}
                </p>
                <p>
                    Price: <br />
                    <input type="number" defaultValue={state.price} {...register('price', { required: true, min: 0, max: 10000 })} /> <br />
                    {errors.price?.type === 'required' && <span className='inputError'>Price is required</span>}
                    {errors.price?.type === 'min' && <span className='inputError'>Price must be positive</span>}
                    {errors.price?.type === 'max' && <span className='inputError'>Price is too high</span>}
                </p>
                <p>
                    Image: <br />
                    <input type="file" accept="image/*" {...register('image')} /> <br />
                    <span className="inputError">Upload a new image to replace the current one, or leave empty to keep it</span>
                </p>
                <p className='serverError'>
                    {message?.toString()}
                </p>
                <p>
                    <button type='submit'>Edit Vacation</button>
                </p>
            </form>
        </div>
    )
}