import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import "./style/ProductsPage.css"
import ReviewBox from "./components/ReviewBox";

export default function ProductDetail() {

    const {productId} = useParams();
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
        about: '',
        imageFile: null,
    });
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/getUserEmail', {withCredentials: true}); // Replace with your actual API endpoint
                setUserEmail(response.data.email);
            } catch (error) {

                console.error('Error fetching user email:', error);
            }
        };

        fetchUserEmail();
    }, []);

    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [reviewType, setReviewType] = useState('odporučam');

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("productId");


        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/adminPage/products/${id}`);
                setProduct(response.data);
                const reviewsResponse = await axios.get(`http://127.0.0.1:5000/reviews/getReviews/${id}`);
                setReviews(reviewsResponse.data);
                console.log("reviews" + reviewsResponse.data);
            } catch (error) {
                console.error('Error fetching product details and reviews:', error);
            }
        };

        fetchData();
    }, [productId]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get("productId");
            console.log("productID "  + id);
            console.log("newReview " + newReview );
            console.log("reviewType " + reviewType );
            await axios.post(`http://127.0.0.1:5000/reviews/add-review`, {productId:id, text: newReview, type: reviewType},{withCredentials:true});
            setNewReview('');
            setReviewType('odporučam');
        } catch (error) {
            console.error('Error adding a review:', error);
        }
    };

    const handleOrder = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("productId");
        try {
          const order =  await axios.post(`http://127.0.0.1:5000/orders/createOrder/${id}`,{},{withCredentials:true});
          alert(order.data.message);
        } catch (error) {
            console.log("Order failed", error);
        }

    }

    if (product.name === '') return null;
    return (
        <div>
        <div className="container-md position-relative ">
            <div className="container ">
                <div className="title">
                    <h2>{product.name}</h2>
                </div>
                <div className="row">
                    <div className="col-md-auto">
                        <img src={product.imageURL} alt={product.name} className="img-fluid"/>
                    </div>
                    <div className="itemDescriptionCol col-md-7">
                        <p><b>Autor:</b> {product.author}</p>
                        <p><b>Kategoria:</b> {product.category.name}</p>
                        <p><b>ISBN:</b> {product.ISBN}</p>
                        <p><b>Väzba:</b> {product.binding}</p>
                        <p><b>Váha:</b> {product.weight} kg</p>
                        <p><b>Jazyk:</b> {product.language}</p>
                        <p><b>Vydavateľstvo:</b> {product.publisher}</p>
                        <div className="priceTitle">{product.price} €</div>
                        {userEmail ?
                        <button type="submit" className="btn btn-primary" onClick={handleOrder}>Objednať</button> :
                            <Link to={"/sign-register"}><button type="submit" className="btn btn-primary">Objednať</button> </Link>
                        }
                    </div>
                </div>
                <div className="reviewsContainer mt-md-4 ">
                    <h3 className="userReviewTitle">Viac o knihe</h3>
                    <p className="aboutBook">
                        {product.about}
                    </p>
                </div>
                <div className="reviewsContainer mt-md-4 ">
                    <h3 className="userReviewTitle">Recenzie čitateľov</h3>
                    {userEmail &&
                        <form onSubmit={handleReviewSubmit}>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    id="newReview"
                                    rows="3"
                                    value={newReview}
                                    onChange={(e) => setNewReview(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reviewType">Hodnotenie:</label>
                                <select
                                    className="form-control"
                                    id="reviewType"
                                    value={reviewType}
                                    onChange={(e) => setReviewType(e.target.value)}
                                >
                                    <option value="odporučam">Odporučam</option>
                                    <option value="neodporučam">Neodporučam</option>
                                </select>
                            </div>
                            <button type="submit" className="reviewSubmitButton btn btn-primary">Pridať recenziu</button>
                        </form>
                    }
                        {reviews.map((review) => (
                            <ReviewBox
                                text={review.text}
                                user={review.user.email}
                                type={review.type}
                            ></ReviewBox>
                        ))}
                </div>
            </div>
        </div>
    </div>
    );
}