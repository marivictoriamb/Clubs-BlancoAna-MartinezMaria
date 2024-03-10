import { db } from "../firebase.js"
import {doc, collection, updateDoc } from "firebase/firestore";
import { getUserId } from "./auth.js";
import { useEffect, useState } from "react";
import { getUserData } from "../controllers/auth";


