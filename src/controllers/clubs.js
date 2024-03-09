import { db } from "../firebase.js"
import { collection, getDocs, query, where, getDoc} from "firebase/firestore"



export async function getClubs(){
    const clubsCollections = collection(db, "clubs");
    const clubsSnapshot = await getDocs(clubsCollections);
    const clubs = clubsSnapshot.docs.map((doc) => doc.data()); // Data nos dara la informacion, name y description 

    return clubs;
}

export async function getClub(id){
    const clubsCollections = collection(db, "clubs");
    const clubsQuery = query(clubsCollections, where("nombre", "==", id));
    const clubsSnapshot = await getDocs(clubsQuery);
    const clubs = clubsSnapshot.docs.map((doc) => doc.data()); 
    return clubs;
}

export async function getClubId(id){
    const clubsCollections = collection(db, "clubs");
    const clubsQuery = query(clubsCollections, where("nombre", "==", id));
    const clubsSnapshot = await getDocs(clubsQuery);

    return clubsSnapshot.docs[0].ref.path.split("/")[1];
}

export async function getClubById(id){
    const clubRef = doc(db, "clubs", id);
    const clubSnapshot = await getDoc(clubRef);

    return clubSnapshot.data(); // Aqui tienes el objeto club, para acceder a su nombre es objeto.nombre (nombre porque asi esta definido en la base de datos)
}

