import { useState, useEffect, useContext } from 'react';
import { makeRequest } from '../../utils/makeRequest';
import { getStores, createOrder } from '../../constants/apiUrls';
import MessageContext from '../../contexts/MessageContext';
import { MESSAGE_LEVELS } from '../../constants/enums';
import './DropDownModal.css';

export default function DropDownModal(props) {
  const [stores, setStores] = useState(null);
  const [selectedStore, setSelectedStore] = useState('');
  const { addMessage } = useContext(MessageContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storeId = stores.find((store) => store.location === selectedStore).id;
    try {
      await makeRequest(
        createOrder({
          store_id: storeId,
          image_url: props?.image_url,
          order_details: props?.orderDetails,
        }),
      );
      addMessage({
        level: MESSAGE_LEVELS.SUCCESS,
        message: 'Order placed successfully',
      });

      props.onSuccessfullOrder();
    } catch (error) {
      console.error(error);
      addMessage({
        level: MESSAGE_LEVELS.ERROR,
        message: 'Something went wrong',
      });
    }
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await makeRequest(getStores());
        setStores(response.data);
      } catch (error) {
        addMessage({
          level: MESSAGE_LEVELS.ERROR,
          message: 'Something went wrong',
        });
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="drop-down">
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
        }}
      >
        <label htmlFor="store-dropdown">Select Store</label>
        <br />
        <select
          className="drop-down-input"
          id="store-dropdown"
          onChange={(e) => setSelectedStore(e.target.value)}
          value={selectedStore}
          required
        >
          <option value="" disabled>
            Select a store
          </option>
          {stores &&
            stores.map((store) => (
              <option key={store.id} value={store.location}>
                {store.location}
              </option>
            ))}
        </select>
        <br />
        <br />
        <input
          type="checkbox"
          id="drop-down-accept-terms"
          name="acceptedTerms"
          required
        />
        <span htmlFor="login-accept-terms">
          &nbsp; Are you sure to place the order{' '}
        </span>
        <br />
        <br />
        <br />
        <button type="submit" className="submit-button">
          Place Order
        </button>
      </form>
    </div>
  );
}
