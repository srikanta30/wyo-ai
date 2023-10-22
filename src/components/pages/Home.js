import React, { useState, useEffect } from 'react';
import Auth from '../pages/auth/auth';
import ProductContainer from '../../containers/ProductContainer';
import {isLoggedIn} from '../utils';

const Home = () => {
  const [images, setImages] = useState(['images/AI-Image1.png', 'images/AI-Image2.png', 'images/AI-Image3.png', 'images/AI-Image4.png', 'images/AI-Image5.png']);
  const [slider, setSlider] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState('login');
  const [loginStatus, setLoginStatus] = useState(false);
  //shift slider position
  function shiftLeft() {
    const shiftedArray = [...images];
    const firstElement = shiftedArray.shift();
    shiftedArray.push(firstElement);
    setImages(shiftedArray);
  };

  useEffect(()=>{
    //localStorage.removeItem('authStatus')
    //set login status
    setLoginStatus(isLoggedIn());
  },[])

  //slider interval
  useEffect(() => {
    const interval = setInterval(() => {
      shiftLeft();
    }, 2100);
    imageSlider();
    return () => clearInterval(interval);
  }, [images]);

  //image slider
  function imageSlider() {
    let sliderData = [];
    let cls = "activeSlide";
    images.map((row, i) => {
      sliderData.push(
        <img className={cls} src={row} />
      )
    }
    )
    setSlider(sliderData);
  }

  // login modal
  function openAuthModal() {
    if(loginStatus!=='true'){
      setShowModal(true);
    }
  }
  function handleModal(){
    setShowModal(!showModal);
  }
  function switchFormType(){
    const type = formType==='login'? 'register': 'login';
    setFormType(type);
  }


  return (
    <div>
      {
        loginStatus==='true'? <ProductContainer />
        :
      
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div>
              <h2>Create Stunning T-Shirt using AI</h2>
              <p>Unleash the power of Artificial Intelligence to create Personalized products</p>
              <div className="addToCartSection">
                <button className="btn editBtn" type="button">How it works</button>
                <button onClick={() => openAuthModal()} className="btn cartBtn">Create</button>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='custom-carousel-container'>
              <div className='custom-carousel'>
                {
                  slider
                }

                <img src="images/AI-Image2.png" />
                <img className="activeSlide" src="images/AI-Image3.png" />
                <img src="images/AI-Image4.png" />
                <img src="images/AI-Image5.png" />
              </div>
            </div>
            <div className='carousel-opacity'></div>

          </div>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <div className='hm-bottom-card'>
              <img src='btcard1.png' />
              <div>Exclusive AI Image generator to bring your imagination live</div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='hm-bottom-card'>
              <img src='btcard1.png' />
              <div>User Friendly Mockup tool to define your unique Style</div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='hm-bottom-card'>
              <img style={{ width: '100px' }} src='btcard2.png' />
              <div>Premium Products</div>
            </div>
          </div>
        </div>
      </div>
  }
      {
        showModal===true && (
          <div class="authModal" id="authModal" >
          <div className='authModalInner slide-top'>
            <div className='modalClose' onClick={()=>handleModal()}><i class="fas fa-times"></i></div>
           <div className='innerContainer'>
                <img src="logo.png" className='logo' alt="Logo" />
                <h4 className='mainTitle'>Enter your details to continue</h4>
                <p className='labelTitle'>Your data is safe with us. we promise not to spam you</p>
                <Auth switchForm={formType}/>
                {
                  formType==='login'? <h6 className="formSwitchOption">Don't have an account? <span onClick={()=> switchFormType()}>Create New</span></h6>
                  : <h6 className="formSwitchOption">Already have an account? <span onClick={()=> switchFormType()}>Login</span></h6>
                }
                
           </div>
          </div>
      </div>
        )
      }
    
    </div>





  );
};

export default Home;