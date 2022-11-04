import React from 'react';
import { Home } from './Pages/Home';
import { Cart } from './Pages/Cart';
import { NotFound } from './Pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import { FullPizzaInfo } from './Pages/FullPizzaInfo';
import { MainLayout } from './layouts/MainLayout';
import './scss/app.scss';

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path='' element={<Home />} />
                <Route path='cart' element={<Cart />} />
                <Route path='pizza/:id' element={<FullPizzaInfo />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App;