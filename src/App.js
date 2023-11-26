import NavBar from "./components/NavBar";
import {Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import LoginRegisterPage from "./LoginRegisterPage";

function App() {
    return (<div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-register" element={<LoginRegisterPage />} />
            </Routes>
    </div> );
}
export default App;