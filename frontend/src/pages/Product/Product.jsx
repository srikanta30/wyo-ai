import { useState, useContext, useEffect } from 'react';
import './Product.css';
import Category from '../../components/Category/Category';
import ClothCategory from '../../components/ClothCategory/ClothCategory';
import { useMediaQuery } from 'react-responsive';
import { makeRequest } from '../../utils/makeRequest';
import { getProductsByCategory } from '../../constants/apiUrls';
import MessageContext from '../../contexts/MessageContext';
import { MESSAGE_LEVELS } from '../../constants/enums';
import OrderDataContext from '../../contexts/OrderDataContext';

export default function Product() {
  const { addMessage } = useContext(MessageContext);

  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 834px)' });

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [products, setProducts] = useState(null);

  const { orderData, setOrderData } = useContext(OrderDataContext);
  // Function to handle category selection
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);

    try {
      const response = await makeRequest(getProductsByCategory(category));
      if (response?.status?.code != 200) {
        addMessage({
          level: MESSAGE_LEVELS.ERROR,
          message: response?.status ?? response?.status?.message,
        });
        return;
      }
      setProducts(response?.data);
    } catch (error) {
      console.error(error.message);
      addMessage({
        level: MESSAGE_LEVELS.ERROR,
        message: 'Something went wrong',
      });
    }

    setOrderData({
      ...orderData,
      gender: category,
    });
  };

  useEffect(() => {
    handleCategoryClick('MEN');
  }, []);

  return isMobileOrTablet ? (
    <Category />
  ) : (
    <div>
      <div className="web-category-selection-container">
        <div className="web-category-selection-inner-container">
          <div className="web-category-selection-title">Select category</div>
          <div className="web-category-selection-body">
            <div
              onClick={() => handleCategoryClick('MEN')}
              style={{
                border:
                  selectedCategory === 'MEN'
                    ? '1px solid var(--Gredient, #b742ff)'
                    : '1px solid #454545',
                opacity: selectedCategory === 'MEN' ? '1' : '0.4',
              }}
              className="web-category-men category-bg1"
            >
              <span className="web-category-text" style={{ color: '#4D818A' }}>
                MEN
              </span>
            </div>
            <div
              onClick={() => handleCategoryClick('WOMEN')}
              style={{
                border:
                  selectedCategory === 'WOMEN'
                    ? '1px solid var(--Gredient, #b742ff)'
                    : '1px solid #454545',
                opacity: selectedCategory === 'WOMEN' ? '1' : '0.4',
              }}
              className="web-category-men category-bg2"
            >
              <span className="web-category-text" style={{ color: '#62394C' }}>
                WOMEN
              </span>
            </div>
            <div
              onClick={() => handleCategoryClick('KIDS')}
              style={{
                border:
                  selectedCategory === 'KIDS'
                    ? '1px solid var(--Gredient, #b742ff)'
                    : '1px solid #454545',
                opacity: selectedCategory === 'KIDS' ? '1' : '0.4',
              }}
              className="web-category-men category-bg3"
            >
              <span className="web-category-text" style={{ color: '#434954' }}>
                KIDS
              </span>
            </div>
          </div>
        </div>
      </div>
      {selectedCategory && <ClothCategory productData={products} />}
    </div>
  );
}
