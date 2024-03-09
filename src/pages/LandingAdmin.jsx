import { useState,useEffect } from "react";
import { useGames } from "../controllers/api";
import ClubCard from '../Components/ClubCard.jsx'
import { getUserData, logOut } from "../controllers/auth.js";
import { useNavigate } from "react-router-dom";
import {useUser} from "../hooks/user.js"
import { Link } from "react-router-dom"
import { getGameId } from "../controllers/games.js";
import styles from "../css/LandingAdmin.module.css"

export default function LandingAdmin(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [gender, setGender] = useState("");
    const [id, setId] = useState("");
    const [want, setWant] = useState(false);
    const [show, setShow] = useState("Mostrar Agrupaciones");

    const navigate = useNavigate();
    const user = useUser();

    function handleLogOut(){
        logOut();
        navigate("/home", {replace: true});
    }

    /**
  useEffect(() => {
    if (user == null){
      navigate("/home", {replace: true});
    }
    }, [user, navigate]);
     */

    async function handleSubmit(){
        await createGame(id, name, gender, description);
        alert("Agrupacion Creada");
    }

    function handleShow(){
        setWant(!want);
        if (want){
            setShow("Mostrar Agrupaciones");
        } else {
            setShow("Dejar de Mostrar");
        }
    }

    return (
        <div className={styles.All}> 
            <Link to="/home"><button className={styles.Close} onClick={() => {handleLogOut()}}>Cerrar Sesion</button></Link>
            <div className={styles.Create}>
               <label>{getUserData(user.uid).juego_favorito}</label>
                <button onClick={handleSubmit}>Enviar</button>
            </div>
            <div className={styles.Read}>
                <button className={styles.See} onClick={() => {handleShow()}}>{show}</button>
                {want && <Card />}
            </div>
            <div className={styles.Perfil}>
                <button className={styles.SeePerfil} onClick={() => {navigate("/profile", {replace:true})}}>Ver Perfil</button>
            </div>
            
        </div>
    );
}

export function Card(){
    const games = useGames();
    const user = useUser();

    async function getUserInfo(titulo){
        const data = await getUserData(user.email);
        const game = await getGameId(titulo);
        let value = false;

        try{
            data.membresias.forEach(club => {
                if (club == game){
                    value = true;
                }
            });
        } catch (e){
            console.error(e);
        }

        return value;
    }

    return(
        <div style={{display:"flex", flexWrap:"wrap", flexDirection:"row", gap:"5vw", alignItems:"center", justifyContent:"center"}}>
            {games.isLoading  ? (
                    <div>Cargando . . .</div>
                ) : (
                    games.data.map(({titulo, genero, descripcion}) => (<ClubCard key={titulo} name={titulo} gender={genero} description={descripcion} is={getUserInfo(titulo)}/>
                    ))
                )}
        </div>
    )
}