import "./style/LoginRegisterPage.css";
import {useEffect, useState} from "react";
import validator from "validator/es";
import axios from "axios";
import  { useNavigate  }  from 'react-router-dom';
export default function LoginRegisterPage() {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [data, setData] = useState('');
    const isEmailValid = (email) => {
        console.error(email);
        if (!validator.isEmail(email)) {
           console.error("zly email");
        }
        return validator.isEmail(email);
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        if (isEmailValid(registerEmail) && registerPassword) {
            const url ='http://127.0.0.1:5000/loginRegister/register';
            axios.post(url,{email:registerEmail,password:registerPassword, confirmPassword },{withCredentials:true})
                .then(response => {
                    alert(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            if (!isEmailValid(registerEmail)) {
                alert('Zly tvar emailu.');
            } else if (!registerPassword) {
                alert('Chyba heslo');
            } else {
                alert('Hesla sa nezhoduju.');
            }
        }
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        if (isEmailValid(loginEmail) && loginPassword) {
            const url = "http://127.0.0.1:5000/loginRegister/login";
            axios
                .post(url, { email: loginEmail, password: loginPassword },{withCredentials:true})
                .then((response) => {
                    console.log("Prihlasenie uspesne", response.data);
                    alert(response.data);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });

        } else {
            if (!isEmailValid(loginEmail)) {
                alert("Zly tvar emailu");
            } else if (!loginPassword) {
                alert("Chyba heslo");
            }
        }
    };

    const handleInputChange = (e, setStateFunction) => {
        setStateFunction(e.target.value);
    };
    return <body>
    <div className="container-md">
            <div className="row">
                <div className="col-md-6 ">
                    <form id="loginForm" onSubmit={handleLoginSubmit} >
                        <h3 className="text-center mb-4">Prihlásenie</h3>
                        <div className="form-group">
                            <label htmlFor="loginEmail">Email </label>
                            <input type="email" className="form-control" id="loginEmail" placeholder="Email" onChange={(e) => handleInputChange(e, setLoginEmail)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="loginPassword">Heslo</label>
                            <input type="password" className="form-control" id="loginPassword" placeholder="Heslo" onChange={(e) => handleInputChange(e, setLoginPassword)}/>
                        </div>
                        <button type="submit" className="btn-logIn btn btn-primary btn-block">Prihlásiť</button>
                    </form>

                    <form id="registerForm" className="mt-4" onSubmit={handleRegisterSubmit}>
                        <h3 className="text-center mb-4">Registrácia</h3>

                        <div className="form-group">
                            <label htmlFor="registerEmail">Email</label>
                            <input type="email" className="form-control" id="registerEmail" placeholder="Email" onChange={(e) => handleInputChange(e, setRegisterEmail)} />
                        </div>
                        <div className="form-group">
                            <label form="registerPassword">Heslo</label>
                            <input type="password" className="form-control" id="registerPassword" placeholder="Heslo" onChange={(e) => handleInputChange(e, setRegisterPassword)} />
                        </div>

                        <div className="form-group">
                            <label form="registerPassword">Potvrdiť heslo</label>
                            <input type="password" className="form-control" id="registerConfirmPassword" placeholder="Heslo" onChange={(e) => handleInputChange(e, setConfirmPassword)} />
                        </div>
                        <button type="submit" className="btn-register btn btn-success btn-block">Registrovať</button>
                    </form>

                </div>
            </div>
    </div>
    </body>
}