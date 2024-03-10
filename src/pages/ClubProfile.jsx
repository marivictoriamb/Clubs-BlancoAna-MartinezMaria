import { useParams } from "react-router-dom";
import { getClubId } from "../controllers/clubs.js";
import GameCard from "../Components/GameCard.jsx";
import styles from "../css/ClubsProfile.module.css";
import { getUserData, updateUserData } from "../controllers/auth.js";
import { useUser } from "../hooks/user";
import CardLoader from "../Components/CardLoader.jsx";
import { Membership } from "../controllers/membership.js";
import Navbar from "../Components/Navbar.jsx";

export default function ClubProfile() {
  const clubName = useParams();
  const user = useUser(); 
  const membership = Membership(clubName);


  async function handleMembership(){
    if (membership.show != "..."){
      const userData = await getUserData(user.email); 
      const clubValue = await getClubId(membership.club[0].nombre);
      const membershipValue = userData.membresias
      
      if (membership.want != true){
        membershipValue.push(clubValue);
        await updateUserData(
          userData.nombre,
          userData.username,
          userData.email,
          userData.juego_preferido,
          membershipValue
        );
      } else {
        const membershipValue = userData.membresias.filter((item) => item !== clubValue );
        await updateUserData(
          userData.nombre,
          userData.username,
          userData.email,
          userData.juego_preferido,
          membershipValue
        );
      }
  
      membership.setWant(!membership.want);
    }
  };


  if (user != null && membership.show != "..."){
    return (
      <div>
        <Navbar/>
      <div>
        <div className={styles.container}>
          {/* <img className={styles.img}    Esto no se si dejarlo siento que se ve mejor sin la imagen
            style={{ width: "40%", height: "100%"}}
            alt="GameRoom"
            src={"../public/GameRoom.png"}
          /> */}
          <div className={styles.Right}>
            <div>
              <div className={styles.position}>
                <h1 className={styles.Name}>📺 {membership.club[0].nombre} 🕹️</h1>
                <div className={styles.Text}>
                  <div className={styles.info}>
                    <img className={styles.icon} alt="icon" src="../public/information.png" />
                    <h4 className={styles.Description}>{membership.club[0].descripcion}</h4>
                  </div>
                <button className={styles.Afiliacion} onClick={() => {handleMembership()}}>{membership.show}</button>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.Games}>
                {membership.games.map((game) => (
                  <GameCard
                    key={game.titulo}
                    name={game.titulo}
                    gender={game.genero}
                    description={game.descripcion}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    ); 
  } else {
    return (
      <div style={{margin:"30px", display:"flex", flexWrap:"wrap", flexDirection:"row", gap:"5vw", alignItems:"center", justifyContent:"center"}}>
        <CardLoader/>
        <CardLoader/>
        <CardLoader/>
        <CardLoader/>
        <CardLoader/>
        <CardLoader/>
      </div>
    );
  }
  
}
