import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import axios from 'axios';
import {useState} from "react";
export default function AddProduct() {

    const [product, setProduct] = useState({
        name: '',
        price: '',
        ISBN: '',
        binding: '',
        weight: '',
        language: '',
        publisher: '',
        imageURL: ''
    });

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
            // Assuming you have an API endpoint to handle product creation
            const response = await axios.post('http://localhost:5000/adminPage/addProduct', product);

            // Handle success or display a success message
            console.log('Product added successfully:', response.data);
        } catch (error) {
            // Handle error or display an error message
            console.error('Error adding product:', error);
        }
    };

    return <body>
    <NavBar />
    <div className="container-md">
        <div className="row">
            <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-center mb-4">Pridať produkt</h3>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nazov:</label>
                        <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleInputChange} required />
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
                    <button type="submit" className="btn btn-primary btn-block">Pridať produkt</button>
                </form>
            </div>
        </div>
    </div>
    <Footer />
    </body>
}