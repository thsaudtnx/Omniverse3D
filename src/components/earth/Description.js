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

  console.log(current)

  return (
    <Html position={[0, 0, 0]}>
      <div className={styles.container}>
        <div className={styles.header}>
          {current && <FaArrowAltCircleLeft 
            onClick={() => prevContinent()}
            className={styles.arrow}
          />}
          <div className={styles.title}>
            {current ? current.name : 'Hello World!'}
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
            "The project aims to create an innovative and immersive 3D metaverse world using cutting-edge technologies, including React.js, Three.js, Supabase, and the Omnicapture API. This web-based metaverse will serve as an educational platform, offering students the opportunity to craft their unique virtual worlds, similar to popular games like Minecraft. What sets this metaverse apart is the integration of the Omnicapture API, allowing students to scan real-world objects and seamlessly transfer them into their virtual environments."}         </div>
          </div>
        {current && <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => {
              navigate(`/${params.userId}/${current.id}`);
          }}>Start</button>
          <button
            className={styles.button}
            onClick={() => {
              signOutUser();
          }}>Go back</button>
        </div>}
      </div>
    </Html>
  )
}

export default Description;