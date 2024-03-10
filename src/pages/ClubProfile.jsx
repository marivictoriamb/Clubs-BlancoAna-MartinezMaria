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

export default function ClubProfile() {
  const clubName = useParams();
  const user = useUser(); 
  const [club, setClub] = useState(null);
  const [games, setGames] = useState([]);
  const [want, setWant] = useState(false);

  useEffect(() => {
    async function fetchClubData() {
      const clubData = await getClub(clubName.name);
      setClub(clubData);

      const gamesData = await Promise.all(
        clubData[0].videojuegos.map(async (item) => {
          return await getGameById(item);
        })
      );
      setGames(gamesData);

        if (user != null && club != null){
          const data = await getUserData(user.email);
          const clubValue = await getClubId(club[0].nombre);
          const membershipValue = data.membresias;
          setWant(membershipValue.includes(clubValue))
          handleShow()
        }
    };

    fetchClubData();
  }, [clubName]);


  async function handleMembership(){
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

    setWant(!want);
    handleShow()
  };

  function handleShow() {
    if (want == true){
      return("Desafiliarse");
    } else {
      return("Afiliarse");
    }

  }


  if (user != null && club != null){
    return (
      <div>
        <div className={styles.container}>
          <img
            style={{ width: "40%", height: "100vh" }}
            alt="GameRoom"
            src={GameRoomImage}
          />
          <div className={styles.Right}>
            <div>
              <div className={styles.position}>
                <h1>{club[0].nombre}</h1>
                <button onClick={() => {handleMembership()}}>{handleShow()}</button>
              </div>
              <h4>Descripción: {club[0].descripcion}</h4>
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
