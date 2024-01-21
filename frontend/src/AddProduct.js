import axios from 'axios';
import {useState} from "react";
import {useEffect} from "react";
import  { useNavigate  }  from 'react-router-dom';
import "./style/AdminPage.css"
export default function AddProduct() {

    const [product, setProduct] = useState({
        name: '',
        author:'',
        price: '',
        category: '',
        newCategory:'',
        ISBN: '',
        binding: '',
        weight: '',
        language: '',
        publisher: '',
        about: '',
        imageFile: null,

    });

    const [categories, setCategories] = useState([]);
    const [productId, setProductId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("productId");

        if (id) {
            setProductId(id);
            console.log(id);
            fetchProductDetails(id);
        }
        fetchCategories();

    }, []);

    const fetchProductDetails = async (id) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:5000/adminPage/products/${id}`
            );
            setProduct(response.data);
            console.log("kategoria " + response.data.category);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
            newCategory: name === 'newCategory' ? value : prevProduct.newCategory,
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setProduct((prevProduct) => ({
                ...prevProduct,
                imageFile: selectedFile,
            }));
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:5000/adminPage/products/${productId}`);
            alert("Produkt úspešne zmazaný");
            navigate("/admin-page");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();

            formData.append('name', product.name);
            formData.append('author', product.author);
            formData.append('price', product.price);
            formData.append('category',product.category);
            formData.append("newCategory",product.newCategory);
            formData.append('ISBN', product.ISBN);
            formData.append('binding', product.binding);
            formData.append('weight', product.weight);
            formData.append('language', product.language);
            formData.append('publisher', product.publisher);
            formData.append('about', product.about);
            formData.append('imageFile', product.imageFile);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };

            if (productId) {
                console.log(productId);
                console.log(formData);
                await axios.post(`http://127.0.0.1:5000/adminPage/products/${productId}`,  formData , config);
                alert("Produkt úspešne upravený");
            } else {
                const response = await axios.post(
                    "http://127.0.0.1:5000/adminPage/addProduct",
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                alert(response.data);
            }
        } catch (error) {
            console.error("Error adding/updating product:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products/getCategories');
            console.log("kategorie" + response.data);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    return <body>

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
                        <label htmlFor="category" className="form-label">
                            Kategória:
                        </label>
                        <select
                            className="form-select"
                            id="category"
                            name="category"
                            value={product.category.name}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>
                                Vyberte kategóriu
                            </option>
                            {categories.map((category) => (
                                <option key={category.name} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newCategory" className="form-label">
                            Nová kategória:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="newCategory"
                            name="newCategory"
                            onChange={handleInputChange}
                        />
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
                        <label htmlFor="publisher" className="form-label">O knihe:</label>
                        <input type="text" className="form-control" id="about" name="about" value={product.about} onChange={handleInputChange}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imageURL" className="form-label">Obrazok:</label>
                        <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="itemPagebutton btn btn-primary btn-block">{productId ? "Upraviť produkt" : "Pridať produkt"}</button>
                    {productId && (<button type="button" className="itemPagebutton btn btn-danger btn-block" onClick={handleDelete}>Zmazať produkt</button>)}
                </form>
            </div>
        </div>
    </div>
    </body>
}