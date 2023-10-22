// import React, { useRef, useState } from 'react';
// import { saveAs } from 'file-saver';
// import base64 from 'base64-js';

// const ImageSplitter = () => {
//   const containerRef = useRef(null);
//   const [imageFile, setImageFile] = useState('http://localhost:3000/i.png');
//   const [splitImages, setSplitImages] = useState([]);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImageFile(URL.createObjectURL(file));
//       setSplitImages([]);
//     }
//   };

//   const splitAndDisplayImages = () => {
//     const image = new Image();
//     image.crossOrigin = "anonymous";
//     image.src = imageFile;
 

//     image.onload = () => {
//       const canvasWidth = image.width / 2;
//       const canvasHeight = image.height / 2;
//       const splitImagesArray = [];

//       for (let i = 0; i < 4; i++) {
//         const canvas = document.createElement('canvas');
//         canvas.width = canvasWidth;
//         canvas.height = canvasHeight;

//         const context = canvas.getContext('2d');
//         const offsetX = (i % 2) * canvasWidth;
//         const offsetY = Math.floor(i / 2) * canvasHeight;

//         context.drawImage(image, offsetX, offsetY, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
//         splitImagesArray.push(canvas.toDataURL()); // Convert canvas to data URL
//       }
//       //generateImage ('', 'dskjdskdk.png');
//       setSplitImages(splitImagesArray); // Update split images state
//     };
//   };
   
 

  

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       <div ref={containerRef}>
//         {imageFile && (
//           <div>
//             <h2>Original Image</h2>
//             <img src={imageFile} alt="Original" />
//           </div>
//         )}
//         {imageFile && (
//           <div>
//             <h2>Split Images</h2>
//             <button onClick={splitAndDisplayImages}>Split Image</button>
//             <div className="split-images">
//               {splitImages.map((splitImageUrl, index) => (
//                 <div key={index}>
//                   <img src={splitImageUrl} alt={`Split ${index + 1}`} />
//                   <a
//                     href={splitImageUrl}
//                     download={`split_${index + 1}.png`}
//                   >
//                     Download Split {index + 1}
//                   </a>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageSplitter;
