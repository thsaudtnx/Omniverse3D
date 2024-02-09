import { useStore } from "../../hooks/useStore"
import { supabase } from "../../lib/supabase";
import styles from './menu.module.css'
import { useNavigate, useParams } from "react-router";

export const Menu = () => {
	const [saveWorld, resetWorld] = useStore((state) => [state.saveWorld, state.resetWorld])
  const navigate = useNavigate();
  const params = useParams();

  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    navigate('/');
  }


	return (
    <div className={styles.container}>
      <button 
        className={styles.button}
        onClick={() => {
          if (window.confirm('Do you want to logout?')){
            signOutUser()
          }
        }}
      >Logout</button>
      <button 
        className={styles.button}
        onClick={() => {
          saveWorld(params.userId, params.continentId)
          window.alert('Saved!')
        }}
      >Save</button>
      <button 
        className={styles.button}
        onClick={() => resetWorld()}
      >Reset</button>
    </div>
  )
}