import React, { Suspense } from 'react';
import { Home } from './Pages/Home';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import './scss/app.scss';

const Cart = React.lazy(() => import(/*webpackChunkName: 'Cart'*/'./Pages/Cart'));
const NotFound = React.lazy(() => import(/*webpackChunkName: 'NotFound'*/'./Pages/NotFound'));
const FullPizzaInfo = React.lazy(() => import(/*webpackChunkName: 'FullPizzaInfo'*/'./Pages/FullPizzaInfo'));

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path='' element={<Home />} />
                <Route path='cart' element={
                    <Suspense fallback={<div>Завантаження...</div>}>
                        <Cart />
                    </Suspense>
                } 
                />
                <Route path='pizza/:id' element={
                    <Suspense fallback={<div>Завантаження...</div>}>
                        <FullPizzaInfo />
                    </Suspense>
                } 
                />
                <Route path='*' element={
                    <Suspense fallback={<div>Завантаження...</div>}>
                        <NotFound />
                    </Suspense>
                } 
                />
            </Route>
        </Routes>
    )
}

export default App;