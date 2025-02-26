import Vacation from '../../../../model/Vacation';
import './SingleVacation.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtAxios from '../../../../Services/JwtAxios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../../../Loader/Loader';

interface VacationFields {
    vacation_id: number;
    destination: string;
    start_time: string;
    end_time: string;
    description: string;
    price: number;
    image: string;
    refresh: any;
}

interface Follower {
    vacation_id: number;
    user_id: number;
}

export default function SingleVacation(props: VacationFields) {
    const [followers, setFollowers] = useState<Follower[]>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const user = JSON.parse(localStorage.getItem('loginData') || '{}');
    const navigate = useNavigate();
    const vacation = new Vacation(
        props.vacation_id,
        props.destination,
        props.description,
        props.start_time,
        props.end_time,
        props.price,
        props.image,
    );

    // Get all followers function
    async function getAllFollowersAsync() {
        setIsLoading(true);
        try {
            const response = await jwtAxios.get('http://localhost:4000/followers/followers');
            setFollowers(response.data);
        } catch (error) {
            console.log(error);
            setFollowers([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllFollowersAsync();
    }, []);

    // handle follow/unfollow function
    async function handleCheckboxChange(event: any, vacation_id: number) {
        try {
            if (event.target.checked) {    // Add following if checked
                await jwtAxios.post(`http://localhost:4000/followers/insertFollower/${vacation.vacation_id}/${user.user_id}`);
            } else {        // Delete following if unChecked
                await jwtAxios.delete(`http://localhost:4000/followers/deleteFollower/${vacation.vacation_id}/${user.user_id}`);
            }
            await getAllFollowersAsync();
        } catch (error) {
            console.log(error);
        }
    }

    // Delete vacation function (admin-only)
    async function deleteVacation(vacation_id: number) {
        setIsLoading(true);
        try {
            await jwtAxios.delete(`http://localhost:4000/vacations/deleteVacation/${vacation_id}`);
            props.refresh();
            handleCloseDialog();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // Dialog control functions
    const handleDeleteClick = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    };

    return (
        <div className='SingleVacation'>
            {isLoading && <Loader />}
            <header>
                <h3>{vacation.destination}</h3>
                {user.role == 'user' ? (
                    <div className='heart-container'>
                        <label className='followBtn'>
                            <input
                                type="checkbox"
                                onChange={(event) => handleCheckboxChange(event, vacation.vacation_id)}
                                checked={followers?.find(f => f.user_id == user.user_id && f.vacation_id == vacation.vacation_id) ? true : false}
                            />
                            <span className='heart'></span>
                            <span className='followers'>{followers.filter(f => f.vacation_id == vacation.vacation_id).length}</span>
                        </label>
                    </div>
                ) : (
                    <div className='editAndDelete'>
                        <Button
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteClick}
                            sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                marginRight: 1,
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontSize: '0.9rem'
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => navigate(`/editVacation/${vacation.vacation_id}`, {
                                state: {
                                    destination: vacation.destination,
                                    description: vacation.description,
                                    start_time: vacation.start_time,
                                    end_time: vacation.end_time,
                                    price: vacation.price,
                                    image: vacation.image
                                }
                            })}
                            sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                marginRight: 1,
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontSize: '15px'
                            }}
                        >
                            Edit
                        </Button>
                    </div>
                )}
                <img src={`http://localhost:4000/images/${vacation.image}`} alt={vacation.destination} />
            </header>
            <span className='date'>{vacation.formatStart()} - {vacation.formatEnd()}</span>
            <p className='description'>{vacation.description}</p>
            <span className='price'>{vacation.price}$</span>

            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDialog}
                dir="rtl"
                sx={{
                    height: 'auto',
                    overflow: 'hidden',
                    animation: 'fadeIn 0.5s ease', 
                }}>
                <DialogTitle>
                    Delete Vacation
                </DialogTitle>
                <DialogContent sx={{ overflow: 'hidden' }}>
                    <DialogContentText
                        sx={{
                            margin: '20px',
                            textAlign: 'center',
                            fontSize: {
                                sm: '1rem',
                                xs: '0.8rem'
                            },
                            direction: 'ltr'

                        }}>
                        Are you sure you want to delete {vacation.destination} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{
                        padding: '16px 24px',
                        minHeight: '5px'
                    }}>
                    <Button
                        onClick={handleCloseDialog} color="primary"
                        sx={{
                            position: 'absolute',
                            right: '3%',
                            bottom: '3%',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => deleteVacation(vacation.vacation_id)}
                        color="error"
                        sx={{
                            position: 'absolute',
                            left: '3%',
                            bottom: '3%'
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}