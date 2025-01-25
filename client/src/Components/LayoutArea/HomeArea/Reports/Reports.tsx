import './Reports.css';
import { useEffect, useState } from 'react';
import jwtAxios from '../../../../Services/JwtAxios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import Loader from '../../../Loader/Loader';
import errorImage from '../../../../assets/images/Error.png';
import noReportsImage from '../../../../assets/images/noReports.jpg';

interface Report {
    destination: string;
    followers: number;
}

export default function Reports() {
    const [reports, setReports] = useState<Report[]>([]);
    const [message, setMessage] = useState<'Error getting followers' | ''>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hoverText, setHoverText] = useState("");

    // Get reports function
    async function getReportsAsync() {
        setIsLoading(true);
        try {
            const response = await jwtAxios.post('http://localhost:4000/followers/reports', { role: 'admin' });
            console.log(response.data);
            setReports(response.data);
        } catch (error) {
            console.error(error);
            setMessage('Error getting followers');
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    };

    useEffect(() => {
        getReportsAsync();
    }, []);

    // Download csv content
    function downloadCsv() {
        // Convert data to csv format
        const csvContent = reports.map(r =>
            `${r.destination}, ${r.followers}`
        ).join('\n');

        // Create file to download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });   // Binary Large Object(content, type)
        const link = document.createElement('a');    // Creat <a> tag
        const url = URL.createObjectURL(blob);     // Create url
        link.setAttribute('href', url);     // Set link adress to the url 
        link.setAttribute('download', 'Vacations_Reports.csv');     // set for download, <file-name>

        // Download 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);   // Revoke url
    }

    return (
        <div className='Reports'>
            <h2>Vacations Report</h2>
            {reports?.length > 0 && <button
                className='downloadBtn'
                onMouseEnter={() => setHoverText('Download')}
                onMouseLeave={() => setHoverText('')}
            >
                <span onClick={downloadCsv} className="material-icons">download</span>
                {hoverText === 'Download' && <span className="hoverText">{hoverText}</span>}
            </button>}
            <div className="reports-container">
                {isLoading && <Loader />}
                {reports.length > 0 ?
                    <div className='responsiveContainer'>
                        {(<ResponsiveContainer>
                            <BarChart
                                data={reports}
                                margin={{ top: 40 }}
                            >
                                <CartesianGrid stroke="rgba(100, 100, 100, 0.2)" vertical={false} />
                                <XAxis
                                    dataKey="destination"
                                    angle={-20}
                                    textAnchor="end"
                                    height={10}
                                    tick={{
                                        fill: 'rgb(87, 62, 45)',
                                        fontSize: 14,
                                        fontWeight: 500
                                    }}
                                />
                                <YAxis allowDecimals={false} tick={{ fill: 'rgb(87, 62, 45)' }} />
                                <Tooltip /> {/* Hover on bars */}
                                <Legend
                                    verticalAlign='bottom'
                                    height={36}
                                    wrapperStyle={{
                                        bottom: -40,
                                        left: 40
                                    }} />
                                <Bar dataKey="followers" fill="rgb(87, 62, 45)" radius={[10, 10, 0, 0]}
                                    animationDuration={1400}
                                />
                            </BarChart>
                        </ResponsiveContainer>)}
                    </div> :
                    message ?
                        <div className="errorVacations">
                            <span>{message}</span>
                            <img src={errorImage} />
                        </div> :
                        <div className="errorVacations">
                            <span>No followers to display</span>
                            <img src={noReportsImage} />
                        </div>
                }
            </div>
        </div>
    );
}