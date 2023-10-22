import HomeContainer from '../containers/HomeContainer'
import PromptContainer from '../containers/PromptContainer';
import AuthContainer from '../containers/AuthContainer';
import ProductContainer from '../containers/ProductContainer';
import { Route, Routes } from 'react-router-dom';
 
const AllRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<HomeContainer/>}/>
            <Route path="/prompt" element={<PromptContainer/>}/>
            <Route path="/user-auth" element={<AuthContainer/>}/>
            <Route path="/product" element={<ProductContainer/>}/>
        </Routes>  
    );
}

export default AllRoutes;