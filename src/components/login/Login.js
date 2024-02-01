import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../modules/supabase';
import styles from './login.module.css';


const Login = () => {

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Welcome to Omniverse 3D
      </div>
      <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
      />
    </div>
  );
};

export default Login;