import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import axios from 'axios';
import {useState} from "react";
import {useEffect} from "react";
export default function AddProduct() {

    const [product, setProduct] = useState({
        name: '',
        author:'',
        price: '',
        ISBN: '',
        binding: '',
        weight: '',
        language: '',
        publisher: '',
        imageURL: ''
    });
    const [productId, setProductId] = useState(null);

    useEffect(() => {
        // Check if a productId is provided in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("productId");

        if (id) {
            // If productId is present, fetch the product details and set them as default values
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

            // Set product details as default values
            setProduct(response.data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productId) {
                // If productId is present, update the existing product
                await axios.put(
                    `http://127.0.0.1:5000/adminPage/products/${productId}`, product);
                alert("Produkt upraveny uspesne");
            } else {
                // If productId is not present, add a new product
                const response = await axios.post(
                    "http://127.0.0.1:5000/adminPage/addProduct",product);
                alert(response.data);
            }
        } catch (error) {
            console.error("Error adding/updating product:", error);
        }
    };

    return <body>
    <NavBar />
    <div className="container-md">
        <div className="row">
            <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-center mb-4">  {productId ? "Upraviť produkt" : "Pridať produkt"}</h3>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nazov:</label>
                        <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Autor:</label>
                        <input type="text" className="form-control" id="author" name="author" value={product.author} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Cena:</label>
                        <input type="text" className="form-control" id="price" name="price" value={product.price} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ISBN" className="form-label">ISBN:</label>
                        <input type="text" className="form-control" id="ISBN" name="ISBN" value={product.ISBN} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="binding" className="form-label">Väzba:</label>
                        <input type="text" className="form-control" id="binding" name="binding" value={product.binding} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="weight" className="form-label">Váha:</label>
                        <input type="text" className="form-control" id="weight" name="weight" value={product.weight} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="language" className="form-label">Jazyk:</label>
                        <input type="text" className="form-control" id="language" name="language" value={product.language} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="publisher" className="form-label">Vydavateľ:</label>
                        <input type="text" className="form-control" id="publisher" name="publisher" value={product.publisher} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imageURL" className="form-label">Image URL:</label>
                        <input type="text" className="form-control" id="imageURL" name="imageURL" value={product.imageURL} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">{productId ? "Upraviť produkt" : "Pridať produkt"}</button>
                </form>
            </div>
        </div>
    </div>
    <Footer />
    </body>
}