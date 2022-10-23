import { useState } from "react";

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const categories = ['Все', 
                          'Мясные',
                          'Вегетарианская',
                          'Гриль', 
                          'Острые', 
                          'Закрытые'];
  const categoriesList = categories.map((el, index) => {
    return <li key={index}
              className={activeIndex === index ? 'active' : ''}
              onMouseEnter={(e) => onSetActiveClass(index)}
              onMouseLeave={(e) => onRemoveActiveClass(index)}>
                {el}
            </li>
  })
  
  const onSetActiveClass = (index) => {
    setActiveIndex(index);
  }

  const onRemoveActiveClass = (e) => {
    setActiveIndex(null);
  }

  return (
    <div className="categories">
      <ul>
        {categoriesList}
      </ul>
    </div>
  );
};

 
