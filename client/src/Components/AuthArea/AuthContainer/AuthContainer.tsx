import { useEffect, useState } from 'react';
import './AuthContainer.css';
import LoginView from '../LoginView/LoginView';
import RegisterView from '../RegisterView/RegisterView';
import { Navigate, Route, Routes } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';

export default function AuthContainer() {
    const [isflipped, setIsFlipped] = useState(false);
    
    // Flip login and register card
    function flip() {
        setIsFlipped(!isflipped);
    }

    // Two routes for the flip, one for every side.
    return (
        <div className="AuthContainer">
            <div className='authPage'>
                <ReactCardFlip flipDirection='vertical' isFlipped={isflipped}>
                    <Routes>
                        <Route path='/login' element={<LoginView flip={flip} />} />
                        <Route path='/register' element={<RegisterView flip={flip} />} />
                        <Route path='/' element={<Navigate to='/login' />} />
                        <Route path='/*' element={<Navigate to='/login' />} />
                    </Routes>
                    <Routes>
                        <Route path='/login' element={<LoginView flip={flip} />} />
                        <Route path='/register' element={<RegisterView flip={flip} />} />
                        <Route path='/' element={<Navigate to='/login' />} />
                        <Route path='/*' element={<Navigate to='/login' />} />
                    </Routes>
                </ReactCardFlip>
            </div>
        </div >
    )
}
