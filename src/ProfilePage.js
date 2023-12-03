import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./style/ProfilePage.css";
export default function ProfilePage() {
   return <div>
        <body>
        <NavBar></NavBar>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <image src="https://placekitten.com/300/200" className="card-img-top" alt="User"> </image>
                            <div className="card-body">
                                <h5 className="card-title">John Doe</h5>
                                <p className="card-text">Web Developer</p>
                            </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">User Information</h5>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input type="text" className="form-control" id="fullName" value="John Doe"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" value="john.doe@example.com"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="tel" className="form-control" id="phone" value="(555) 123-4567"/>
                                </div>
                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <textarea class="form-control" id="address" rows="3">123 Main Street, Cityville</textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </body>
    </div>
}