import { Html } from "@react-three/drei";
import { useNavigate, useParams } from "react-router";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";
import styles from './description.module.css';

const Description = ({current, nextContinent, prevContinent}) => {

  const navigate = useNavigate();
  const params = useParams();

  return (
    <Html position={[0, 0, 0]}>
      <div className={styles.container}>
        <div className={styles.header}>
          {current && <FaArrowAltCircleLeft 
            onClick={() => prevContinent()}
            className={styles.arrow}
          />}
          <h2>{current ? current.name : 'Hello World'}</h2>
          {current &&  <FaArrowAltCircleRight 
            onClick={() => nextContinent()}
            className={styles.arrow}
          />}
        </div>
        <div>
          <div>{current && `Latitude : ${current?.lat}`}</div>
          <div>{current && `Longitude : ${current?.long}`}</div>
          <p>{current ? current.description : 'Welcome to Omniverse 3D World!'}</p>
        </div>
        <div>
          {current && current.images}
        </div>
        {current && <button
          className={styles.button}
          onClick={() => {
            navigate(`/${params.userId}/game`);
        }}>Start</button>}
      </div>
    </Html>
  )
}

export default Description;