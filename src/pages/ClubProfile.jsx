import { useParams } from "react-router-dom";
import { getClub } from "../controllers/clubs.js";
import { getGameById } from "../controllers/games.js";
import { useState, useEffect } from "react";
import React from "react";
import GameCard from "../Components/GameCard.jsx";
import styles from "../css/ClubsProfile.module.css";
import GameRoomImage from "../../public/GameRoom.jpeg";

export default function ClubProfile() {
  const clubName = useParams();
  const [club, setClub] = useState(null);
  const [games, setGames] = useState([]);
  const [want, setWant] = useState(false);
 const [show, setShow] = useState("Afiliarse");

  useEffect(() => {
    const fetchClubData = async () => {
      const clubData = await getClub(clubName.name);
      setClub(clubData);

      const gamesData = await Promise.all(
        clubData[0].videojuegos.map(async (item) => {
          return await getGameById(item);
        })
      );
      setGames(gamesData);
    };

    fetchClubData();
  }, [clubName.name]);

  if (!club || club.length === 0) {
    return <div>No se encontró el club</div>;
  }

  const handleMembership = () => {

    handleShow();
  }

  function handleShow(){
    setWant(!want);
    if (want){
        setShow("Afiliarse");
    } else {
        setShow("Desafiliarse");
    }
}

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
              <button onClick = {handleMembership}>{show}</button>
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
}
