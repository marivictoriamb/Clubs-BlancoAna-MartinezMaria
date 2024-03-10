import { useParams } from "react-router-dom";
import { getClub } from "../controllers/clubs.js";
import { getGameById } from "../controllers/games.js";
import { useState, useEffect } from "react";
import GameCard from "../Components/GameCard.jsx";
import styles from "../css/ClubsProfile.module.css";
import GameRoomImage from "../../public/GameRoom.jpeg";
import { getUserData } from "../controllers/auth.js";
import { useUser } from "../hooks/user";
import { updateMembershipData } from "../controllers/membership.js";

export default function ClubProfile() {
  const clubName = useParams();
  const user = useUser(); //usuario dentro del programa
  const [club, setClub] = useState(null);
  const [games, setGames] = useState([]);
  const [want, setWant] = useState(handleShow());
  const [show, setShow] = useState("Afiliarse");
  const array = Membresia();

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

  //Actualizar la membresias

  const handleMembership = async () => {
    if (user != null) {
      const userData = await getUserData(user.email); //Informacion de la db
      const valueToRemove = club[0].id;
      const newArray = userData.membresias.filter(
        (item) => item !== valueToRemove
      );
      {
        !want
          ? userData.membresias.concat(club[0].id)
          : (userData.membresias = newArray);
      }
      updateMembershipData(
        userData.nombre,
        user.username,
        user.email,
        user.game,
        userData.membresias
      );
      handleShow();
    }
  };

  async function handleShow() {
    if (user != null) {
      const userData = await getUserData(user.email); //Informacion de la db
      setWant(findId(userData.membresias, club[0].id));
      if (want) {
        setShow("Afiliarse");
      } else {
        setShow("Desafiliarse");
      }
    }

  }

  function findId(array, value) {
    return array.indexOf(value) === -1;
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
              <button onClick={handleMembership}>{show}</button>
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
