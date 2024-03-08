import { useState,useEffect } from "react";
import { createAgrupation } from "../controllers/agrupaciones";
import { useAgrupations } from "../controllers/api";
import AgrupationCard from '../Components/AgrupationCard.jsx'
import { logOut } from "../controllers/auth.js";
import { useNavigate } from "react-router-dom";
import {useUser} from "../hooks/user.js"
import { Link } from "react-router-dom"


export default function LandingAdmin(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [want, setWant] = useState(false);
    const [show, setShow] = useState("Mostrar Agrupaciones");

    const navigate = useNavigate();
    const user = useUser();

    function handleLogOut(){
        logOut();
        navigate("/home", {replace: true});
    }

    /**
  useEffect(() => {
    if (user == null){
      navigate("/home", {replace: true});
    }
    }, [user, navigate]);
     */

    async function handleSubmit(){
        await createAgrupation({name, description});
        alert("Agrupacion Creada");
    }

    function handleShow(){
        setWant(!want);
        if (want){
            setShow("Mostrar Agrupaciones");
        } else {
            setShow("Dejar de Mostrar");
        }
    }

    return (
        <div>
            <Link to="/home"><button className="Close" onClick={() => {handleLogOut()}}>Cerrar Sesion</button></Link>
            <div className="Create">
                <label> Nombre:<input value={name} onChange={(e) => setName(e.target.value)}/></label>
                <label> Descripcion: <input value={description} onChange={(e) => setDescription(e.target.value)}/></label>
                <button onClick={handleSubmit}>Enviar</button>
            </div>
            <div className="Read">
                <button className="See" onClick={() => {handleShow()}}>{show}</button>
                {want && <Card />}
            </div>
            <div className="Perfil">
                <button className="SeePerfil" onClick={() => {navigate("/profile", {replace:true})}}>Ver Perfil</button>
            </div>
            
        </div>
    );
}

export function Card(){
    const agrupations = useAgrupations();

    return(
        <div>
            {agrupations.isLoading  ? (
                    <div>Cargando . . .</div>
                ) : (
                    agrupations.data.map(({name, description}) => (<AgrupationCard key={name} name={name} description={description}/>
                    ))
                )}
        </div>
    )
}