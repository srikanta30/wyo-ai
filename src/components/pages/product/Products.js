import ProductView from './product_view'
import ProductCollection from './productCollection'
import { useSelector } from "react-redux";

function Product() {
    const storeData =  useSelector((state) => state);

   return (
    <div className="container mt-3">
        { Object.keys(storeData.product).length ?  (!storeData.product.attributes.parent_sku? <ProductCollection />: '') :<ProductCollection />}
        { Object.keys(storeData.product).length? (storeData.product.attributes.parent_sku? <ProductView /> : '') : ''}
    </div>
   )
}
export default Product;