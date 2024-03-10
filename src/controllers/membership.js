import { db } from "../firebase.js"
import {doc, collection, updateDoc } from "firebase/firestore";
import { getUserId } from "./auth.js";
import { useEffect, useState } from "react";
import { getUserData } from "../controllers/auth";

export async function updateMembershipData(name, username, email, game, membership){
    const usersCollection = collection(db, "users");
    const ref = await getUserId(email);
    await updateDoc(doc(usersCollection, ref), {
        nombre: name,
        username: username,
        email: email,
        juego_preferido: game,
        membresias: membership,})
}
