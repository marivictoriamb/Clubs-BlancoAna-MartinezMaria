import { getUserData } from '../controllers/auth';
import { getGameId } from '../controllers/games';
import { useUser } from '../hooks/user';
import styles from './ClubCard.module.css'

function GameCard({name, gender, description}){   
    const yes = "./public/star.png";
    const nou = "./public/console.png";
    const user = useUser();

    async function ask(){
        const id = await getGameId(name);
        const question = await getUserData(user.email);
        if (question.juego_preferido == id){
            return yes;
        } else{
            return nou;
        }
    }

    return(
        <div className={styles.All}>
            <card className={styles.Card}>
                <div className={styles.banner}>
                    <div className={styles.Controler}>
                        <div className={styles.Image}>
                            <img style={{width: "20vh", height:"20vh"}} alt="control" src="./public/controller.png" />
                        </div>
                    </div>
                </div>
                
                <div className={styles.menu}>
                    <h2 className={styles.Name}>{name}</h2>
                    <div className={styles.Gender}>{gender}<img alt="fav" src={ask()} style={{width: "1.5vw", height:"1.5vw"}}/></div>
                    <desc className={styles.Description}>{description}</desc>
                </div>
            </card>
        </div>
    )
}
export default GameCard;