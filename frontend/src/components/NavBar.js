import '../style/NavBar.css'
import {Link} from "react-router-dom";
export default function NavBar() {
    return <nav className="navbar navbar navbar-expand-lg lg-body-tertiary navbar-fixed-top bg-dark">
        <div className="container-fluid">
            <Link to="/"><a className="navbar-brand" href='#'> Top knihy</a> </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
                <input className="form-control me-2 align-content-lg-end w-25" type="search" placeholder="Vyhladat" aria-label="Search"/>
                <button className="btn btn-outline-light" type="submit">Vyhľadať</button>
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
                        <Link to="/sign-register" > <a className="nav-link" > Prihlasenie</a> </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}