import { getUserData } from '../controllers/auth';
import { getGameId } from '../controllers/games';
import { favoriteGame } from '../hooks/favoriteGame';
import { useUser } from '../hooks/user';
import styles from './ClubCard.module.css'

function GameCard({name, gender, description}){   
    const user = useUser();
    const fav = favoriteGame(name);

    return(
        <div className={styles.All}>
            <div className={styles.Card}>
                <div className={styles.bannerG}>
                    <div className={styles.Controler}>
                        <div className={styles.Image}>
                            <img style={{width: "20vh", height:"20vh"}} alt="control" src="../public/controller.png" />
                        </div>
                    </div>
                </div>
                
                <div className={styles.menu}>
                    <h2 className={styles.Name}>{name}</h2>
                    <div className={styles.Gender}>{gender}
                    {fav.isLoading  ? (
                        <img alt="fav" src="../public/console.png" style={{width: "30px", height:"30px"}}/>
                        ) : (
                        <img alt="fav" src={fav.data} style={{width: "30px", height:"30px"}}/>
                    )}
                    </div>
                    <div className={styles.Description}>{description}</div>
                </div>
            </div>
        </div>
    )
}
export default GameCard;
