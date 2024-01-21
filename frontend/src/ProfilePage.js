import "./style/ProfilePage.css";
import validator from "validator/es";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function ProfilePage() {

    const isEmailValid = (email) => {
        console.error(email);
        if (!validator.isEmail(email)) {
            console.error("zly email");
        }
        return validator.isEmail(email);
    };

    const [user, setUser] = useState({
        meno: '',
        priezvisko: '',
        email: '',
        ulica: '',
        mesto: '',
        psc: '',
        cislo: '',

    });

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("userId")
        if (id) {
            setUserId(id);
            console.log(id);
            fetchUserDetails(id);
        }
    }, []);

    const fetchUserDetails = async (id) => {
      try {
          const response = await axios.get(`http://127.0.0.1:5000/users/getUserProfile/${id}`);
          console.log("user data" + response.data);
          setUser(response.data);
      }  catch (error) {

      }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevProduct) => ({
            ...prevProduct,
            [name]: value,

        }));
    };

    const handleFakturacneUdajeChange = async (event) => {
        event.preventDefault();

        // Extract the updated user information from the form
        const updatedUser = {
            meno: user.meno,
            priezvisko: user.priezvisko,
            cislo: user.cislo,
            ulica: user.ulica,
            psc: user.psc,
            mesto: user.mesto,
        };
        try {
            await axios.put(`http://127.0.0.1:5000/users/updateUserProfile/${userId}`, updatedUser);
            fetchUserDetails(userId);
        } catch (error) {
            console.log("nepodarilo sa zmenit udaje" + error);
        }
    };
    return <body>
    <div className="container">
        <div className="row">
            <div className="menuContainer col-md-auto">
                <div className="d-flex justify-content-between">
                    <div className="left-menu container --bs-secondary-bg-rgb ">
                        <h3 className="menuTitle">Kategórie</h3>
                        <ul>
                            <li>
                                <button className="btn btn-dark "> Základné informácie</button>
                            </li>
                            <li>
                                <button className="btn btn-dark "> Objednávky</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Prihlasovacie informácie</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="loginEmail">Prihlasovací e-mail</label>
                                <input type="text" className="form-control" id="loginEmail" value={user.email}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginPassword">Staré heslo</label>
                                <input type="password" className="form-control" id="loginPassword" value=""/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">Nové heslo</label>
                                <input type="password" className="form-control" id="newPassword" value=""/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="newPassword">Nové heslo znova</label>
                                <input type="password" className="form-control" id="newPassword" value=""/>
                            </div>
                            <button type="submit" className="loginChangeButton btn btn-primary">Zmeniť údaje</button>
                        </form>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title"> Fakturačné údaje</h4>
                        <form onSubmit={handleFakturacneUdajeChange}>
                            <div className="form-group">
                                <label htmlFor="userName">Meno</label>
                                <input type="text" className="form-control" value={user.meno} onChange={handleInputChange} id="meno" name="meno" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Priezvisko</label>
                                <input type="text" className="form-control" value={user.priezvisko} onChange={handleInputChange} id="priezvisko" name="priezvisko" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Tel. čislo (+421 888 225)</label>
                                <input type="tel" pattern="[+]{1}[0-9]{3} [0-9]{3} [0-9]{3}" value={user.cislo} onChange={handleInputChange} className="form-control" id="phoneNumber" name="cislo" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="street">Ulica</label>
                                <input type="text" className="form-control" value={user.ulica} onChange={handleInputChange}  id="street" name="ulica" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="PSC">PSČ</label>
                                <input type="text" className="form-control" value={user.psc} onChange={handleInputChange} id="PSC" name="psc" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">Mesto</label>
                                <input type="text" className="form-control" value={user.mesto} onChange={handleInputChange} id="city" name="mesto" required/>
                            </div>
                            <button type="submit" className="userInformationButton btn btn-primary">Zmeniť údaje</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </body>
}