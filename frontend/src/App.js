import {Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import LoginRegisterPage from "./LoginRegisterPage";
import ProfilePage from "./ProfilePage";
import ProductsPage from "./ProductsPage";
import AdminPage from "./AdminPage";
import AddProduct from "./AddProduct";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProductPage from "./ProductPage";
function App() {
    return (<div className="App">
            <NavBar></NavBar>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-register" element={<LoginRegisterPage />} />
                <Route path="/profile" element={<ProfilePage/>}></Route>
                <Route path="/products" element={<ProductsPage></ProductsPage>}> </Route>
                <Route path="/admin-page" element={<AdminPage></AdminPage>}></Route>
                <Route path="/add-product" element={<AddProduct></AddProduct>}></Route>
                <Route path="/product" element={<ProductPage></ProductPage>}></Route>
            </Routes>
        <Footer></Footer>
    </div> );
}
export default App;