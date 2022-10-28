import { Categories } from './components/Categories/Categories';
import { Header } from './components/Header/Header';
import { PizzaBlock } from './components/Pizza-block/Pizza-block';
import { Sort } from './components/Sort/Sort';
import './scss/app.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SkeletonPizza } from './components/Pizza-block/SkeletonPizza';


function App() {
    const [pizzas, setPizzas] = useState([]); 
    const [isLoading, setIsLoading] =useState(true);

    const res = () => {
        axios.get('https://6357011f9243cf412f91c477.mockapi.io/pizzaItems')
        .then(res => {
            setPizzas(res.data);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        res();
    }, [])
    

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {isLoading 
                            ? [...new Array(6)].map((_, index) => <SkeletonPizza key={index}/>)
                            :pizzas.map((el, index) => {
                                return <PizzaBlock key={index} {...el}/>
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;