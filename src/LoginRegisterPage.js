import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./style/LoginRegisterPage.css";
export default function LoginRegisterPage() {
    return <body>
    <NavBar></NavBar>
    <div className="container-md">
            <div className="row">
                <div className="col-md-6 ">
                    <form id="loginForm">
                        <h3 className="text-center mb-4">Prihlásenie</h3>
                        <div className="form-group">
                            <label htmlFor="loginEmail">Email </label>
                            <input type="email" className="form-control" id="loginEmail" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="loginPassword">Heslo</label>
                            <input type="password" className="form-control" id="loginPassword" placeholder="Heslo" required/>
                        </div>
                        <button type="submit" className="btn-logIn btn btn-primary btn-block">Prihlásiť</button>
                    </form>



                    <form id="registerForm" className="mt-4">
                        <h3 className="text-center mb-4">Registrácia</h3>

                        <div className="form-group">
                            <label htmlFor="registerEmail">Email</label>
                            <input type="email" className="form-control" id="registerEmail" placeholder="Email" required/>
                        </div>
                        <div className="form-group">
                            <label form="registerPassword">Heslo</label>
                            <input type="password" className="form-control" id="registerPassword" placeholder="Heslo" required/>
                        </div>

                        <div className="form-group">
                            <label form="registerPassword">Potvrdiť heslo</label>
                            <input type="password" className="form-control" id="registerPassword" placeholder="Heslo" required/>
                        </div>
                        <button type="submit" className="btn-register btn btn-success btn-block">Registrovať</button>
                    </form>
                </div>
            </div>
    </div>
    <Footer></Footer>
    </body>
}