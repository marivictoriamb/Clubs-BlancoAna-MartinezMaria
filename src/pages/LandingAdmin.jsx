import { useState } from "react";
import { useClubs } from "../controllers/api";
import ClubCard from "../Components/ClubCard.jsx";
import CardLoader from "../Components/CardLoader.jsx";
import { getUserData, logOut } from "../controllers/auth.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/user.js";
import styles from "../css/LandingAdmin.module.css";
import Navbar from "../Components/Navbar.jsx";
import { Carrusel } from "../Components/Carrusel.jsx";

export default function LandingAdmin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [id, setId] = useState("");
  const [want, setWant] = useState(false);
  const [show, setShow] = useState("Mostrar Agrupaciones");

  const navigate = useNavigate();
  const user = useUser();
  const clubs = useClubs();
  const [values, setValues] = useState([]);

  if (clubs != null && user != null && want == false){
    if (clubs.isLoading != true && clubs.isCharging != true){
      getUserInfo()
    }
  }

  async function getUserInfo() {
    const data = await getUserData(user.email);
    clubs.id.forEach(club => {
      let value = false;
      if (data.membresias.includes(club) == true){
        value = true;
      }
      values.push(value)
    });
    setWant(true)
  }


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
    <div className={styles.All}>
      <Navbar></Navbar>
      <div className={styles.Info}>
        <Carrusel/>
        <div className={styles.Option}>
          <label id={styles.p} >Clubs</label>
        </div>

        <div style={{display: "flex", flexWrap: "wrap",flexDirection: "row",gap: "5vw",alignItems: "center",justifyContent: "center"}} >
          {!want ?  (
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
          clubs.data.map(({ videojuegos, nombre, descripcion }, index) => (
            <ClubCard
              key={nombre}
              name={nombre}
              description={descripcion}
              suscrito={values[index]}
            />
          )))}
          </div>
      </div>
    </div>
  );
}
