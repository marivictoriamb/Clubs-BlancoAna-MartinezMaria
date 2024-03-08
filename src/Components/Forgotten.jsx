import React from "react"
import './Forgotten.css'
import { useState } from 'react'


function Forgotten(props) {
    const [isSubmitP, setIsSubmitP] = useState(false);

    const handleButtonClickP = (isSubmitP) => {
        setIsSubmitP(isSubmitP);
      };

    return (props.trigger) ? (
        <div className="popup" style={{ width: props.targetWidth, height: props.targetHeight }}>
            <div className="popupContent">
                <img className="Logo" alt="Logo" src="../../public/logo.png" style={{width: "30vh", height:"40vh"}}/>
                <div className="Tittle">
                    <h1 style={{fontSize:"4vh"}}>Olvidó su Contraseña?</h1>
                    <p style={{fontSize: "2vh"}}> Ingrese su dirección de correo para obtener restablecer su contraseña.</p>
                </div>
                <div className='CorreoP'> 
                    <p style={{fontSize: "2vh"}}>Correo</p>
                    <div className='CorreoInputP'><input pattern=".*@correo.unimet.edu.ve" required={isSubmitP} style={{fontSize: "3vh", padding:"10px", paddingLeft:"20px"}}/></div> 
                </div>
                <div className='ButtonsP'>
                    <button className='Establish' type="submit" onClick={() => handleButtonClickP(true)}> Craer cuenta </button>
                    <button className='LoginP' style={{cursor:"pointer"}}onClick={() => {handleButtonClickP(false); props.setTrigger(false);}}>Ir a Inicio de Sesion </button>
                </div>
            </div>
        </div>
    ) : "";

}
export default Forgotten