import { useEffect, useState } from "react";
import { API_BASE_URL, IMAGE_PATH } from '../../../config/config';
const ThemeCarousel = (prob) => {
    const [list, setList] = useState('');
    
    useEffect(() => {
        setThemeList(prob.allThemes);
    }, [prob.allThemes]);
 

    function setThemeList(allThemes) {
        let listArr = [];
        let innerContent = []; 
        let i = 0;
        let activeClass = 'active';
        let noneOpt = true;
        allThemes.map((row, j) => {
            i++;
            if(noneOpt){
                innerContent.push(
                    <div className="col-3 float-left" key={'clo'+j}>
                        <div className="carousel-box-container theme-carousel" onClick={(e) => {activeSelectedStyle(e); prob.setTheme('')}}>
                            <img className="carousel-img random_img"  src="random-icon.png" />
                            <div key="rands123" className="style-item">Random</div>
                        </div>
                        
                    </div>
                );
                noneOpt =false;
                i++;
            }
            
            innerContent.push(
                <div className="col-3 float-left" key={'cl'+j}>
                    <div className="carousel-box-container theme-carousel" onClick={(e) => {activeSelectedStyle(e); prob.setTheme(row.theme)}}>
                        <img className="carousel-img" src={API_BASE_URL + IMAGE_PATH + row.icon_image} />
                        <div key={row.theme} className="style-item">{row.theme}</div>
                    </div>
                </div>
            );
            if (i === 4) {
                listArr.push(
                    <div className={`carousel-item row no-gutters ${activeClass}`} key={'thmin'+j}>
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
                <div className={`carousel-item row no-gutters ${activeClass ===''? '' : 'active'}`} key={'thm'+i}>
                    {innerContent}
                </div>
            );
        }
        setList(listArr);
    }


    function activeSelectedStyle(e){
        const elements = document.getElementsByClassName('theme-carousel');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('active');
        }
        e.currentTarget.classList.add('active');
    }
    return (
        <>
            <div id="themeCarousel" className="carousel slide w-100" data-interval="false">
                <div className="carousel-inner w-100" role="listbox">
                    {list}
                </div>
                <a className="carousel-control-prev" href="#themeCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true">
                        <i className="fas fa-chevron-circle-left"></i>
                    </span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#themeCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true">
                        <i className="fas fa-chevron-circle-right"></i>
                    </span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

        </>
    )
}

export default ThemeCarousel;