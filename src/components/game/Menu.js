import { useNavigate } from "react-router";
import { useStore } from "../../hooks/useStore";
import { supabase } from "../../modules/supabase";
import styles from './menu.module.css';

export const Menu = () => {
	const [saveWorld, resetWorld] = useStore((state) => [state.saveWorld, state.resetWorld]);
	const navigate = useNavigate();

	const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    navigate('/');
  }

	return (
		<div className={styles.container}>
			<button
				onClick={() => saveWorld()}
			>Save</button>
			<button
				onClick={() => resetWorld()}
			>Reset</button>
			<button
				onClick={() => signOutUser()}
			>Logout</button>
		</div>
	)
}