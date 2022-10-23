import { useState } from "react";

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const categories = ['Все', 'Мясные','Вегетарианская',
                      'Гриль', 'Острые', 'Закрытые'];

  const categoriesList = categories.map((el, index) => {
    return <li key={index}
              className={activeIndex === index ? 'active' : ''}
              onClick={() => setActiveIndex(index)}>
                {el}
            </li>
  })

  return (
    <div className="categories">
      <ul>
        {categoriesList}
      </ul>
    </div>
  );
};

 
