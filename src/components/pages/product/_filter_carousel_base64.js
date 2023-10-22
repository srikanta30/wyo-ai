import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, IMAGE_PATH } from '../../../config/config';
const ProductFilter = (prob) => {

    const storeData = useSelector((state) => state);
    const [productFilters, setProductFilters] = useState([]);
    const [imgIndex, setImgIndex] = useState(null);
    const [list, setList] = useState('');

 
    // get filters
    useEffect(() => {
        if (storeData.product.color !== undefined && prob.designImage !== undefined) {
            get_filters(storeData.product.attributes.parent_sku, storeData.product.color);
        }
    }, [storeData.product.color, prob.designImage, prob.designNum]);

    function get_filters(parent_sku, color) {
        axios.get(API_BASE_URL + "mjAPI/getFilters", { params: { parent_sku: parent_sku, color: color } })
            .then((res) => {
                setProductFilters(res.data);
                
                let sizeOfObject = Object.keys(res.data).length;
                let index = '';
                if (sizeOfObject > 0) {
                    index = imgIndex===null ? randomNumberGenerator(sizeOfObject) : imgIndex;
                    setImgIndex(index);
                    
                    let img = index==='' ? '' : API_BASE_URL + IMAGE_PATH + res.data[index].image;
                    prob.applyFilterOnDesign('none', img);
                }
                filterCarousel(res.data, index);
            }).catch((err) => {
                console.log(err.message);
            })
    }

    function filterCarousel(allFilters, index) {
        let listArr = [];
        let innerContent = [];
        let i = 0;
        let noneOpt = true;
        let activeClass = 'active';
        allFilters.map((row, j) => {
            i++;
            innerContent.push(
                <div className="col-3 float-left" key={'colauto'+j}>
                    <div className="carousel-box-container filter-carousel">
                        <div className={`filterBox ${j === index ? 'active' : ''}`} onClick={(e) => { updateSelectedIndex(j); activeSelectedFilter(e); prob.applyFilterOnDesign('initial', API_BASE_URL + IMAGE_PATH + row.image) }}>
                            <div className={`filterImgContainer selectedDesign${prob.designNum}`}>
                                <img className="designImg" src={'data:image/png;base64,'+ prob.designImage} />
                                <img className="filterSmallMockup" src={API_BASE_URL + IMAGE_PATH + row.image} />
                            </div>
                            
                        </div>
                    </div>
                </div>
            );
            if (i === 4) {
                listArr.push(
                    <div className={`carousel-item row no-gutters ${activeClass}`} key={'filn'+j}>
                        {innerContent}
                    </div>
                );
                i = 0;
                innerContent = [];
                activeClass = '';

            }
        })
        if (i > 0) {
            listArr.push(
                <div className={`carousel-item row no-gutters ${activeClass}`} key={'fil2'+i}>
                    {innerContent}
                </div>
            );
        }
        setList(listArr);
    }

    function randomNumberGenerator(maxLimit) {
        const min = 0;
        const max = (maxLimit - 1);

        const random = Math.round(Math.random() * (max - min) + min);
        return random;
    }

    function activeSelectedFilter(e) {
        const elements = document.getElementsByClassName('filterBox');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('active');
        }
        e.currentTarget.classList.add('active');
    }

    function updateSelectedIndex(new_index){
        setImgIndex(new_index);
        console.log('imgIndex', new_index);
    }

    return (
        <div className="designfilter" style={{ display: prob.hideShow }}>

            <div className="filterContainer">
                <div className="text-left mt-4"><h6 className="titleH">Apply Filters</h6></div>

                <div id="filterCarousel" className="carousel slide w-100"  data-interval="false">
                    <div className="carousel-inner w-100" role="listbox">
                        {list}
                    </div>
                    <a className="carousel-control-prev" href="#filterCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true">
                            <i className="fas fa-chevron-circle-left"></i>
                        </span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#filterCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true">
                            <i className="fas fa-chevron-circle-right"></i>
                        </span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>


            </div>
        </div>
    )
}

export default ProductFilter;