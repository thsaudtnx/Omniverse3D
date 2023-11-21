import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import GLOBE from 'vanta/dist/vanta.globe.min';
import * as THREE from "three";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../modules/supabase';

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
    <div 
      ref={myRef}
      style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}>
      <div style={{
        width: 400,
        background : "white",
        padding : 40,
        borderRadius : 10,
        opacity : 0.9,
      }}>
        <h3 style={{
          textAlign : 'center', 
          color : 'gray'
          }}>Welcome to Omniverse 3D</h3>
        <Auth 
          supabaseClient={supabase} 
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
        />
      </div>
    </div>
  )
}

export default LoginPage;