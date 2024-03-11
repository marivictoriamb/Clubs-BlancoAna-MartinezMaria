import { useEffect, useState } from "react";
import { getGameId } from "../controllers/games";
import { getUserData } from "../controllers/auth";
import { useUser } from "./user";


export function favoriteGame(name){
    const [data, setData] = useState("");
    const user = useUser();
    
    useEffect(() => {
        async function cargarDatos(){
            const id = await getGameId(name);
            const question = await getUserData(user.email);
            if (question.juego_preferido == id){
                setData("../star.png");
            } else{
                setData("../console.png");
            }
        }

        cargarDatos();
    }, [])

    const isLoading = data == "";

    return {data, isLoading};
}