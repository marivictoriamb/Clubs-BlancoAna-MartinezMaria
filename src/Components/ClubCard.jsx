import styles from './ClubCard.module.css'

function AgrupationCard({name, gender, description, is}){    
    const yes = "./public/yes.png";
    const no = "./public/no.png";

    function ask(){
        if (is == true){
            return yes;
        } else{
            return no;
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
                    <div className={styles.Gender}>{gender}<img alt="suscrito" src={ask()} style={{width: "1.5vw", height:"1.5vw"}}/></div>
                    <desc className={styles.Description}>{description}</desc>
                </div>
            </card>
        </div>
    )
}
export default AgrupationCard;