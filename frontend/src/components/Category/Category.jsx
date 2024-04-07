import './Category.css';
import { useContext } from 'react';
import ClothCategory from '../ClothCategory/ClothCategory';
import { useState } from 'react';
import { makeRequest } from '../../utils/makeRequest';
import { getProductsByCategory } from '../../constants/apiUrls';
import MessageContext from '../../contexts/MessageContext';
import { MESSAGE_LEVELS } from '../../constants/enums';
import OrderDataContext from '../../contexts/OrderDataContext';

export default function Category() {
  const { addMessage } = useContext(MessageContext);
  const [selectedGender, setSelectedGender] = useState(null);
  const [products, setProducts] = useState(null);

  const { orderData, setOrderData } = useContext(OrderDataContext);

  const handleCategoryClick = async (category) => {
    setSelectedGender(category);

    try {
      const response = await makeRequest(getProductsByCategory(category));
      setProducts(response?.data);
    } catch (error) {
      console.error(error.message);

      if (error?.response?.data?.status?.message) {
        addMessage({
          level: MESSAGE_LEVELS.ERROR,
          message: error.response.data.status.message,
        });

        return;
      }

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

  return selectedGender ? (
    <ClothCategory productData={products} />
  ) : (
    <div className="category-body">
      <div className="title">Select category</div>
      <div
        className="category-card category-bg1"
        onClick={() => handleCategoryClick('MEN')}
      >
        <span className="category-card-title" style={{ color: '#4D818A' }}>
          MEN
        </span>
      </div>
      <div
        onClick={() => handleCategoryClick('WOMEN')}
        className="category-card category-bg2"
      >
        <span className="category-card-title" style={{ color: '#62394C' }}>
          WOMEN
        </span>
      </div>
      <div
        onClick={() => handleCategoryClick('KIDS')}
        className="category-card category-bg3"
      >
        <span className="category-card-title" style={{ color: '#434954' }}>
          KIDS
        </span>
      </div>
    </div>
  );
}
