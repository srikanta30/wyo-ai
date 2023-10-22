import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';


const SplitImage = (prob) => {
  const containerRef = useRef(null);
  const [splitImages, setSplitImages] = useState([]);

  useEffect(()=>{
    splitAndDisplayImages();
  }, [prob.promptImage, prob.designNum]) 

  const splitAndDisplayImages = () => { 
    const image = new Image();
    image.crossOrigin = "anonymous"; 
    // axios.get(prob.promptImage)
    // .then((res) => {
    //   console.log(res) 
        
    // }).catch((err) => {
    //     console.log(err.message);
    // })
    // fetch(prob.promptImage, {
    //   mode: 'no-cors'
    // }).then(response => {
    //     console.log(response)
    //   });
    //   // .then(data => {
    //   //   console.log(data)
    //   // })
    image.src = prob.promptImage;
 

    image.onload = () => {
      const canvasWidth = image.width / 2;
      const canvasHeight = image.height / 2;
      const splitImagesArray = [];

      for (let i = 0; i < 4; i++) {
        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const context = canvas.getContext('2d');
        const offsetX = (i % 2) * canvasWidth;
        const offsetY = Math.floor(i / 2) * canvasHeight;

        context.drawImage(image, offsetX, offsetY, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
        splitImagesArray.push(canvas.toDataURL()); // Convert canvas to data URL
      }
      setSplitImages(splitImagesArray); // Update split images state
      prob.handleImageSplit(splitImagesArray);
    };
  };
   
  return (
    <>
    </>
  );
};

export default SplitImage;
