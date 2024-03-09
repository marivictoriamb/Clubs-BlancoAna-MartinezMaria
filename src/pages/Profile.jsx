import { useNavigate } from "react-router-dom";
import { getUserData, updateUserData } from "../controllers/auth";
import { useUser } from "../hooks/user";
import { useState } from "react";
import { useGames } from "../controllers/api";

export default function Profile(){
    const navigate = useNavigate();
    const user = useUser();
    const games = useGames();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [game, setGame] = useState("");
    const [email, setEmail] = useState("");
    restoreData();

    async function restoreData(){
        if (user!= null && name == ""){
            const data = await getUserData(user.email);
            setName(data.nombre);
            setUsername(data.username)
            setGame(data.juego_preferido);
            setEmail(data.email);

        }
        
    }    

    async function handleData(){
        updateUserData(name, username, email, game);
        restoreData();
    }

    return (
        <div>
            <button className="Back" onClick={()=> navigate("/landingadmin")}>Regresar </button>
            <form>
            <label className="Nombre">Nombre: <input defaultValue={name} onChange={(e) => {setName(e.target.value)}}></input></label>
            <label className="Username">Username: <input defaultValue={username} onChange={(e) => {setUsername(e.target.value)}}></input></label>
            <label className="Correo">Correo: {email}</label>
            <label className="Carrera">Videojuego Preferido: <select value={game} name="VideojuegoPreferido" onChange={(e) => setGame(e.target.value)}>
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

