import { db } from "../firebase.js"
import { collection, getDocs, query, where} from "firebase/firestore"



export async function getClubs(){
    const clubsCollections = collection(db, "clubs");
    const clubsSnapshot = await getDocs(clubsCollections);
    const clubs = clubsSnapshot.docs.map((doc) => doc.data()); // Data nos dara la informacion, name y description 

    return clubs;
}

export async function getClub(id){
    const clubsCollections = collection(db, "clubs");
    const clubsQuery = query(clubsCollections, where("id", "==", id));
    const clubsSnapshot = await getDocs(clubsQuery);
    const clubs = clubsSnapshot.docs.map((doc) => doc.data()); 
    return clubs;
}


