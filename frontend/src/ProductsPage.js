import {Link} from "react-router-dom";
import ItemTile from "./components/ItemTile";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import "./style/HomePage.css";
import "./style/AdminPage.css";
import {data} from "express-session/session/cookie";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function getData() {
            try {
                const productsResponse = await Axios.get("http://127.0.0.1:5000/adminPage/products");
                setProducts(productsResponse.data);
                const categoriesResponse = await Axios.get("http://127.0.0.1:5000/products/getCategories");
                console.log(categoriesResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error("Produkt sa nepodarilo ziskat:", error);
            }
        }
        getData();
    }, []);
    return <body>
    <div className="container-md position-relative">
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
}