import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import './ClothCategory.css';
import HorizontalLineSvg from '../../assets/small-horizontal-line.svg';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';
import OrderDataContext from '../../contexts/OrderDataContext';

const categories = [
  { id: 1, name: 'T-shirt', imgClass: 'img1' },
  { id: 2, name: 'Hoodies', imgClass: 'img2' },
  { id: 3, name: 'Sweatshirt', imgClass: 'img3' },
  { id: 4, name: 'Polo T-shirt', imgClass: 'img5' },
];

export default function ClothCategory(props) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('T-shirt');

  const [categoryProductsMap, setCategoryProductsMap] = useState({});

  const { orderData, setOrderData } = useContext(OrderDataContext);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log('category', category);
  };

  const handleCardClick = (card) => {
    setOrderData({
      ...orderData,
      parentProduct: card,
    });
    navigate(`/design`);
  };

  useEffect(() => {
    if (props?.productData) {
      const categoryMap = {};
      props.productData.forEach((product) => {
        const categoryType = product.category_type;
        if (!categoryMap[categoryType]) {
          categoryMap[categoryType] = [];
        }
        categoryMap[categoryType].push(product);
      });
      console.log(categoryMap);
      setCategoryProductsMap(categoryMap);
    }
  }, [props.productData]);

  return (
    <div className="cloth-category-body">
      <div className="cloth-category-left-container">
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            <div
              className={`category-type-card ${
                selectedCategory === category.name
                  ? 'category-type-card-clicked'
                  : ''
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div
                className={`category-type-card-img ${category.imgClass}`}
              ></div>
              <div className="category-type-card-title">{category.name}</div>
            </div>
            {index < categories.length - 1 && (
              <img src={HorizontalLineSvg} alt="horizontal-line" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="cloth-category-right-container">
        {categoryProductsMap[selectedCategory]?.map((product) => (
          <Card
            key={product.parent_sku}
            onClick={() => handleCardClick(product)}
            imgURL={product.category_img}
            title={product.category_title}
          />
        ))}
      </div>
    </div>
  );
}
