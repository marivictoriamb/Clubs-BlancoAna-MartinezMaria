import { useParams } from "react-router-dom";
import { getClub, getClubId } from "../controllers/clubs.js";
import { getGameById } from "../controllers/games.js";
import { useState, useEffect } from "react";
import GameCard from "../Components/GameCard.jsx";
import styles from "../css/ClubsProfile.module.css";
import GameRoomImage from "../../public/GameRoom.jpeg";
import { getUserData, updateUserData } from "../controllers/auth.js";
import { useUser } from "../hooks/user";
import CardLoader from "../Components/CardLoader.jsx";
import { Membership } from "../controllers/membership.js";
import Navbar from "../Components/Navbar.jsx";

export default function ClubProfile() {
  const clubName = useParams();
  const user = useUser(); 
  const [done, setDone] = useState(false);

  const [club, setClub] = useState(null);
   const [games, setGames] = useState([]);
   const [show, setShow] = useState("...");
  const [want, setWant] = useState(false);

  async function handleMembership(){
    if (show != "..."){
      setDone(false);
      const userData = await getUserData(user.email); 
      const clubValue = await getClubId(club[0].nombre);
      const membershipValue = userData.membresias
      if (want != true){
        membershipValue.push(clubValue);
        await updateUserData(
          userData.nombre,
          userData.username,
          userData.email,
          userData.juego_preferido,
          membershipValue
        );
        setShow("Desafiliarse");
      } else {
        const membershipValue = userData.membresias.filter((item) => item !== clubValue );
        await updateUserData(
          userData.nombre,
          userData.username,
          userData.email,
          userData.juego_preferido,
          membershipValue
        );
        setShow("Afiliarse");
      }
  
      setWant(!want);
      setDone(true);
    }
  };

  async function fetchClubData() {
    const clubData = await getClub(clubName.name);
    setClub(clubData);

    const gamesData = await Promise.all(
      clubData[0].videojuegos.map(async (item) => {
        return await getGameById(item);
      })
    );
    setGames(gamesData);

      if (user != null && clubData != null){
        const data = await getUserData(user.email);
        const clubValue = await getClubId(clubData[0].nombre);
        const membershipValue = data.membresias;
        if (membershipValue.includes(clubValue) == true){
          setWant(true)
          setShow("Desafiliarse");
        } else {
          setWant(false)
          setShow("Afiliarse")
        }

        setDone(true);
      }
  };

  useEffect(() => {
    async function fetchData() {
      if (user != null){
        fetchClubData()
      }
    };

    fetchData();
  }, [user]);

  return(
    <div>
    {(done==false)?(
      <div style={{margin:"30px", display:"flex", flexWrap:"wrap", flexDirection:"row", gap:"5vw", alignItems:"center", justifyContent:"center"}}>
        <CardLoader/>
        <CardLoader/>
        <CardLoader/>
        <CardLoader/>
        <CardLoader/>
        <CardLoader/>
      </div>
    ) : (
      <div className={styles.container}>
        <img className={styles.img}
          style={{ width: "40%", height: "100vh"}}
          alt="GameRoom"
          src={"../GameRoom.png"}
        />
        <div className={styles.Right}>
          <Navbar/>
          <div>
            <div className={styles.position}>
              <h1 className={styles.Name}>📺 {club[0].nombre} 🕹️</h1>
              <div className={styles.Text}>
                <div className={styles.info}>
                  <img className={styles.icon} alt="icon" src="../information.png" />
                  <h4 className={styles.Description}>{club[0].descripcion}</h4>
                </div>
              <button className={styles.Afiliacion} onClick={() => {handleMembership()}}>{show}</button>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.Games}>
              {games.map((game) => (
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
    )}
</div>
  )
}