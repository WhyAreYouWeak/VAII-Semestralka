import {Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import LoginRegisterPage from "./LoginRegisterPage";
import ProfilePage from "./ProfilePage";
import ProductsPage from "./ProductsPage";
function App() {
    return (<div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-register" element={<LoginRegisterPage />} />
                <Route path="/profile" element={<ProfilePage/>} ></Route>
                <Route path="/products" element={<ProductsPage></ProductsPage>}> </Route>
            </Routes>
    </div> );
}
export default App;