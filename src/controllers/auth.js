import { getAdditionalUserInfo, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc, collection, addDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { auth, googleProvider } from "../firebase";
import { db } from "../firebase.js"

export async function signUpGoogle(game){
    try{
        const result = await signInWithPopup(auth, googleProvider);


        const adittionalInfo = getAdditionalUserInfo(result); 

        if(adittionalInfo.isNewUser){
            await addDoc(collection(db, "users"), {
                nombre: result.user.displayName,
                username: result.user.email.split("@")[0],
                email: result.user.email,
                juego_preferido: game,
                membresias: [],
              });
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


export async function registerWithCredentials(name, username, email, password, game){
    try{
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        await createUserData(name, username, email, game)
        return user;
    } catch (error) {
        alert(error);
        console.error(error);
        return null;
    }
}

export async function createUserData (name, username, email, game){
    await addDoc(collection(db, "users"), {
        nombre: name,
        username: username,
        email: email,
        juego_preferido: game,
        membresias: [],
      });
}


export async function getUserData(email){
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);
    const users = userSnapshot.docs.map((doc) => doc.data()); 

    return users[0];
}

export async function getUserId(email){
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);
    return userSnapshot.docs[0].ref.path.split("/")[1];
}


export async function updateUserData(name, username, email, game){
    const usersCollection = collection(db, "users");
    const ref = await getUserId(email);
    await updateDoc(doc(usersCollection, ref), {
        nombre: name,
        username: username,
        email: email,
        juego_preferido: game,
        membresias: [],})
}
