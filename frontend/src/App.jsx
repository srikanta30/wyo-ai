import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Design from './pages/Design/Design';
import Navbar from './components/Navbar/Navbar';
import { DialogContextProvider } from './contexts/DialogContext';
import ProductConfig from './pages/ProductConfig/ProductConfig';
import CustomPrompt from './pages/CustomPrompt/CustomPrompt';
import { MessageContextProvider } from './contexts/MessageContext';
import SecureRoute from './components/SecureRoute/SecureRoute';
import { OrderDataContextProvider } from './contexts/OrderDataContext';

function App() {
  return (
    <>
      <div className="decorative-sphere top-right"></div>
      <div className="decorative-sphere center-left"></div>
      <BrowserRouter>
        <MessageContextProvider>
          <OrderDataContextProvider>
            <DialogContextProvider>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/product"
                    element={
                      <SecureRoute>
                        <Product />
                      </SecureRoute>
                    }
                  />
                  <Route
                    path="/design"
                    element={
                      <SecureRoute>
                        <Design />
                      </SecureRoute>
                    }
                  />
                  <Route
                    path="/custom-prompt"
                    element={
                      <SecureRoute>
                        <CustomPrompt />
                      </SecureRoute>
                    }
                  />
                  <Route
                    path="/product-config"
                    element={
                      <SecureRoute>
                        <ProductConfig />
                      </SecureRoute>
                    }
                  />
                </Routes>
              </main>
            </DialogContextProvider>
          </OrderDataContextProvider>
        </MessageContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
