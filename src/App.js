import { Categories } from './components/Header/Categories/Categories';
import { Header } from './components/Header/Header/Header';
import { PizzaBlock } from './components/Header/Pizza-block/Pizza-block';
import { Sort } from './components/Header/Sort/Sort';
import './scss/app.scss';
import pizzas from './pizzas.json';


function App() {
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
                        {pizzas.map((el, index) => {
                            return <PizzaBlock key={index} {...el}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;