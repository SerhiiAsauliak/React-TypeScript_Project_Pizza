
export const Categories = ({value, onChangeCategory}) => {
  
  const categories = ['Все', 'Мясные','Вегетарианская',
                      'Гриль', 'Острые', 'Закрытые'];

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

 
