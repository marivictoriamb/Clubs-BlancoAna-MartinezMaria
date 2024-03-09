import { db } from "../firebase.js"
import { collection, getDocs, query, where, setDoc, doc} from "firebase/firestore"

export async function getGames(){
    const gamesCollection = collection(db, "games");
    const gamesSnapshot = await getDocs(gamesCollection);
    const games = gamesSnapshot.docs.map((doc) => doc.data()); // Data nos dara la informacion, name y description 

    return games;
}

export async function getGamesByCategory(category){
    const gamesCollection = collection(db, "games");
    const gamesQuery = query(gamesCollection, where("genero", "==", category)); // Filtro / tambien existe >= 
    const gamesSnapshot = await getDocs(gamesQuery);
    const games = gamesSnapshot.docs.map((doc) => doc.data()); 

    return games;
}


export async function getGame(id){
    const gamesCollection = collection(db, "games");
    const gamesQuery = query(gamesCollection, where("titulo", "==", id)); // Filtro / tambien existe >= 
    const gamesSnapshot = await getDocs(gamesQuery);
    const games = gamesSnapshot.docs.map((doc) => doc.data()); 

    return games[0];
}

export async function getGameId(id){
    const gamesCollection = collection(db, "games");
    const gamesQuery = query(gamesCollection, where("titulo", "==", id)); // Filtro / tambien existe >= 
    const gamesSnapshot = await getDocs(gamesQuery);

    return gamesSnapshot.docs[0].ref.path.split("/")[1];
}

