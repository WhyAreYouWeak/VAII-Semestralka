import {Link} from "react-router-dom";
import ItemTile from "./components/ItemTile";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import "./style/HomePage.css";
import "./style/AdminPage.css";
import "./style/ProductsPage.css"
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
                console.error("Data sa nepodarilo ziskat:", error);
            }
        }
        getData();
    }, []);
    return <body>

    <div className="container-md position-relative ">
        <div className="productsPageRow row">
            <div className="col">
        <div className="d-flex justify-content-between">
            <div className="left-menu">
                <h3>Kategórie</h3>
                <ul>
                    {categories.map((category) => (
                        <li key={category._id}>
                            <Link to={`/category/${category._id}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
            <div className="col">
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
        </div>
    </div>
    </body>
}