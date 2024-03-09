import { db } from "../firebase.js"
import { collection, getDocs, query, where, getDoc} from "firebase/firestore"

export async function getMembership(name){
    const usersCollections = collection(db, "users");
    const usersQuery = query(usersCollections, where("nombre", "==", name));
    const usersSnapshot = await getDocs(usersQuery);
    const users = usersSnapshot.docs.map((user) => user.data()); 
    return users;
}