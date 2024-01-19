import "./style/ProfilePage.css";
import validator from "validator/es";
export default function ProfilePage() {
    
    const isEmailValid = (email) => {
        console.error(email);
        if (!validator.isEmail(email)) {
            console.error("zly email");
        }
        return validator.isEmail(email);
    };

   return <div>
        <body>
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Prihlasovacie informácie</h4>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="loginEmail">Prihlasovací e-mail</label>
                                    <input type="text" className="form-control" id="loginEmail" value="zarodnansky@stud.uniza.sk"/>
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
                                    <label htmlFor="newPassword">Nové heslo</label>
                                    <input type="password" className="form-control" id="newPassword" value=""/>
                                </div>
                                <button type="submit" className="loginChangeButton btn btn-primary">Zmeniť údaje</button>
                            </form>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title"> Fakturačné údaje</h4>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="userName">Meno priezvisko</label>
                                    <input type="text" className="form-control" id="userName" value="Jožko Mrkvička"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Tel. čislo (+421)</label>
                                    <input type="number" className="form-control" id="phoneNumber" value=""/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="street">Ulica</label>
                                    <input type="text" className="form-control" id="street" value=""/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="PSC">PSČ</label>
                                    <input type="text" className="form-control" id="PSC" value=""/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">Mesto</label>
                                    <input type="text" className="form-control" id="city" value=""/>
                                </div>
                                <button type="submit" className="userInformationButton btn btn-primary">Zmeniť údaje</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </body>
    </div>
}