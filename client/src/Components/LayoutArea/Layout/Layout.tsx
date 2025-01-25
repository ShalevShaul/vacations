import "./Layout.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Menu from "../Menu/Menu";
import Home from "../HomeArea/Home/Home";
import EditVacation from "../HomeArea/EditVacation/EditVacation";
import AddVacation from "../HomeArea/AddVacation/AddVacation";
import Reports from "../HomeArea/Reports/Reports";

function Layout(): JSX.Element {
    const user = JSON.parse(localStorage.getItem('loginData') || '{}');
    return (
        <div className="Layout">
            <aside>
                <Menu />
            </aside>
            <main>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                    {user.role === 'admin' && <Route path="/addVacation" element={<AddVacation />} />}
                    {user.role === 'admin' && <Route path="/reports" element={<Reports />} />}
                    {user.role === 'admin' && <Route path="/editVacation/:vacation_id" element={<EditVacation />} />}
                </Routes>
            </main>
        </div>
    );
}

export default Layout;
