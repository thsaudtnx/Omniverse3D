import { Html } from "@react-three/drei";
import { useNavigate, useParams } from "react-router";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";
import styles from './description.module.css';
import { supabase } from "../../lib/supabase";
import Map from "./Map";

const Description = ({current, nextContinent, prevContinent}) => {

  const navigate = useNavigate();
  const params = useParams();

	const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    navigate('/');
  }

  return (
    <Html position={[0, 0, 0]}>
      <div className={styles.container}>
        <div className={styles.header}>
          {current && <FaArrowAltCircleLeft 
            onClick={() => prevContinent()}
            className={styles.arrow}
          />}
          <div className={styles.title}>
            {current ? current.name : 'Hello World'}
          </div>
          {current &&  <FaArrowAltCircleRight 
            onClick={() => nextContinent()}
            className={styles.arrow}
          />}
        </div>
        <div className={styles.body}>
          <div className={styles.mapContainer}>
            {current && <Map current={current}/>}
          </div>
          <div>
            {current ? "Do you want to play the world?" : 
            "Welcome to Omniverse 3D. This app is...."}
          </div>
        </div>
        <div className={styles.buttons}>
          {current && <button
            className={styles.button}
            onClick={() => {
              navigate(`/${params.userId}/${current.id}`);
          }}>Start</button>}
          {current && <button
            className={styles.button}
            onClick={() => {
              signOutUser();
          }}>Go back</button>}
        </div>
      </div>
    </Html>
  )
}

export default Description;