import React from "react";

type CategoriesProps = {
  value: number,
  onChangeCategory: (index: number) => void,
}

export const Categories: React.FC<CategoriesProps> = ({value, onChangeCategory}) => {  
  const categories = ['Всі', 'М\'ясні','Вегетаріанські',
                      'Гриль', 'Гострі', 'Закрыті'];

  const categoriesList = categories.map((el, index) => {
    return <li key={index}
              className={value === index ? 'active' : ''}
              onClick={() => onChangeCategory(index)}>
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

 
