import {useParams} from "react-router-dom";
import {getClub} from "../controllers/clubs.js";



export default function ClubProfile(){
    const {clubName} = useParams();
    const club = getClub(clubName);
    console.log(clubName);

    return (
        <div>
            <div>
                <h1>{club.name}</h1>
                <img src="./public/GameZone.png"></img>
                <h1>{club.description}</h1>
                <div>{club.description}</div>
            </div>
            <div>
                {club.videojuegos}
            </div>
        </div>)
}