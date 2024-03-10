import { db } from "../firebase.js"
import {doc, collection, updateDoc } from "firebase/firestore";
import { getUserId } from "./auth.js";
import { useEffect, useState } from "react";
import { getUserData } from "../controllers/auth";
import { useUser } from "../hooks/user.js";
import { getClub, getClubId } from "./clubs.js";
import { getGameById } from "./games.js";

export function Membership(clubName){
    const user = useUser();
    const [club, setClub] = useState(null);
    const [games, setGames] = useState([]);
    const [show, setShow] = useState("...");
    const [want, setWant] = useState(false);

    useEffect(() => {
        async function fetchClubData() {
          const clubData = await getClub(clubName.name);
          setClub(clubData);
    
          const gamesData = await Promise.all(
            clubData[0].videojuegos.map(async (item) => {
              return await getGameById(item);
            })
          );
          setGames(gamesData);
    
            if (user != null && club != null){
              const data = await getUserData(user.email);
              const clubValue = await getClubId(club[0].nombre);
              const membershipValue = data.membresias;
              if (membershipValue.includes(clubValue) == true){
                setWant(true)
                setShow("Desafiliarse");
              } else {
                setWant(false)
                setShow("Afiliarse")
              }
            }
        };
    
        fetchClubData();
      });


    return {club, games, show, want, setWant};
}
