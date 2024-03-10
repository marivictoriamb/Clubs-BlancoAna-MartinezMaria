import { useNavigate } from "react-router-dom";
import { getUserData, logOut, updateUserData } from "../controllers/auth";
import { useUser } from "../hooks/user";
import { useState } from "react";
import { useGames } from "../controllers/api";
import { getGameById, getGameId } from "../controllers/games";
import styles from '../css/Profile.module.css'
import Question from "../Components/Question";
import Actualizacion from "../Components/Actualizacion";

export default function Profile(){
    const navigate = useNavigate();
    const user = useUser();
    const games = useGames();

    const [name, setName] = useState("...");
    const [headlineName, setHName] = useState("Nombre");
    const [username, setUsername] = useState("...");
    const [headlineUser, setHUser] = useState("Username");
    const [game, setGame] = useState("");
    const [gameID, setGameID] = useState("");
    const [email, setEmail] = useState("...");

    const [trigger, setTrigger] = useState(false);
    const [act, setAct] = useState(false);
    restoreData();

    async function restoreData(){
        if (user!= null && headlineName == "Nombre"){
            const data = await getUserData(user.email);
            setName(data.nombre);
            setHName(data.nombre);
            setUsername(data.username)
            setHUser(data.username);
            setGameID(data.juego_preferido);
            setEmail(data.email);
            const value = await getGameById(data.juego_preferido);
            setGame(value.titulo);

        }
        
    }    

    async function handleGame(value){
        const id = await getGameId(value);
        setGameID(id);
    }

    async function handleLogOut(){
        await logOut();
        navigate("/login", {replace: true});
    }

    return(
        <div className={styles.All}>
            <div className={styles.Card}>
                <div className={styles.banner}>
                    {act && <Actualizacion/>}
                    <div className={styles.Controler}>
                        <div>
                            <img className={styles.Image} alt="control" src="./public/user.png" />
                        </div>
                    </div>
                </div>
                
                <div className={styles.menu}>
                    <div className={styles.Rows}>
                        <label className={styles.Nombre}>{headlineName}</label>
                        <div className={styles.SecondRow}>
                            <label className={styles.Username}>{headlineUser}</label>
                            <button className={styles.Update} onClick={() => {setAct(false), setTrigger(true)}}>Actualizar</button>
                        </div>
                    </div>
                    <form className={styles.Form}>
                        <label className={styles.Input}>Nombre: <input value={name} className={styles.input}onChange={(e) => {setName(e.target.value)}}></input></label>
                        <label className={styles.Input}>Username: <input value={username} className={styles.input}onChange={(e) => {setUsername(e.target.value)}}></input></label>
                        <label className={styles.Input}>Juego Favorito: <select className={styles.select} style={{width:"50vw", maxWidth:"340px"}}value={game} name="VideojuegoPreferido" onChange={(e) => {handleGame(e.target.value), setGame(e.target.value)}}>
                        {games.isLoading  ? (
                            <option key={"loading"}> . . .</option>
                        ) : (
                            games.data.map((game, id) => (<option className={styles.select} key={id} >{game.titulo}</option>
                            ))
                        )}
                        </select></label>
                        <label className={styles.Input}>Correo:  <input className={styles.input} readOnly value={email} ></input></label>
                    </form>
                    <div className={styles.Option}>
                        <label id={styles.p} >Clubs</label>
                    </div>
                    <div className={styles.Clubs}>
                        {}
                        {}
                    </div>
                    <div className={styles.Option}>
                        <label id={styles.p} style={{cursor:"pointer"}} onClick={()=> {handleLogOut()}}>Cerrar Sesion</label>
                    </div>
                </div>
            </div>
            <Question trigger={trigger} name={name} username={username} email={email} gameID={gameID} setTrigger={setTrigger} restoreData={ restoreData} setAct={setAct}/>
        </div>
    )

}

