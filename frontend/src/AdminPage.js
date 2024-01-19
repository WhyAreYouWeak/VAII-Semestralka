import React, {useEffect, useState} from "react";
import ItemTile from "./components/ItemTile";
import "./style/HomePage.css";
import "./style/AdminPage.css";
import Axios from "axios";
import {Link} from "react-router-dom";
export default function AdminPage() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getProducts() {
            try {
                const response = await Axios.get("http://127.0.0.1:5000/adminPage/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Produkt sa nepodarilo ziskat:", error);
            }
        }
        getProducts();
    }, []);
    return (
        <body>

        <div className="container-md position-relative">
            <Link to="/add-product">
            <div className="addButton position-absolute top-0 end-0">
                <button className="btn btn-primary me-2">Pridat produkt</button>
            </div>
            </Link>
            <div className="products container d-flex flex-wrap justify-content-center">
                {products.map((product) => (
                    <Link to={`/add-product?productId=${product._id}`} key={product._id}>
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
    );
}