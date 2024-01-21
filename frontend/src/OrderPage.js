import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style/ProductsPage.css";
import {Link} from "react-router-dom"; // Import your previous styles

export default function OrderPage() {
    const [order, setOrder] = useState({});

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("orderId")

        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/orders/getOrder/${id}`);
                setOrder(response.data);

            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();

    }, []);

    if (!order || !order.productId) return null;

    return <div className="container-md position-relative">
            <div className="container">
                <div className="title">
                    <h2>Detail objednávky</h2>
                </div>
                <div className="orderDetailRow row">
                    <div className="col-md-auto">
                        <Link to={`/product?productId=${order.productId._id}`}>
                        <img src={order.productId.imageURL} alt="{order.productId.imageURL}" className="img-fluid" />
                        </Link>
                    </div>
                    <div className="itemDescriptionCol col-md-7">
                        <Link to={`/product?productId=${order.productId._id}`}>
                        <p className="text-decoration-none"><b>Kniha:</b> {order.productId.name} </p>
                        </Link>
                        <p><b>Cena</b> {order.productId.price}€ </p>
                        <p className="mt-3"><b>Objednal: </b>{order.user.meno} {order.user.priezvisko}  </p>
                        <p><b>Email: </b>{order.user.email} </p>
                        <p><b>Adresa: </b>{order.user.ulica} {order.user.mesto} {order.user.psc} </p>
                        <p><b>Tel. čislo: </b>{order.user.cislo} </p>
                    </div>
                </div>
            </div>
        </div>

}