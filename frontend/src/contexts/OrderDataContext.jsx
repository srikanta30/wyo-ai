import { createContext, useEffect, useState } from 'react';
import { getFromStorage, setInStorage } from '../utils/storage';
import { ORDER_DATA_STORAGE_KEY } from '../constants/constants';

const OrderDataContext = createContext({
  orderData: {},
  setOrderData: () => null,
});

export function OrderDataContextProvider({ children }) {
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const _orderData = getFromStorage(ORDER_DATA_STORAGE_KEY);
    if (_orderData) {
      setOrderData(_orderData);
    }
  }, []);

  const _setOrderData = (data) => {
    setInStorage(ORDER_DATA_STORAGE_KEY, data);
    setOrderData(data);
  };

  return (
    <OrderDataContext.Provider
      value={{ orderData, setOrderData: _setOrderData }}
    >
      {children}
    </OrderDataContext.Provider>
  );
}

export default OrderDataContext;
