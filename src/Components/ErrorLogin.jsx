import styles from "./Error.module.css"

export default function Error(){
    return(
        <div className={styles.Error} style={{left:"1.5vw"}}>
            <span className={styles.msg}>💀Error: No se tiene una cuenta registrada con dicho correo !</span>
        </div>
    )
}