import React from "react";
import NavBar from "./components/NavBar";
import './style/HomePage.css';
import ItemTile from "./components/ItemTile";
import Footer from "./components/Footer";
export default function HomePage() {
  return <body>
  <NavBar></NavBar>
  <div className="container-md">
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src="/kuciak-png.png" alt="First slide"/>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="/krvavy-mesiac-png.png" alt="Second slide"/>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="/dama-kontra-strelec-png.png" alt="Third slide"/>
        </div>
      </div>
    </div>
    <div className="heading container-sm justify-content-center">
      <h2>
        Najnovšie produkty
      </h2>
    </div>
    <div className="newProducts container  d-flex flex-wrap justify-content-center">
      <ItemTile title={"Metro 2033"} price={12} imageURL={"metro2033"}></ItemTile>
      <ItemTile title={"Metro 2033"} price={12} imageURL={"metro2033"}></ItemTile>
      <ItemTile title={"Metro 2033"} price={12} imageURL={"metro2033"}></ItemTile>
      <ItemTile title={"Metro 2033"} price={12} imageURL={"metro2033"}></ItemTile>
    </div>
  </div>
  <Footer></Footer>
  </body>
}