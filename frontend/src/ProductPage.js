import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./style/ProductsPage.css"

export default function ProductDetail() {
    const { productId } = useParams();
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

    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("productId");


        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/adminPage/products/${id}`);
                setProduct(response.data);
                const reviewsResponse = await axios.get(`http://127.0.0.1:5000/reviews?productId=${id}`);
                setReviews(reviewsResponse.data);
            } catch (error) {
                console.error('Error fetching product details and reviews:', error);
            }
        };

        fetchData();
    }, [productId]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://127.0.0.1:5000/reviews`, { productId, review: newReview });
            const reviewsResponse = await axios.get(`http://127.0.0.1:5000/reviews?productId=${productId}`);
            setReviews(reviewsResponse.data);
            setNewReview('');
        } catch (error) {
            console.error('Error adding a review:', error);
        }
    };

    return (
        <div className="container ">
            <div className="title">
                <h2>{product.name}</h2>
            </div>
            <div className="row">
                <div className="col-md-auto">
                    <img src={product.imageURL} alt={product.name} className="img-fluid" />
                </div>
                <div className="itemDescriptionCol col-md-7">
                    <p><b>Autor:</b> {product.author}</p>
                    <p><b>Kategoria:</b> {product.category}</p>
                    <p><b>ISBN:</b> {product.ISBN}</p>
                    <p><b>Väzba:</b> {product.binding}</p>
                    <p><b>Váha:</b> {product.weight} kg</p>
                    <p><b>Jazyk:</b> {product.language}</p>
                    <p><b>Vydavateľstvo:</b> {product.publisher}</p>
                    <div className="priceTitle">{product.price} €</div>
                    <button type="submit" className="btn btn-primary">Vložiť do košíka </button>
                </div>
            </div>

            <div className="reviewsContainer mt-md-4 ">
                <h3 className="menuTitle">Recenzie čitateľov</h3>
                <ul>
                    {reviews.map((review) => (
                        <li key={review._id}>{review.text}</li>
                    ))}
                </ul>

                <form onSubmit={handleReviewSubmit}>
                    <div className="form-group">
                        <label htmlFor="newReview">Pridať recenziu</label>
                        <textarea
                            className="form-control"
                            id="newReview"
                            rows="3"
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="reviewSubmitButton btn btn-primary">Submit Review</button>
                </form>
            </div>
        </div>
    );
};