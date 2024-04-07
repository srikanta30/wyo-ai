import decorativeSparkle from '../../assets/decorative-sparkle.svg';

import './Home.css';
import { Link } from 'react-router-dom';
import Carousal from '../../components/Carousal/Carousal';

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-content-container">
        <div>
          <h1 className="main-text">
            Create Stunning T-Shirt using &nbsp;
            <span className="gradient-font">AI</span>
          </h1>
          <br />
          <p className="secondary-text">
            Unleash the power of Artificial Intelligence to create Personalized
            products
          </p>
          <br />
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              columnGap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <button className="home-btn home-secondary-btn">
              How It Works
            </button>
            <Link to="/product" className="home-btn home-primary-btn">
              Create
            </Link>
          </div>
        </div>
        <div>
          {/* <img
            className="carousal-img"
            src={decorativeImage}
            alt="T-shirt Images"
          /> */}
          <div className="carousal-img">
            <Carousal />
          </div>
        </div>
      </div>

      <div className="home-cards-container">
        <div className="home-card">
          <img src={decorativeSparkle} alt="decorative-sparkle" />
          <br />
          <p>Exclusive AI Image generator to bring your imagination live</p>
        </div>
        <div className="home-card">
          <img src={decorativeSparkle} alt="decorative-sparkle" />
          <br />
          <p>User Friendly Mockup tool to define your unique Style</p>
        </div>
        <div className="home-card">
          <p
            className="gradient-font"
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              whiteSpace: 'nowrap',
            }}
          >
            200 +
          </p>
          <br />
          <p>Premium Products</p>
        </div>
      </div>
    </div>
  );
}
