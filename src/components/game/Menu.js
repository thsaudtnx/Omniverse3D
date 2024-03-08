import { useStore } from "../../hooks/useStore"
import styles from './menu.module.css'
import { useParams } from "react-router";

export const Menu = () => {
	const [saveWorld, resetWorld] = useStore((state) => [state.saveWorld, state.resetWorld])
  const params = useParams();


	return (
    <div className={styles.container}>
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