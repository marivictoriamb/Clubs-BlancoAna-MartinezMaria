import { useEffect, useState } from "react";
import { getClubs, getClubsId } from "./clubs";
import { getGames, getGamesByName } from "./games";

export function useClubs(){
    const [data, setData] = useState(null);
    const [id, setId] = useState(null)

    useEffect(() => {
        async function cargarDatos(){
            const clubs = await getClubs();
            setData(clubs);
            const ids = await getClubsId();
            setId(ids);
        }

        cargarDatos();
    }, [])

    const isLoading = data == null;
    const isCharging = id == null;

    return {data, isLoading, id, isCharging};
}


export function useGames(){
    const [data, setData] = useState(null);

    useEffect(() => {
        async function cargarDatos(){
            const games = await getGames();
            setData(games);
        }

        cargarDatos();
    }, [])

    const isLoading = data == null;

    return {data, isLoading};
}

export function useGame(name){
    const [data, setData] = useState(null);

    useEffect(() => {
        async function cargarDatos(){
            const games = await getGamesByName(name);
            setData(games);
        }

        cargarDatos();
    }, [name])

    const isLoading = data == null;

    return {data, isLoading};
}

