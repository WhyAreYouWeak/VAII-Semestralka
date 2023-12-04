import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ItemTile from "./components/ItemTile";
import "./style/HomePage.css";
import "./style/AdminPage.css";
export default function AdminPage() {
    return (
        <body>
        <NavBar />
        <div className="container-md position-relative">

            <div className="addButton position-absolute top-0 end-0">
                <button className="btn btn-primary me-2">Pridat produkt</button>
            </div>

            <div className="products container d-flex flex-wrap justify-content-center">
                <ItemTile title={"Metro 2033"} price={12} imageURL={"metro2033"}></ItemTile>
                <ItemTile title={"Metro 2033"} price={12} imageURL={"metro2033"}></ItemTile>
                <ItemTile title={"Metro 2033"} price={12} imageURL={"metro2033"}></ItemTile>
                <ItemTile title={"Metro 2033"} price={12} imageURL={"metro2033"}></ItemTile>
                <ItemTile title={"Metro 2033"} price={12} imageURL={"metro2033"}></ItemTile>
            </div>
        </div>
        <Footer />
        </body>
    );
}
