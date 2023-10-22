import { useState, useRef, useEffect } from "react";
import { API_BASE_URL, IMAGE_PATH } from '../../../config/config';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAttributes } from '../../../services/action/product';
import { isLoggedIn } from '../../utils';

function ProductCollection() {

    const dispatch = useDispatch();
    const [mainCategory, setMainCategory] = useState('men');
    const [productList, setProductList] = useState('');

    useEffect(() => {
        if (isLoggedIn() !== 'true') {
            window.location.href = '/';
        }
    }, [])

    useEffect(() => {
        loadParentProduct('', 'men', 'init');
    }, [])

    //load parent product by category
    function loadParentProduct(e, category, e_Type) {
        if (e_Type === 'click') {
            const elements = document.getElementsByClassName('c-img-box');
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('active');
            }
            e.currentTarget.classList.add('active');
        }
        axios.get(API_BASE_URL + "mjAPI/get-parent-product-by-category", { params: { category } })
            .then((res) => {
                setMainCategory(category);
                setParentProductList(res.data, category);
            }).catch((err) => {
                console.log(err.message);
            })
    }

    //update selected product
    function selectedParentProduct(attributes) {
        dispatch(updateProductAttributes(attributes));
    }

    //handle product type click
    function handleProductType(ref, pTypeRef1) {
        //remove class 'active'  from product tab
        const elements = document.getElementsByClassName('listContent');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('active');
        }
        //add class 'active' for current product tab
        let targetTab = ref.getAttribute('data-ptype');
        const tabElement = document.getElementById(targetTab);
        tabElement.classList.add('active');
        let currLength = 0;
        pTypeRef1.forEach((tabRef) => {
            if (tabRef.getAttribute('data-ptype') === targetTab) {
                tabRef.classList.add('active');
            } else {
                tabRef.classList.remove('active');
            }
        });
    }

    //set parent product list
    function setParentProductList(parentProducts, category) {
        let pTypeRef = [];
        let productTypelist = [];
        let productList = [];
        let inrlist = [];
        let lastType = '';
        let i = 0;
        let tab = 'productTypeTab';
        let tabIndex = 0;
        parentProducts.map((row) => {
            if (row.product_type !== lastType) {
                if (lastType !== '') {
                    let activeClass = (i === 0) ? 'listContent active' : 'listContent';
                    productList.push(<div key={tabIndex++} className={activeClass} id={tab}>{inrlist}</div>);
                    inrlist = [];
                    i++;
                }
                tab = category + 'productTypeTab' + tabIndex;
                let activeClass = (i === 0) ? 'listTitle active' : 'listTitle';
                productTypelist.push(<div key={tabIndex++} className={`${activeClass}`} ref={(el) => (pTypeRef.push(el))} onClick={(e) => handleProductType(e.currentTarget, pTypeRef)} data-ptype={tab}><img className="product-type-img" src={API_BASE_URL + IMAGE_PATH + row.product_type_icon} /> {row.product_type}</div>);
                lastType = row.product_type;
            }
            inrlist.push(<div key={tabIndex++} className="pp-box-container" onClick={() => selectedParentProduct(row)}><div className="p_img"><img src={API_BASE_URL + IMAGE_PATH + row.product_img} /></div><div className="p-title">{row.product_title} <br></br><div className="badge badge-warning">{row.print_type} Print</div></div></div>);
        }
        )
        let activeClass = (i === 0) ? 'listContent active' : 'listContent';
        productList.push(<div key={tabIndex++} className={activeClass} id={tab}>{inrlist}</div>);
        setProductList({ productTypeList: productTypelist, productList: productList })
    }

    return (
        <div className="">
            {/* top section #main category selection */}
            <div>
                <div className="row">
                </div>
                <div className='collection-container'>
                    <div className='inner-c-container'>
                        <div className='c-img-box title-only'>
                            <div>Select Your Product</div>
                        </div>
                        <div className='c-img-box active' onClick={(e) => loadParentProduct(e, 'men', 'click')}>
                            <h6>MEN</h6>
                            <img src='mens.png' />
                        </div>
                        <div className='c-img-box' onClick={(e) => loadParentProduct(e, 'women', 'click')}>
                            <h6>WOMEN</h6>
                            <img src='women.png' />
                        </div>
                        <div className='c-img-box' onClick={(e) => loadParentProduct(e, 'kids', 'click')}>
                            <h6>KIDS</h6>
                            <img src='kids.png' />
                        </div>
                    </div>
                </div>
            </div>

            {/* parent product list */}
            <div className="productListContainer">
                <div className="col25">
                    <div className="listTitleTab" key={`ptype${mainCategory}`}>
                        {productList.productTypeList}
                    </div>
                </div>
                <div className="col75">
                    <div className="productListTab" key={mainCategory}>
                        {productList.productList}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductCollection;