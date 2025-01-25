import { useEffect, useState } from "react";
import "./Home.css";
import SingleVacation from "../SingleVacation/SingleVacation";
import jwtAxios from "../../../../Services/JwtAxios";
import Loader from "../../../Loader/Loader";
import errorImage from '../../../../assets/images/Error.png';
import noResultsImage from '../../../../assets/images/noResults.jpg';

interface VacationFields {
    vacation_id: number;
    destination: string;
    description: string;
    start_time: string;
    end_time: string;
    price: number;
    image: string;
}

interface Following {
    user_id: number;
    vacation_id: number;
}

function Home() {
    const [vacations, setVacations] = useState<VacationFields[]>([]);
    const [newVacations, setNewVacations] = useState<VacationFields[]>([]);
    const [message, setMessage] = useState<'' | 'Error getting vacations, reload or try again later.'>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10; // Set items per page
    const user = JSON.parse(localStorage.getItem('loginData') || '{}');

    // Get vacations function
    async function getAllVacationsAsync() {
        setIsLoading(true);
        try {
            const response = await jwtAxios.get<VacationFields[]>('http://localhost:4000/vacations');
            const sortedVacations = response.data.sort((a, b) =>
                new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
            );
            setVacations(sortedVacations);
            setNewVacations(response.data);
            setMessage('');
        } catch (error) {
            setMessage('Error getting vacations, reload or try again later.');
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500)
        }
    }

    useEffect(() => {
        getAllVacationsAsync();
    }, []);

    // Sort following
    async function followingVacations() {
        setCurrentPage(1);
        setIsLoading(true);
        const user_id = user.user_id;
        try {
            const response = await jwtAxios.get<Following[]>(`http://localhost:4000/followers/following/${user_id}`);
            const vacationIds = response.data.map(r => r.vacation_id);
            const followingVacations = vacations.filter(v => vacationIds.includes(v.vacation_id));
            setNewVacations(followingVacations);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // Sort no started
    function notStartedVacations() {
        setCurrentPage(1);
        const notStartedVacations = vacations.filter(v =>
            new Date(v.start_time).getTime() > new Date().getTime()
        );
        setNewVacations(notStartedVacations);
    }

    // Sort current
    function currentVacations() {
        setCurrentPage(1);
        const currentVacations = vacations.filter(v =>
            new Date(v.start_time).getTime() < new Date().getTime() &&
            new Date(v.end_time).getTime() > new Date().getTime()
        );
        setNewVacations(currentVacations);
    }

    // Sort all vacations
    function allVacations() {
        setCurrentPage(1);
        setNewVacations(vacations);
    }

    // Current page - pagination
    function getCurrentPageVacations() {
        const startIndex = (currentPage - 1) * itemsPerPage;    // Example: page 2 start from index 10.
        const endIndex = startIndex + itemsPerPage;    // Example: 10 + items = 20
        return newVacations.slice(startIndex, endIndex);    // Return vacations 10 to 20
    };

    // Scroll down
    function scrollDown() {
        document.querySelector('.vacations')?.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.sortedButtons')?.scrollIntoView({ behavior: 'smooth' });
    }

    // Scroll after pagination
    function scrollAfterPagination() {
        setTimeout(() => {
            document.querySelector('.vacations')?.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            });
        }, 0);
    }

    return (
        <div className="Home">
            {isLoading && <Loader />}
            <div className="homeImage">
                <div className="background-overlay">
                    <div>
                        <span className="letsFind">Let's Find Your Next Vacation</span>
                        <h2 className="title">Welcome {user.first_name} {user.last_name} {user.role === 'admin' && <span>({user.role})</span>}</h2>
                        <button className="letsStart" onClick={scrollDown}>Let's Start</button>
                    </div>
                    <span className="material-symbols-outlined arrow-down">
                        keyboard_arrow_down
                    </span>
                </div>

            </div>

            {/* Regular user sort buttons */}
            {user.role === 'user' && vacations?.length > 0 && (
                <div className="sortedButtons">
                    <button onClick={allVacations}>
                        All vacations <span className="material-icons">beach_access</span>
                    </button>
                    <button onClick={followingVacations}>
                        Following <span className="material-icons">bookmark</span>
                    </button>
                    <button onClick={notStartedVacations}>
                        Not started <span className="material-icons">event_busy</span>
                    </button>
                    <button onClick={currentVacations}>
                        Current <span className="material-icons">event_available</span>
                    </button>
                </div>
            )}

            {newVacations.length > 0 ? (
                <>
                    {/* Vacations grid */}
                    <div className="vacations">
                        {getCurrentPageVacations().map(vacation =>
                            <SingleVacation
                                key={vacation.vacation_id}
                                {...vacation}
                                refresh={getAllVacationsAsync}
                            />
                        )}
                    </div>

                    {/* Pagination controls */}
                    {newVacations.length > itemsPerPage && (
                        <div className="pagination">
                            {/* Previous button */}
                            <button
                                onClick={() => {
                                    setCurrentPage(prev => prev - 1);
                                    scrollAfterPagination();
                                }}
                                disabled={currentPage === 1}
                                className="pagination-arrow"
                            >
                                <span className="material-icons">chevron_left</span>
                            </button>

                            {/* Pages numbers */}
                            {(() => {
                                const totalPages = Math.floor(newVacations.length / itemsPerPage);
                                const pages = [];

                                // Check for more page if needed
                                const remainder = newVacations.length % itemsPerPage;
                                const lastPage = remainder > 0 ? totalPages + 1 : totalPages;

                                // Buttons for all pages
                                for (let i = 1; i <= lastPage; i++) {
                                    pages.push(
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setCurrentPage(i);
                                                scrollAfterPagination();
                                            }}
                                            className={`pagination-number ${i === currentPage ? 'active' : ''}`}
                                        >
                                            {i}
                                        </button>
                                    );
                                }

                                return pages;
                            })()}

                            {/* Next button */}
                            <button
                                onClick={() => {
                                    setCurrentPage(prev => prev + 1);
                                    scrollAfterPagination();
                                }}
                                disabled={currentPage === (Math.floor(newVacations.length / itemsPerPage) + (newVacations.length % itemsPerPage ? 1 : 0))}
                                className="pagination-arrow"
                            >
                                <span className="material-icons">chevron_right</span>
                            </button>
                        </div>
                    )}
                </>
            ) : (
                message == 'Error getting vacations, reload or try again later.' ?
                    <div className="errorVacations">
                        <span>{message}</span>
                        <img src={errorImage} />
                    </div> :
                    <div className="noVacations">
                        <span>There is no vacations to display.</span>
                        <img src={noResultsImage} />
                    </div>
            )}
        </div>
    );
}

export default Home;
