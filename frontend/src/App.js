import {Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import LoginRegisterPage from "./LoginRegisterPage";
import ProfilePage from "./ProfilePage";
import ProductsPage from "./ProductsPage";
import AdminPage from "./AdminPage";
function App() {
    return (<div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-register" element={<LoginRegisterPage />} />
                <Route path="/profile" element={<ProfilePage/>} ></Route>
                <Route path="/products" element={<ProductsPage></ProductsPage>}> </Route>
                <Route path="/admin-page" element={<AdminPage></AdminPage>}></Route>
            </Routes>
    </div> );
}
export default App;