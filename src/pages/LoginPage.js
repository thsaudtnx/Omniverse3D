import GLOBE from 'vanta/dist/vanta.globe.min';
import * as THREE from "three";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../modules/supabase';
import styles from './login.module.css';
import Login from '../components/login/Login';

const LoginPage = () => {
  const navigate = useNavigate();
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user){
          console.log(value.data.user);
          navigate(`/${value.data.user.id}/earth`);
        }
      })
    };
    getUserData();
  }, [navigate])

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(GLOBE({
        el: myRef.current,
        THREE : THREE,
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  

  return (
    <div className={styles.container} ref={myRef}>
      <Login />
    </div>
  )
}

export default LoginPage;