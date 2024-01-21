import '../style/NavBar.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
export default function NavBar() {
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/getUserEmail',{withCredentials:true}); // Replace with your actual API endpoint
                setUserEmail(response.data.email);
            } catch (error) {

                console.error('Error fetching user email:', error);
            }
        };
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/getUserRole',{withCredentials:true}); // Replace with your actual API endpoint
                setUserRole(response.data.role);
            } catch (error) {

                console.error('Error fetching user email:', error);
            }
        };

        fetchUserEmail();
        fetchUserRole();

    }, []);
    return <nav className="navbar navbar navbar-expand-lg lg-body-tertiary navbar-fixed-top bg-dark">
        <div className="container-fluid">
            <Link to="/"><a className="navbar-brand" href='#'> Top knihy</a> </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                       <Link to="/"> <a className="nav-link"> Domov</a>  </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"> Kontakt</a>
                    </li>
                    <li className="nav-item">
                       <Link to="/products"> <a className="nav-link" href="#"> Ponuka</a> </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"> Novinky</a>
                    </li>
                    <li className="nav-item" >
                        {userRole === "admin" ? (
                        <Link to="/profile">
                            <a className="nav-link">Admin</a>
                        </Link>
                        ) : (
                        userEmail ? (
                        <Link to="/profile">
                            <a className="nav-link">{userEmail}</a>
                        </Link>
                        ) : (
                        <Link to="/sign-register">
                            <a className="nav-link">Prihlasenie</a>
                        </Link>
                        )
                        )}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}