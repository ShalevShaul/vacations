import "./Menu.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Menu() {
    const [hoverText, setHoverText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('loginData') || '{}');
    const location = useLocation();


    function logOut() {
        localStorage.removeItem('loginData');
        localStorage.removeItem('loginTime');
        window.location.reload();
    }

    return (
        <div className="Menu">
            {/* Mobile menu */}
            <div className="mobile-header">
                <button
                    className="mobile-button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
                {/* Mobile logout always display */}
                <a
                    className="mobile-logout"
                    onClick={logOut}
                    onMouseEnter={() => setHoverText("Log Out")}
                    onMouseLeave={() => setHoverText("")}
                >
                    <span className="material-icons">logout</span>
                    {hoverText === "Log Out" && <span className="hoverText">{hoverText}</span>}
                </a>
            </div>

            {/* Regular menu */}
            <nav className={isOpen ? 'show' : ''}>
                <div className="menuButtons">
                    <a className="homeBtn" href="/home">
                        Home <span className="material-icons">home</span>
                    </a>

                    {user.role === 'admin' && <a
                        className="addBtn"
                        href="/addVacation"
                    >
                        Add Vacation <span className="material-icons">add</span>
                    </a>}

                    {user.role === 'admin' && <a
                        className="reportsBtn"
                        href="/reports"
                    >
                        Reports <span className="material-icons">bar_chart</span>
                    </a>}
                </div>
                <a
                    className="logOut desktop-logout"
                    onClick={logOut}
                    onMouseEnter={() => setHoverText("Log Out")}
                    onMouseLeave={() => setHoverText("")}
                >
                    <span className="material-icons">logout</span>
                    {hoverText === "Log Out" && <span className="hoverText">{hoverText}</span>}
                </a>
            </nav>
        </div>
    );
}

export default Menu;