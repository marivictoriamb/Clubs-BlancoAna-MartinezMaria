import { useNavigate } from "react-router-dom";
import { useClubs, useGame } from "../controllers/api";
import styles from "../css/Search.module.css"
import { useState } from "react";
import CardLoader from "../Components/CardLoader.jsx";
import GameCard from '../Components/GameCard.jsx'


export default function Search(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [on, setOn] = useState(false);

    function handleClick(){
        setOn(true);
    }

    return(
        <div className={styles.All}>
            <div className={styles.banner}>
                <h2 className={styles.title}>Encuentra con que videojuegos contamos </h2>
                <div className={styles.searchBar}>
                    <div className={styles.bar}>
                        <img className={styles.Img} alt="loop" src={"../../public/search.png"} style={{width: "22px", height:"22px"}}/>
                        <input className={styles.inputbar} defaultValue={"Escribe el nombre de algun videojuego"} onChange={(e) => {setOn(false), setName(e.target.value)}} /> 
                    </div>
                    <button className={styles.searchButton} onClick={()=>{handleClick()}}> Buscar </button>
                </div>
            </div>

            <div className={styles.results}>
                {on && <Game name={name}/>}
            </div>
        </div>
    )

}

export function Game({name}){
    const games = useGame(name);

    return(
        <div style={{display:"flex", flexWrap:"wrap", flexDirection:"row", gap:"5vw", alignItems:"center", justifyContent:"center"}}>
            {games.isLoading  ? (
                    <div style={{display:"flex", flexWrap:"wrap", flexDirection:"row", gap:"5vw", alignItems:"center", justifyContent:"center"}}>
                        <CardLoader/>
                        <CardLoader/>
                        <CardLoader/>
                        <CardLoader/>
                        <CardLoader/>
                        <CardLoader/>
                    </div>
                ) : (
                    games.data.map(({titulo, genero, descripcion}) => (<GameCard key={titulo} name={titulo} gender={genero} description={descripcion}/>))
                )}
        </div>
    )

}