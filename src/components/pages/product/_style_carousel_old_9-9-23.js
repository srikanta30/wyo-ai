import { useEffect, useState } from "react";
import { API_BASE_URL, IMAGE_PATH } from '../../../config/config';
const StyleCarousel = (prob) => {
    const [list, setList] = useState('');
    useEffect(() => {
        setStyleList(prob.allStyles);
    }, [prob.allStyles]);


    function activeSelectedStyle(e){
        const elements = document.getElementsByClassName('style-carousel');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('active');
        }
        e.currentTarget.classList.add('active');
    }


    function setStyleList(allStyles) {
        let listArr = [];
        let innerContent = [];
        let i = 0;
        let activeClass = 'active';
        let noneOpt = true;
        allStyles.map((row, j) => {
            i++;
            if(noneOpt){
                innerContent.push(
                    <div className="col-3 float-left" key={'col1'+j}>
                        <div className="carousel-box-container style-carousel" onClick={(e) => {activeSelectedStyle(e); prob.setStyle('')}}>
                            <img className="carousel-img random_img" src="random-icon.png" />
                            <div key="rands123" className="style-item">Random</div>
                        </div>
                        
                    </div>
                );
                noneOpt =false;
                i++;
            }
            
            innerContent.push(
                <div className="col-3 float-left" key={'col2'+j}>
                    <div className="carousel-box-container style-carousel" onClick={(e) => {activeSelectedStyle(e); prob.setStyle(row.style_name)}}>
                        <img className="carousel-img" src={API_BASE_URL + IMAGE_PATH + row.style_icon} />
                        <div key={row.style_name} className="style-item">{row.style_name}</div>
                    </div>
                </div>
            );
            if (i === 4) {
                listArr.push(
                    <div className={`carousel-item row no-gutters ${activeClass}`} key={'cont2'+j}>
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
                <div className={`carousel-item row no-gutters`} key={'cont2'+i}>
                    {innerContent}
                </div>
            );
        }
        setList(listArr);
    }
    return (
        <>
            <div id="styleCarousel" className="carousel slide w-100"  data-interval="false">
                <div className="carousel-inner w-100" role="listbox">
                    {list}
                </div>
                <a className="carousel-control-prev" href="#styleCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true">
                        <i className="fas fa-chevron-circle-left"></i>
                    </span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#styleCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true">
                        <i className="fas fa-chevron-circle-right"></i>
                    </span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

        </>
    )
}

export default StyleCarousel;