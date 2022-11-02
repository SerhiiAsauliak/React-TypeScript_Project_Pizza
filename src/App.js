import { Header } from './components/Header/Header';
import './scss/app.scss';
import { Home } from './Pages/Home';
import { Cart } from './Pages/Cart';
import { NotFound } from './Pages/NotFound';
import { Routes, Route } from "react-router-dom";
import { FullPizzaInfo } from './Pages/FullPizzaInfo';

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/pizza/:id" element={<FullPizzaInfo />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    )
}

export default App;