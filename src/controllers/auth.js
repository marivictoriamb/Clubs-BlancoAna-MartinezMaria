import { getAdditionalUserInfo, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc, collection, addDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { auth, googleProvider } from "../firebase";
import { db } from "../firebase.js"

export async function signUpGoogle(){
    try{
        const result = await signInWithPopup(auth, googleProvider);


        const adittionalInfo = getAdditionalUserInfo(result); 

        if(adittionalInfo.isNewUser){
            const usersCollection = collection(db, "users");
            await setDoc(doc(usersCollection, result.user.email), {id: result.user.email, name: result.user.displayName, picture: result.user.phtoURL, agrupationsAssociated: [], phone:"", password:""})
        }
        

        return result.user;
        
    } catch (error){
        console.error(error);
    }
  }


  export async function signInGoogle(){
    try{
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
        
    } catch (error){
        console.error(error);
    }
  }


export async function logOut(){
    try{
        await signOut(auth);
        // Al usar esta funcion setear al usuario a NULL
    } catch (error){
        console.error(error);
    }   
}


export async function loginWithCredentials(email, password){
    try{
        const {user} = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        alert(error);
        console.error(error);
        return null;
    }
}


export async function registerWithCredentials(name, email, password, number, carrer){
    try{
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        await createUserData(user.uid, name, email, number, carrer)
        return user;
    } catch (error) {
        alert(error);
        console.error(error);
        return null;
    }
}

export async function createUserData (id, name, email, number, carrer){
    const usersCollection = collection(db, "users");
    const data = {id, name, email, number, carrer};
    await addDoc(usersCollection, data);
}


export async function getUserData(id){
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("id", "==", id));
    const userSnapshot = await getDocs(userQuery);
    const users = userSnapshot.docs.map((doc) => doc.data()); 

    return users[0];
}

export async function getUserId(id){
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("id", "==", id));
    const userSnapshot = await getDocs(userQuery);

    return userSnapshot.docs[0].ref.path;
}


export async function updateUserData(id, name, email, number, carrer){
    const usersCollection = collection(db, "users");
    const ref = await getUserId(id);
    const parts = ref.split("/");
    await updateDoc(doc(usersCollection, parts[1]), {id, name, email, number, carrer})
}
