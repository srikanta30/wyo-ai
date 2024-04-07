import './ProductConfig.css';

import tShirtImage from '../../assets/tshirt.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { makeRequest } from '../../utils/makeRequest';
import { useContext } from 'react';
import MessageContext from '../../contexts/MessageContext';
import { MESSAGE_LEVELS } from '../../constants/enums';
import {
  getGeneratedPromptFromInputMethod,
  getProducts,
} from '../../constants/apiUrls';
import DropDownModal from '../../components/DropDownModal/DropDownModal';
import DialogContext from '../../contexts/DialogContext';
import OrderDataContext from '../../contexts/OrderDataContext';
import { generateImagesFromPrompt } from '../../services/image';
import ConfigLoader from '../../components/ConfigLoader/ConfigLoader';

export default function ProductConfig() {
  const navigate = useNavigate();

  const { addMessage } = useContext(MessageContext);
  const { setDialogBody } = useContext(DialogContext);
  const { orderData, setOrderData } = useContext(OrderDataContext);

  const [products, setProducts] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [images, setImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState('S');
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState('Black');
  const [handleBackImageURL, setHandleBackImageURL] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (orderData?.imagesData) {
      setSelectedImage(
        (prev) =>
          orderData?.selectedImage ||
          prev ||
          orderData?.imagesData?.data?.message?.imageUrls?.[0],
      );
      setSelectedSize((prev) => orderData?.selectedSize ?? prev);
      setSelectedColor((prev) => orderData?.selectedColor ?? prev);
      setImages(
        (prev) => orderData?.imagesData?.data?.message?.imageUrls ?? prev,
      );
      setLoading(false);
    } else getAndSetImageDataFromPrompt();
  }, [orderData]);

  async function getAndSetImageDataFromPrompt() {
    if (orderData?.inputPrompt || orderData?.customPrompt) {
      const inputPrompt = orderData?.inputPrompt;
      const customPrompt = orderData?.customPrompt;
      try {
        let generatedPrompt;
        if (inputPrompt)
          generatedPrompt = (
            await makeRequest(getGeneratedPromptFromInputMethod(inputPrompt))
          ).data;
        else generatedPrompt = customPrompt;
        const imagesData = await generateImagesFromPrompt(generatedPrompt);

        setOrderData({
          ...orderData,
          generatedPrompt,
          imagesData,
        });

        setLoading(false);
        return {
          ...orderData,
          generatedPrompt,
          imagesData,
        };
      } catch (err) {
        console.error(err);
        const errorMessage =
          err?.response?.data?.status?.message ??
          'Something went wrong while generating images, please try again';
        addMessage({
          level: MESSAGE_LEVELS.ERROR,
          message: errorMessage,
        });

        if (err.message === 'Max number of retries exceeded') navigate(-1);
      }
    }
  }

  const SearchProducts = (products, color, size) => {
    if (!products) {
      return null;
    }
    const lowerCaseColor = color.toLowerCase();
    const lowerCaseSize = size.toLowerCase();

    const filteredProducts = products.filter((product) => {
      return (
        product.color.toLowerCase() === lowerCaseColor &&
        product.size.toLowerCase() === lowerCaseSize
      );
    });

    if (filteredProducts.length > 0) {
      setOrderDetails(filteredProducts[0]);
      return filteredProducts[0];
    } else {
      return null;
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOrderData({
      ...orderData,
      selectedImage: image,
    });
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setOrderData({
      ...orderData,
      selectedColor: color,
    });

    const product = SearchProducts(products, color, selectedSize);

    if (product) {
      setHandleBackImageURL(product.image_link);
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setOrderData({
      ...orderData,
      selectedSize: size,
    });
    const product = SearchProducts(products, selectedColor, size);
    if (product) {
      console.log('product', product);
      setHandleBackImageURL(product.image_link);
    }
  };

  const handleAddToCart = () => {
    if (loading) return;

    setDialogBody(
      <DropDownModal
        onSuccessfullOrder={() => {
          setDialogBody(null);
          setOrderData({});
          navigate('/');
        }}
        image_url={selectedImage}
        orderDetails={orderDetails}
      />,
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const orderData = JSON.parse(localStorage.getItem('orderData'));
        const response = await makeRequest(
          getProducts(orderData?.parentProduct?.parent_sku),
        );
        setProducts(response?.data);
        setHandleBackImageURL(
          SearchProducts(response?.data, selectedColor, selectedSize)
            .image_link,
        );
      } catch (error) {
        if (error?.response?.data?.status?.message) {
          addMessage({
            level: MESSAGE_LEVELS.ERROR,
            message: error.response.data.status.message,
          });

          return;
        }
        addMessage({
          level: MESSAGE_LEVELS.ERROR,
          message: 'Something went wrong, please try again',
        });
      }
    };

    fetchProducts();
  }, []);

  const handleMoreOptionsClick = async () => {
    setLoading(true);
    delete orderData?.selectedImage;
    const _orderData = await getAndSetImageDataFromPrompt();
    if (!_orderData) return;
    setSelectedImage(_orderData?.imagesData?.data?.message?.imageUrls?.[0]);
  };

  return (
    <div className="product-page">
      <div className="product-img-container">
        <img
          src={handleBackImageURL ? `${handleBackImageURL}` : tShirtImage}
          width={400}
          height={400}
          alt="plain t shirt image"
        />

        {loading && (
          <ConfigLoader
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: '80px',
              height: '80px',
            }}
          />
        )}

        {!loading && selectedImage && (
          <img src={selectedImage} className="selected-decoration-img-over-t" />
        )}
      </div>
      <div className="product-configuration-container">
        <div className="config-selector-container">
          <p className="space-btwn">
            <span>Your Images</span>
            <button onClick={handleMoreOptionsClick} className="pink-underline">
              More Options
            </button>
          </p>
          <div className="config-selector">
            {loading
              ? [1, 2, 3, 4].map((_, idx) => (
                  <ConfigLoader
                    key={idx}
                    style={{
                      width: '80px',
                      height: '80px',
                    }}
                  />
                ))
              : images.map((img, idx) => (
                  <img
                    className={`config-img ${
                      selectedImage === img ? 'selected-config-img' : ''
                    }`}
                    width={80}
                    height={80}
                    src={img}
                    key={idx}
                    onClick={() => handleImageClick(img)}
                  />
                ))}
          </div>
        </div>

        <div className="config-selector-container">
          <p>Colors</p>
          <div className="config-selector">
            {['Black', 'Yellow'].map((color, idx) => (
              <div
                style={{
                  backgroundColor: color,
                  border: selectedColor === color ? '2px solid white' : 'none',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  minWidth: '48px',
                  minHeight: '48px',
                }}
                className="config-img"
                key={idx}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
        </div>
        <div className="config-selector-container">
          <p className="space-btwn">
            <span>Size</span>
            <Link to="#" className="pink-underline">
              Size Chart
            </Link>
          </p>
          <div className="config-selector">
            {['XL', 'L', 'M', 'S'].map((size, idx) => (
              <div
                className={`config-size ${
                  selectedSize === size ? 'config-size-selected' : ''
                }`}
                key={idx}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <div className="product-actions-container">
          <button
            style={{
              backgroundColor: 'rgba(183, 66, 255, 0.16)',
            }}
            disabled={loading}
            onClick={() => {
              if (loading) return;
              navigate(-1);
            }}
          >
            Edit Prompt
          </button>
          <button
            style={{
              background: 'linear-gradient(180deg, #B742FF 0%, #FF007A 100%)',
            }}
            onClick={handleAddToCart}
            disabled={loading}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
