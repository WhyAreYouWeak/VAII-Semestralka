import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductPage() {

    const [product, setProduct] = useState({
        name: '',
        author: '',
        price: '',
        category: '',
        ISBN: '',
        binding: '',
        weight: '',
        language: '',
        publisher: '',
        imageFile: null,
    });
    const [productId, setProductId] = useState(null);


    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("productId");

        if (id) {
            setProductId(id);
            console.log(id);
            fetchProductDetails(id);
        }
    }, []);

    const fetchProductDetails = async (id) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:5000/adminPage/products/${id}`
            );
            setProduct(response.data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    return <body>
        <div className="container-md">
            <div className="row">
                <div className="col-md-6">
                    <h3>Product Details</h3>
                    <img src={product.imageURL} alt={product.name} style={{maxWidth: '100%'}}/>
                    <h4>{product.name}</h4>
                    <p>Author: {product.author}</p>
                    <p>Price: {product.price}</p>
                    <p>Category: {product.category.name}</p>
                    <p>ISBN: {product.ISBN}</p>
                    <p>Binding: {product.binding}</p>
                    <p>Weight: {product.weight}</p>
                    <p>Language: {product.language}</p>
                    <p>Publisher: {product.publisher}</p>
                </div>
            </div>
        </div>

        </body>
    }