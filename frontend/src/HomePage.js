import React, {useEffect, useState} from "react";
import './style/HomePage.css';
import ItemTile from "./components/ItemTile";
import axios from "axios";
import {Link} from "react-router-dom";
export default function HomePage() {
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/adminPage/latestProducts");
        setLatestProducts(response.data);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };

    fetchLatestProducts();
  }, []);
  return <body>

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
      {latestProducts.map((product) => (
          <Link
              to={`/product?productId=${product._id}`}
              key={product._id}
          >
            <ItemTile
                title={product.name}
                price={product.price}
                imageURL={product.imageURL}
            ></ItemTile>
          </Link>
      ))}
    </div>
  </div>
  </body>
}