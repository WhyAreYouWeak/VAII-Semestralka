import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function LoginRegisterPage() {
    return <body>
    <NavBar></NavBar>
    <div className="container">
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">

                    <form id="loginForm">
                        <h3 className="text-center mb-4">Login</h3>
                        <div className="form-group">
                            <label htmlFor="loginEmail">Email address</label>
                            <input type="email" className="form-control" id="loginEmail" placeholder="Enter email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="loginPassword">Password</label>
                            <input type="password" className="form-control" id="loginPassword" placeholder="Enter password" required/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </form>


                    <form id="registerForm" className="mt-4">
                        <h3 className="text-center mb-4">Register</h3>

                        <div className="form-group">
                            <label htmlFor="registerEmail">Email address</label>
                            <input type="email" className="form-control" id="registerEmail" placeholder="Enter email" required/>
                        </div>
                        <div className="form-group">
                            <label form="registerPassword">Password</label>
                            <input type="password" className="form-control" id="registerPassword" placeholder="Enter password" required/>
                        </div>
                        <button type="submit" className="btn btn-success btn-block">Register</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
    <Footer></Footer>
    </body>
}