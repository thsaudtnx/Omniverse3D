import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Stars } from "@react-three/drei";
import Solar from "../components/earth/Solar";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../modules/supabase";
import styles from './earth.module.css';

const EarthPage = () => {

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        const user = value.data?.user;
        if (user?.id !==params.userId || user===null){
          navigate('/');
        }
      })
    };
    getUserData();
  }, [navigate, params.userId])

  return (
    <div className={styles.container}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8}/>
          <pointLight 
            color="#f6f3ea" 
            position={[2, 0, 2]}
            intensity={15}
          />
          <Stars 
            radius={300} 
            depth={60} 
            count={20000}
            factor={7}
            saturation={0}
            fade={true}
          />
          <Solar />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default EarthPage;