import styles from "./Error.module.css"

export default function Error(left){
    return(
        <div className={styles.Error} style={{right:"1.5vw"}}>
            <span className={styles.msg}>💀Error: Ya se tiene una cuenta registrada con dicho correo !</span>
        </div>
    )
}