import logo from './logo.svg';
import './App.css';
import Header from './components/parts/Header';
import Footer from './components/parts/Footer';
//import Home from './components/pages/Home';

import { BrowserRouter} from 'react-router-dom';
import AllRoutes from './routes/index';

function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
        <AllRoutes />
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
