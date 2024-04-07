import { Link, useNavigate } from 'react-router-dom';
import './CustomPrompt.css';
import { useContext, useEffect, useState } from 'react';
import OrderDataContext from '../../contexts/OrderDataContext';

export default function CustomPrompt() {
  const navigate = useNavigate();
  const [customPrompt, setCustomPrompt] = useState('');
  const { orderData, setOrderData } = useContext(OrderDataContext);

  useEffect(() => {
    setCustomPrompt((prev) => orderData?.customPrompt ?? prev);
  }, [orderData]);

  const createImagesFromPromptAndNavigate = async () => {
    if (customPrompt != orderData?.customPrompt)
      delete orderData?.imagesData, delete orderData?.selectedImage;

    delete orderData?.inputPrompt;
    setOrderData({
      ...orderData,
      customPrompt,
    });
    navigate('/product-config');
  };

  return (
    <div className="custom-prompt-page">
      <h1
        style={{
          fontWeight: '600',
        }}
      >
        Tell us what u want us to design our AI assistant will generate for You
      </h1>

      <br />

      <Link to="#" className="pink-underline">
        Understand the basics of a Good Prompt
      </Link>

      <br />
      <br />
      <br />

      <textarea
        className="custom-prompt-input"
        wrap="hard"
        type="text"
        name="customPrompt"
        id="custom-prompt"
        placeholder="Type your prompt here..."
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
      />

      <br />
      <br />

      <button
        className="generate-btn"
        onClick={createImagesFromPromptAndNavigate}
      >
        Generate
      </button>
    </div>
  );
}
