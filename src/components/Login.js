import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../modules/supabase';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';


const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user){
          console.log(value.data.user);
          navigate(`/${value.data.user.id}/game`);
        }
      })
    };
    getUserData();
  }, [navigate])

  return (
    <div style={{
      position: 'absolute',
      top: 100,
      left: 'calc(50% - 200px)',
      zIndex : 1,
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
  );
};

export default Login;