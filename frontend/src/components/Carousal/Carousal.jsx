import './Carousal.css';
import img1 from '../../assets/carousal/1.png';
import img2 from '../../assets/carousal/2.png';
import img3 from '../../assets/carousal/3.png';
import img4 from '../../assets/carousal/4.png';
import img5 from '../../assets/carousal/5.png';
import { useEffect, useState } from 'react';

export default function Carousal() {
  const [images, setImages] = useState([img1, img2, img3, img4, img5]);

  useEffect(() => {
    setInterval(() => {
      setImages((images) => {
        const firstImage = images.shift();
        images.push(firstImage);
        return [...images];
      });
    }, 5000);
  }, []);

  function setImageInMiddle(image) {
    const imageIndex = images.indexOf(image);
    const imagesCopy = [...images];
    imagesCopy.splice(imageIndex, 1);
    imagesCopy.splice(2, 0, image);
    setImages(imagesCopy);
  }

  return (
    <div className="carousal-container">
      {images.map((image, idx) => (
        <img src={image} key={idx} onClick={() => setImageInMiddle(image)} />
      ))}
    </div>
  );
}
