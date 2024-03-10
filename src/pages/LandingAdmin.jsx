import { useState } from "react";
import { useClubs } from "../controllers/api";
import ClubCard from "../Components/ClubCard.jsx";
import CardLoader from "../Components/CardLoader.jsx";
import { getUserData, logOut } from "../controllers/auth.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/user.js";
import styles from "../css/LandingAdmin.module.css";
import Navbar from "../Components/Navbar.jsx";

export default function LandingAdmin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [id, setId] = useState("");
  const [want, setWant] = useState(false);
  const [show, setShow] = useState("Mostrar Agrupaciones");

  const navigate = useNavigate();
  const user = useUser();

  function handleLogOut() {
    logOut();
    navigate("/home", { replace: true });
  }

  /**
  useEffect(() => {
    if (user == null){
      navigate("/home", {replace: true});
    }
    }, [user, navigate]);
     */

  async function handleSubmit() {
    await createGame(id, name, gender, description);
    alert("Agrupacion Creada");
  }

  function handleShow() {
    setWant(!want);
    if (want) {
      setShow("Mostrar Agrupaciones");
    } else {
      setShow("Dejar de Mostrar");
    }
  }

  return (
    <div>
    <Navbar></Navbar>
    <div className={styles.All}>
      <div>
        <header className={styles.header}>
        </header>
    
        {true && <Card />}
      </div>
    </div>
    </div>
  );
}

export function Card() {
  const clubs = useClubs();
  const user = useUser();

  async function getUserInfo(titulo) {
    const data = await getUserData(user.email);
    let value = false;

    try {
      data.membresias.forEach((club) => {
        if (club == titulo) {
          value = true;
        }
      });
    } catch (e) {
      console.error(e);
    }

    return value;
  }

  return (

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        gap: "5vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {clubs.isLoading ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "5vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardLoader />
          <CardLoader />
          <CardLoader />
          <CardLoader />
          <CardLoader />
          <CardLoader />
        </div>
      ) : (
        clubs.data.map(({ videojuegos, nombre, descripcion }) => (
          <ClubCard
            key={nombre}
            name={nombre}
            description={descripcion}
            suscrito={getUserInfo(nombre)}
          />
        ))
      )}
    </div>
  );
}
