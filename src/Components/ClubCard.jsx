import { useState } from 'react';
import styles from './ClubCard.module.css'

function ClubCard({name, description, suscrito}){    
    const yes = "./public/yes.png";
    const nou = "./public/no.png";
    const si = "Suscrito";
    const no = "No Suscrito";

    function ask1(){
        if (suscrito == true){
            return yes;
        } else{
            return nou;
        }
    }

    function ask2(){
        if (suscrito == true){
            return si;
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
                    <div className={styles.Gender}>{ask2(   )}<img alt="suscrito" src={ask1()} style={{width: "1.5vw", height:"1.5vw"}}/></div>
                    <desc className={styles.Description}>{description}</desc>
                </div>
            </card>
        </div>
    )
}
export default ClubCard;