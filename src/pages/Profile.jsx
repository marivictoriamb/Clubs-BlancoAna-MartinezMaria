import { useNavigate } from "react-router-dom";
import { getUserData, updateUserData } from "../controllers/auth";
import { useUser } from "../hooks/user";
import { useState } from "react";
import { useGames } from "../controllers/api";
import { getGameById, getGameId } from "../controllers/games";

export default function Profile(){
    const navigate = useNavigate();
    const user = useUser();
    const games = useGames();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [game, setGame] = useState("");
    const [gameID, setGameID] = useState("");
    const [email, setEmail] = useState("");
    restoreData();

    async function restoreData(){
        if (user!= null && name == ""){
            const data = await getUserData(user.email);
            setName(data.nombre);
            setUsername(data.username)
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

    async function handleData(){
        await updateUserData(name, username, email, gameID);
        await restoreData();
    }

    return (
        <div>
            <button className="Back" onClick={()=> navigate("/landingadmin")}>Regresar </button>
            <form>
            <label className="Nombre">Nombre: <input defaultValue={name} onChange={(e) => {setName(e.target.value)}}></input></label>
            <label className="Username">Username: <input defaultValue={username} onChange={(e) => {setUsername(e.target.value)}}></input></label>
            <label className="Correo">Correo: {email}</label>
            <label className="Carrera">Videojuego Preferido: <select value={game} name="VideojuegoPreferido" onChange={(e) => {handleGame(e.target.value), setGame(e.target.value)}}>
            {games.isLoading  ? (
                  <option key={"loading"}> . . .</option>
              ) : (
                  games.data.map((game, id) => (<option key={id} >{game.titulo}</option>
                  ))
              )}
                        </select></label>
            <button type="button" onClick={() => {handleData()}}>Actualizar</button>
            </form>
            
        </div>
    );

}

