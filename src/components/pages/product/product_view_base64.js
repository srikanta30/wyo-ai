import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL, IMAGE_PATH } from '../../../config/config';
import { updateSelectedProductColor } from '../../../services/action/product';
import { setReqTime } from '../../../services/action/promptAction'
import axios from "axios";

import StyleCarousel from './_style_carousel';
import ThemeCarousel from "./_theme_carousel";
import ProductFilter from "./_filter_carousel";
import SplitImage from './_split_image';
import ChatGPT from "./_chatGPT";
import RecentDesign from "./_my_recent_designs";

function ProductView() {
    //store
    const dispatch = useDispatch();
    const storeData = useSelector((state) => state);
    const canvasRef = useRef(null);
    console.log(storeData)
    const [togglePage, setTogglePage] = useState('chatGPT');
    const [chatGPTPrompt, setChatGPTPrompt] = useState('');
    const [chatGPTAllPrompts, setChatGPTAllPrompts] = useState('');
    const [chatGPTCurrIndex, setChatGPTCurrIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedColorName, setSelectedColorName] = useState('');
    const [selectedColorImg, setSelectedColorImg] = useState('');
    const [products, setProducts] = useState([]);
    const [productColors, setproductColors] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [selectedImg, setSelectedImg] = useState('');
    const [promptInput, setPromptInput] = useState('');
    const [designNum, setDesignNum] = useState(1);
    const [splitImages, setSplitImages] = useState([]);
    const [reloadCanvas, setReloadCanvas] = useState('rand');
    const [selectedThumbnail, setThumbnail] = useState(storeData.product.attributes.print_type === 'Chest' ? 'design-container' : 'design-container-f-aop');
    const [mainImgType, setMainImgType] = useState(storeData.product.attributes.print_type === 'Chest' ? 'main-img' : 'main-img aop-img');
    const [promptFilter, setPromptFilter] = useState(1);
    const [promptResult, setPromptResult] = useState('');
    const [preloader, setPreloader] = useState('preloader_hide');
    const [hideShow, setHideShow] = useState('none');
    const [hideShowFilter, setHideShowFilter] = useState('none');
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [tempImg, setTempImg] = useState('');
    const [refreshCount, setRefreshCount] = useState(0);
    // const [topPosition, setTopPosition] = useState(0);
    // const [leftPosition, setLeftPosition] = useState(35);
    const [allThemes, setAllThemes] = useState([]);
    const [allStyles, setAllStyles] = useState([]);
    let [promptRequest, setPromptRequest] = useState(false);
    const [selectedDesignFilter, setSelectedDesignFilter] = useState({ display: 'none', filterImg: '' });
    //tile image
    //const [imageUrl, setImageUrl] = useState('http://localhost:3000/i.png');
    const [imageUrl, setImageUrl] = useState('');
    const [tileWidth, setTileWidth] = useState(1);

    useEffect(() => {
        //get themes data
        axios.get(API_BASE_URL + "mjAPI/getThemes", { params: { print_type: storeData.product.attributes.print_type } })
            .then((res) => {
                setAllThemes(res.data);
            }).catch((err) => {
                console.log(err.message);
            });

        //get style data
        axios.get(API_BASE_URL + "mjAPI/getStyles")
            .then((res) => {
                setAllStyles(res.data);
            }).catch((err) => {
                console.log(err.message);
            })
    }, []);
    //get product by parent sku
    useEffect(() => {
        axios.get(API_BASE_URL + "mjAPI/getProductByParentSku", {
            params: { sku: storeData.product.attributes.parent_sku }
        })
            .then((res) => {
                const resutls = res.data;
                setProducts(res.data);
                setSelectedImg(API_BASE_URL + IMAGE_PATH + res.data[0].image_link);
                setSelectedColor(res.data[0].color_code);
                dispatch(updateSelectedProductColor(res.data[0].color));

                setSelectedColorImg(API_BASE_URL + IMAGE_PATH + res.data[0].pattern_img);
                //unique data for color key
                const uniqueProducts = [...new Map(resutls.map(item =>
                    [item['color'], item])).values()];
                setproductColors(uniqueProducts);
                //unique data for color key
                const uniqueProductSizes = [...new Map(resutls.map(item =>
                    [item['size'], item])).values()];
                setProductSizes(uniqueProductSizes);
            }).catch((err) => {
                console.log(err.message);
            })
    }, [storeData.product.parentSKU]);
    //update color on click
    function updateSelectedColor(color_code, product_img, pattern_img, color_name) {
        setSelectedColor(color_code);
        setSelectedColorName(color_name);
        dispatch(updateSelectedProductColor(color_name));
        setSelectedImg(API_BASE_URL + IMAGE_PATH + product_img);
        setSelectedColorImg(API_BASE_URL + IMAGE_PATH + pattern_img)
    }
    //update prompt input change
    function handlePromptInvput(val) {
        setPromptInput(val);
    }

    //change image position on slider
    function adjustAopPosition(val, type) {
        // if (type === 'TB') {

        //     let top = -30 + parseInt(val);
        //     setTopPosition(top);
        // }

        // if (type === 'LR') {
        //     let left = val <= 50 ? (-15 + parseInt(val)) : (-15 + parseInt(val));
        //     setLeftPosition(left);
        // }
    }
    //MJ API Call
    useEffect(() => {
        generateMjImage();
    }, [chatGPTPrompt]);
    function generateMjImage() {
        //if no request found
        if (promptRequest === false) {
            const styleAppend = selectedStyle ? ', ' + selectedStyle + ' design' : '';
            const promptInp = chatGPTPrompt ? chatGPTPrompt : promptInput + styleAppend;
            if (promptInp.length > 10) {
                setPromptRequest(true);
                setHideShow('block');
                setHideShowFilter('none');
                setPreloader('preloader');
                let currTime = Date.now();
                dispatch(setReqTime(currTime));
                axios.get(API_BASE_URL + "mjAPI/ask", { params: { promptData: promptInp + '', currTime: currTime } })
                    .then((res) => {
                        if (res.data.fileName === null) {
                            setPreloader('preloader_hide');
                            setPromptRequest(false);
                            setHideShow('none');
                        } else {
                            setPromptResult(res.data);
                            setPreloader('preloader_hide');
                            setPromptRequest(false);
                            setHideShowFilter('block');
                        }
                    }).catch((err) => {
                        console.log(err.message);
                        setPromptRequest(false);
                    })
            } else {
                //alert('Please provide a valid prompt.');
            }
        } else {
            alert('Please Wait...');
        }
    }
    //set selected theme
    function setTheme(theme) {
        setSelectedTheme(theme);
    }
    //set selected theme
    function setStyle(style) {
        setSelectedStyle(style);
    }

    //thumbain selection
    function handleThumbnailSelection(e, val) {
        let class_name = storeData.product.attributes.print_type === 'Chest' ? 'design-container selectedImg' + val : 'design-container-f-aop selectedImg' + val;
        setThumbnail(class_name);
        setDesignNum(val);
        const elements = document.getElementsByClassName('thumbnailOuter');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('active');
        }
        e.currentTarget.classList.add('active');

    }
    //switch prompt filter option
    function handlePromptFilter(e, val) {
        //e.target.classList.add('active')
        setPromptFilter(val);
    }
    //apply filter
    function applyFilterOnDesign(display, img) {
        console.log('img', img)
        setSelectedDesignFilter({ display: display, filterImg: img });
    }
    //tile image
    const handleImageUrlChange = (event) => {
        setImageUrl('https://wearyouropinion.in.net/cdn_images/jpeg.png');
    };

    const handleTileWidthChange = (event) => {
        const width = parseInt(event.target.value);
        setTileWidth(width);
    };

    useEffect(() => {
        const index = designNum - 1;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        //designs vars
        let dWidth = 236;
        let dHeight = 286;
        let x = 103;
        let y = 120;
        if (storeData.product.attributes.print_type !== 'Chest') {
            dWidth = 436;
            dHeight = 475;
            x = 0;
            y = -5;
            //AOP
            if (storeData.product.attributes.print_type === 'AOP') {
                const image2 = new Image();
                image2.src = splitImages[index];
                image2.onload = () => {
                    canvas.width = 425;
                    canvas.height = 475;
                    for (let i = 0; i < tileWidth; i++) {
                        for (let j = 0; j < tileWidth; j++) {
                            context.drawImage(image2, i * (canvas.width / tileWidth), j * (canvas.height / tileWidth), canvas.width / tileWidth, canvas.height / tileWidth);
                        }
                    }
                    //main product image
                    const image = new Image();
                    image.src = selectedImg;
                    image.onload = () => {
                        context.drawImage(image, 0, 0, 436, 475);
                    };
                };
            } else {
                //full front print
                const image2 = new Image();
                image2.src = splitImages[index];
                image2.onload = () => {
                    //design image
                    context.drawImage(image2, x, y, dWidth, dHeight);
                    //main product image
                    const image = new Image();
                    image.src = selectedImg;
                    image.onload = () => {
                        context.drawImage(image, 0, 0, 436, 475);
                    };
                };
            }
        } else {



            context.fillStyle = selectedColor;
            context.fillRect(0, 0, 436, 475);
            //chest print
            const image = new Image();
            image.src = selectedImg;
            image.onload = () => {
                //main product img
                context.drawImage(image, 0, 0, 436, 475);
                //design
                const image2 = new Image();
                image2.src = splitImages[index];
                image2.onload = () => {
                    context.drawImage(image2, x, y, dWidth, dHeight);
                    if (storeData.product.attributes.filter_available === 'yes'
                        && hideShowFilter === 'block'
                        && selectedDesignFilter.filterImg != ''
                    ) {
                        const image3 = new Image();
                        image3.src = selectedDesignFilter.filterImg;
                        image3.onload = () => {
                            context.drawImage(image3, 0, 0, 436, 475);
                        };
                    }
                };
            };
        }
    }, [tileWidth, selectedImg, splitImages, reloadCanvas, selectedDesignFilter.filterImg, selectedColor]);


    function handleImageSplit(images) {
        setSplitImages(images);
        setReloadCanvas(Math.random());
    }

    // chat gpt
    function chatGPTStatus(promptData, index) {
        setTogglePage('mj');
        setChatGPTPrompt(promptData[index].prompt);
        setChatGPTAllPrompts(promptData);
        setChatGPTCurrIndex(index + 1);
    }
    //get auto prompt
    function nextChatGPTPropmt() {
        let index = chatGPTCurrIndex;
        if (index < Object.keys(chatGPTAllPrompts).length) {
            chatGPTStatus(chatGPTAllPrompts, index);
            setChatGPTCurrIndex(index + 1);
        } else {
            //alert('We can not re-generate prompt. But you can type new prompt');
            setTogglePage('chatGPT');
        }
    }

    function openChatGPT() {
        setTogglePage('chatGPT');
    }

    function applyRecentImage(img, msg_id, msg_hash) {
        //if no request found
        if (promptRequest === false) {

            setPromptRequest(true);
            setHideShow('block');
            setHideShowFilter('none');
            setPreloader('preloader');
            axios.get(API_BASE_URL + "mjAPI/getRecentImg", {
                params:
                    { image: img, message_id: msg_id, message_hsah: msg_hash }
            })
                .then((res) => {
                    setPromptResult(res.data);
                    setPreloader('preloader_hide');
                    setPromptRequest(false);
                    setHideShowFilter('block');
                }).catch((err) => {
                    console.log(err.message);
                    setPromptRequest(false);
                })

        } else {
            alert('Please Wait...');
        }
    }

    function setProductSize(e, size) {
        // setSelectedThemes(theme);
        const elements = document.getElementsByClassName('p-size');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('active');
        }
        e.currentTarget.classList.add('active');
    }

    const imgUrl = `${API_BASE_URL}imageFolder/12345${storeData.prompt.currReqTime}.webp`;
    useEffect(() => {
        let currCount = refreshCount;
        const interval = setInterval(() => {
            currCount++;
            if(currCount %3===0){
                setTempImg('');
            }else{
                setTempImg(imgUrl); 
            }
        }, 2000);
        return () => clearInterval(interval); 
        setRefreshCount(currCount);

    }, [storeData.prompt.currReqTime])





    return (
        <div>

            <div style={{ display: togglePage === 'chatGPT' ? 'block' : 'none' }}>
                <ChatGPT chatGPTStatus={chatGPTStatus} />
            </div>

            <div className="row" style={{ display: togglePage === 'mj' ? 'flex' : 'none' }}>
                <div className="col-md-6">
                    <div className="leftContainer">
                        <SplitImage designNum={designNum} handleImageSplit={handleImageSplit} promptImage={'data:image/png;base64,' + promptResult.fileName} />
                        {
                            selectedColor === '' ?
                                <div className="mainImgContainer" style={{ backgroundImage: `url(${selectedColorImg})` }}>
                                    <div className={preloader}>
                                        <div className="preloader-aop">
                                            <img src="loader.gif" />
                                        </div>
                                    </div>
                                    <canvas key={reloadCanvas} id="main_canvas" width="436" height="475" ref={canvasRef} style={{ backgroundColor: '#363859' }}></canvas>
                                </div>
                                :
                                <div className="mainImgContainer" style={{ background: selectedColor }}>
                                    <div className={preloader}>
                                        <div className="preloader-aop">
                                            <img src="loader.gif" />
                                        </div>
                                    </div>
                                    <canvas id="main_canvas" key={reloadCanvas} width="436" height="475" ref={canvasRef} style={{ backgroundColor: '#363859' }}></canvas>
                                </div>
                        }

                    </div>



                </div>
                <div className="col-md-6">
                    <div className="product-right-section">
                        {/* design images from MJ API */}
                        <div className="row">
                            <div className="col-8">
                                <h6 className="titleH">Your Images</h6>
                            </div>
                            <div className="col-4">
                                <div className="loadMoreBtn" onClick={() => nextChatGPTPropmt()}>More Options <i class="fas fa-arrow-alt-circle-right"></i></div>
                            </div>
                        </div>
                        <div className="product-main-canvas">
                            <div className="thumbnail-container" style={{ display: hideShow }}>
                                <div className="thumbnailOuter" onClick={(e) => handleThumbnailSelection(e, '1')}>
                                    <div className="thumbnail img1" key={'thum1'}>
                                        {
                                            preloader === 'preloader' ? <img key={refreshCount} className="thum-img" src={tempImg} /> :
                                                <img className="thum-img" src={'data:image/png;base64,' + promptResult.fileName} />
                                        }
 
                                        <div className={preloader}>
                                            <img src="loader.gif" />
                                        </div>
                                    </div>
                                </div>
                                <div className="thumbnailOuter" onClick={(e) => handleThumbnailSelection(e, '2')}>
                                    <div className="thumbnail img2" key={'thum2'}>
                                        {
                                            preloader === 'preloader' ? <img key={refreshCount} className="thum-img" src={tempImg} /> :
                                                <img className="thum-img" src={'data:image/png;base64,' + promptResult.fileName} />
                                        }
                                        <div className={preloader}>
                                            <img src="loader.gif" />
                                        </div>
                                    </div>
                                </div>
                                <div className="thumbnailOuter" onClick={(e) => handleThumbnailSelection(e, '3')}>
                                    <div className="thumbnail img3" key={'thum3'}>
                                        {
                                            preloader === 'preloader' ? <img key={refreshCount} className="thum-img" src={tempImg} /> :
                                                <img className="thum-img" src={'data:image/png;base64,' + promptResult.fileName} />
                                        }
                                        <div className={preloader}>
                                            <img src="loader.gif" />
                                        </div>
                                    </div>
                                </div>
                                <div className="thumbnailOuter" onClick={(e) => handleThumbnailSelection(e, '4')}>
                                    <div className="thumbnail img4" key={'thum4'}>
                                        {
                                            preloader === 'preloader' ? <img key={refreshCount} className="thum-img" src={tempImg} /> :
                                                <img className="thum-img" src={'data:image/png;base64,' + promptResult.fileName} />
                                        }
                                        <div className={preloader}>
                                            <img src="loader.gif" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* #End MJ Images */}


                        {/* Filter Section */}
                        <div className="product-filter-container">
                            {storeData.product.attributes.filter_available === 'yes' ?
                                <ProductFilter hideShow={hideShowFilter} applyFilterOnDesign={applyFilterOnDesign} designImage={promptResult.fileName} designNum={designNum} />
                                : ''}
                        </div>
                        <div className="color-container mt-3">
                            <h6 className="titleH mt-4">Choose Color</h6>
                            {
                                productColors.map((row) =>
                                    <div key={row.id + row.color} className="color-size" title={row.color} style={{ background: row.color_code ? row.color_code : 'url(' + API_BASE_URL + IMAGE_PATH + row.color_icon + ')' }} onClick={() => updateSelectedColor(row.color_code, row.image_link, row.pattern_img, row.color)}></div>
                                )
                            }
                        </div>
                        <div className="size-container">
                            <h6 className="titleH mt-4">Choose Size</h6>
                            {
                                productSizes.map((row) =>
                                    <div key={row.size_number + row.size} className="p-size" title={row.size} onClick={(e) => setProductSize(e, row.size)}>{row.size}</div>
                                )
                            }
                        </div>
                        <div className="addToCartSection">
                            <button className="btn editBtn" type="button" onClick={() => openChatGPT()}>Edit Prompt</button>
                            <button className="btn cartBtn">Add to Cart</button>
                        </div>

                        {/* <RecentDesign applyRecentImage = {applyRecentImage} />  */}

                        {/* slider 1-10 */}
                        {storeData.product.attributes.print_type === 'AOP' ?
                            <div>
                                <h6 className="text-warning">Scale Design (1-10)</h6>
                                <input type="range" id="tile-width" className="sliderIP" name="tile-width" min="1" max="10" value={tileWidth} onChange={handleTileWidthChange} />
                            </div>
                            : ''}
                        {/* {
                            storeData.product.attributes.print_type !== 'Chest' && (
                                <div className="adjust-design-container mt-3">
                                    <h6>Adjust Design</h6>
                                    <div className="border p-3">
                                        <div className="from-group">
                                            <label>Left & Right</label>
                                            <input type="range" id="points" name="points" min="0" max="100" className="form-control w-50" onChange={(e) => adjustAopPosition(e.target.value, 'LR')} />
                                        </div>
                                        <div className="from-group">
                                            <label>Top & Bottom</label>
                                            <input type="range" id="points" name="points" min="0" max="60" className="form-control w-50" onChange={(e) => adjustAopPosition(e.target.value, 'TB')} />
                                        </div>
                                    </div>
                                </div>
                            )
                        } */}



                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductView;