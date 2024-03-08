import { useNavigate } from "react-router-dom";
import { getUserData, updateUserData } from "../controllers/auth";
import { useUser } from "../hooks/user";
import { useState } from "react";

export default function Profile(){
    const navigate = useNavigate();
    const user = useUser();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [carrer, setCarrer] = useState("");
    const [email, setEmail] = useState("");
    restoreData();

    async function restoreData(){
        if (user!= null && name == ""){
            const data = await getUserData(user.uid);
            setName(data.name);
            setPhone(data.number);
            setCarrer(data.carrer);
            setEmail(data.email);

        }
        
    }    

    async function handleData(){
        updateUserData(user.uid, name, email, phone, carrer);
        restoreData();
    }

    return (
        <div>
            <form>
            <label className="Nombre">Nombre: <input defaultValue={name} onChange={(e) => {setName(e.target.value)}}></input></label>
            <label className="Telefono">Telefono: <input defaultValue={phone} onChange={(e) => setPhone(e.target.value)}></input></label>
            <label className="Carrera">Carrera: <select value={carrer} name="CarrerOption" onChange={(e) => setCarrer(e.target.value)}>
                            <option value="Ingenieria Civil"> Ingenieria Civil </option>
                            <option value="Ingenieria Mecanica"> Ingenieria Mecanica </option>x
                            <option value="Ingenieria Produccion"> Ingenieria Produccion </option>
                            <option value="Ingenieria Quimica"> Ingenieria Quimica </option>
                            <option value="Ingenieria Electrica"> Ingenieria Electrica </option>
                            <option value="Ingenieria Sistemas"> Ingenieria Sistemas </option>
                            <option value="Ciencias Administrativas"> Ciencias Administrativas </option>
                            <option value="Economia Empresarial"> Economia Empresarial </option>
                            <option value="Contaduria Publica"> Contaduria Publica </option>
                            <option value="Psicologia"> Psicologia </option>
                            <option value="Matematicas Industriales"> Matematicas Industriales </option>
                            <option value="Educacion"> Educacion </option>
                            <option value="Idiomas Modernos"> Idiomas Modernos </option>
                            <option value="Estudios Liberales"> Estudios Liberales </option>
                            <option value="Derecho"> Derecho </option>
                        </select>x</label>
            <label className="Correo">Correo: <input defaultValue={email} onChange={(e) => setEmail(e.target.value)}></input></label>
            <button type="button" onClick={() => {handleData()}}>Actualizar</button>
            </form>
            
        </div>
    );

}
