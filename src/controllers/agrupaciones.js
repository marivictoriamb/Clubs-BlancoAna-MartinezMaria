import { db } from "../firebase.js"
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, updateDoc} from "firebase/firestore"

export async function createAgrupation ({name, description}){
    const agrupationCollection = collection(db, "agrupations");
    const data = {name, description};
    await addDoc(agrupationCollection, data);
}

export async function getAgrupations(){
    const agrupationCollection = collection(db, "agrupations");
    const agrupationsSnapshot = await getDocs(agrupationCollection);
    const agrupations = agrupationsSnapshot.docs.map((doc) => doc.data()); // Data nos dara la informacion, name y description 

    return agrupations;
}

export async function getAgrupationCategory(category){
    const agrupationCollection = collection(db, "agrupations");
    const agrupationQuery = query(agrupationCollection, where("category", "==", category)); // Filtro / tambien existe >= 
    const agrupationsSnapshot = await getDocs(agrupationQuery);
    const agrupations = agrupationsSnapshot.docs.map((doc) => doc.data()); 

    return agrupations;
}


export async function getAgrupation(name){
    const agrupationCollection = collection(db, "agrupations");
    const agrupationQuery = query(agrupationCollection, where("name", "==", name));
    const agrupationsSnapshot = await getDocs(agrupationQuery);
    const agrupations = agrupationsSnapshot.docs.map((doc) => doc.data()); 

    return agrupations;
}

export async function getAgrupationId(name){
    const agrupationCollection = collection(db, "agrupations");
    const agrupationQuery = query(agrupationCollection, where("name", "==", name));
    const agrupationsSnapshot = await getDocs(agrupationQuery);

    return agrupationsSnapshot.docs[0].ref;
}


export async function updateAgrupation(name, description){
    const agrupationCollection = collection(db, "agrupations");

    await updateDoc(doc(agrupationCollection, getUserId(name)), {name, description})
}

export async function deleteAgrupation(name){
    const agrupationCollection = collection(db, "agrupations");
    const agrupationQuery = query(agrupationCollection, where("name", "==", name));
    const agrupationsSnapshot = await getDocs(agrupationQuery);

    await deleteDoc(agrupationsSnapshot.docs[0].ref);
}

