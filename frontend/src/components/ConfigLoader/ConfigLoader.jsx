import './ConfigLoader.css';
import tShirtLoaderImg from '../../assets/t-shirt-loader.svg';

export default function ConfigLoader({ style = {}, className = '' }) {
  return (
    <div className={'loading-container ' + className} style={style}>
      <img
        style={{
          alignSelf: 'center',
        }}
        src={tShirtLoaderImg}
        width={24}
        height={24}
        alt="t shirt loader"
      />
      <div className="loader-line" />
    </div>
  );
}
