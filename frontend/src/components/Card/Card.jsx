import './Card.css';
import img1 from '../../assets/chest-print.png';

export default function Card(props) {
  return (
    <div className="card-container" onClick={props.onClick}>
      <img
        src={`${props.imgURL}`}
        alt="T Shirt"
        className="card-img"
        style={{
          backgroundColor: 'lightgray',
          width: '100%',
          height: '100',
          objectFit: 'cover',
          borderRadius: '1px',
        }}
      />
      <div className="card-title">{props.title}</div>
    </div>
  );
}
