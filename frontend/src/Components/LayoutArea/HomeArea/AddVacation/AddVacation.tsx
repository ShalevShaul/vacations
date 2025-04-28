import { useForm } from 'react-hook-form';
import './AddVacation.css';
import Vacation from '../../../../model/Vacation';
import { useNavigate } from 'react-router-dom';
import jwtAxios from '../../../../Services/JwtAxios';
import { useState } from 'react';
import Loader from '../../../Loader/Loader';

export default function AddVacation() {
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Vacation>();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('loginData') || '{}');

    // Add vaction function (admin-only)
    async function addVacation(newVacation: Vacation) {
        setIsLoading(true);
        const myData = new FormData();
        myData.append('destination', newVacation.destination);
        myData.append('description', newVacation.description);
        myData.append('start_time', newVacation.start_time);
        myData.append('end_time', newVacation.end_time);
        myData.append('price', newVacation.price.toString());
        myData.append('image', newVacation.image[0]);
        try {
            await jwtAxios.post<Vacation>('/vacations/insertVacation', myData);
            navigate('/home');
        } catch (error: any) {
            console.log(error);
            setMessage(Object.values(error.response.data)[0] == 'R' ? 'Error, please try again later' :
                `${Object.values(error.response.data)[0]}`);
            setTimeout(() => {
                setMessage(null)
            }, 5000);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='AddVacation'>
            {isLoading && <Loader />}
            <h2>Add Vacation</h2>
            <form onSubmit={handleSubmit(addVacation)}>
                <p>
                    <span className='inputName'>Destination:</span> <br />
                    <input type="text" autoComplete='off' {...register('destination', { required: true, minLength: 3 })} /> <br />
                    {errors.destination?.type === 'required' && <span className='inputError'>Destination is required</span>}
                    {errors.destination?.type === 'minLength' && <span className='inputError'><br />Destination is too short</span>}
                </p>
                <p>
                    <span className='inputName'>Description:</span> <br />
                    <textarea {...register('description', { required: true })}></textarea> <br />
                    {errors.description?.type === 'required' && <span className='inputError'>Description is required</span>}
                </p>
                <p>
                    <span className='inputName'>Start time:</span> <br />
                    <input type="date" {...register('start_time', { required: true })} /> <br />
                    {errors.start_time?.type === 'required' && <span className='inputError'>Start time is required</span>}
                </p>
                <p>
                    <span className='inputName'>End time:</span> <br />
                    <input type="date" {...register('end_time', { required: true })} /> <br />
                    {errors.end_time?.type === 'required' && <span className='inputError'>End time is required</span>}
                </p>
                <p>
                    <span className='inputName'>Price:</span> <br />
                    <input type="number" {...register('price', { required: true, min: 0, max: 10000 })} /> <br />
                    {errors.price?.type === 'required' && <span className='inputError'>Price is required</span>}
                    {errors.price?.type === 'min' && <span className='inputError'><br />Price must be positive</span>}
                    {errors.price?.type === 'max' && <span className='inputError'><br />Price is too high</span>}
                </p>
                <p>
                    <span className='inputName'>Image:</span> <br />
                    <input type="file" accept="image/*" {...register('image', { required: true })} />
                    {errors.image?.type === 'required' && <span className='inputError'>Image is required</span>}
                </p>
                <p className='serverError'>
                    {message?.toString()}
                </p>
                <p>
                    <button type='submit'>Add Vacation</button>
                </p>
            </form>
        </div>
    )
}
