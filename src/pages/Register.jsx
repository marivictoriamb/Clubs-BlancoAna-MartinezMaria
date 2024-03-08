import { useState, useEffect } from 'react'
import '../css/Login.css'
import { useRequiered } from '../hooks/requiered.js'
import {usePassword} from '../hooks/password.js'
import { useSizes } from '../hooks/sizes.js'
import { Link } from "react-router-dom"
import { registerWithCredentials, signUpGoogle, createUserData } from '../controllers/auth.js'
import { useNavigate } from "react-router-dom";
import {useUser} from "../hooks/user.js"

function Register(){
  const submit = useRequiered();
  const password = usePassword();
  const size = useSizes();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [number, setNumber] = useState(0);
  const [carrer, setCarrer] = useState("");
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user != null){
      navigate("/landingadmin", {replace: true});
    }
  }, [user, navigate]);

  function handleBack(){
      if (user != null){
        navigate("/landingadmin");
      } else {
        navigate("/home");
      }
  }

  const handleRegister = async () => {
      const user = await registerWithCredentials(name, email, passw, number, carrer);
      if (user == null){
        alert('Ya se tiene una cuenta registrada con dicho correo');
      } 
  };

  const handleGoogleRegister = async () => {
    const user = await signUpGoogle();
    if (user == null){
      alert('No se tiene una cuenta registrada con dicho correo');
    }
  };

  return (
    <div className="All">
      <div className="Photo" ref={size.targetDivRef} style={{ width: size.targetWidth, height: size.targetHeight }}>
        <img className="Inicio" alt="Inicio" src="https://www.unimet.edu.ve/wp-content/uploads/2023/12/FOTOS-CAMPUS-2023-24-1-1024x683.jpg" style={{height: size.targetHeight }}/>
      </div>
      <div className="Information" ref={size.sourceDivRef}>
      <div className='Top2'> 
        <p style={{fontSize: "20px", width:"90%", textAlign:'center', fontWeight:"600"}}>Crear Cuenta</p>
        <button style={{backgroundColor:"white", border:"none", outline:"none", cursor:"pointer"}} onClick={() => handleBack()}><img className="Logo" alt="Logo" src="../../public/logo.png" style={{marginTop:"2px", marginRight:"10px", width: "25vh", height:"15vh"}}/></button>
        </div>
        <form>
          <div className='Form'>
            <div className='Nombre'> 
              <p style={{fontSize: "14px"}}>Nombre y Apellido</p>
              <div className='NombreInput'><input required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} onChange={(e) => setName(e.target.value)}/></div> 
            </div>
            <div className='Correo'> 
              <p style={{fontSize: "14px"}}>Correo</p>
              <div className='CorreoInput'><input pattern=".*@correo.unimet.edu.ve" required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} onChange={(e) => setEmail(e.target.value)}/></div> 
            </div>
            <div className='Contrasena'>
              <div className='ContrasenaText'>
                <p style={{fontSize: "14px"}}>Contraseña</p>
                <img onClick={() => password.handlePasswordClick(!password.isVisible)} alt="eye" src={password.eye} style={{width: "1.5vw", height:"1.5vw", cursor:"pointer"}}/>
              </div>
              <div className='ContrasenaInput'><input 
                  required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} type= {password.password}
                  minLength="6" maxLength="8" onChange={(e) => setPassw(e.target.value)}/>
              </div>
              <p className='Details' style={{fontSize:"12px"}}>Usa de 6 a 8 caracteres</p>
            </div>
            <div className='Number'> 
              <p style={{fontSize: "14px"}}>Telefono</p>
              <div className='TelefonoInput'><input pattern="^04\d{9}" maxLength="11" minLength="11" required = {submit.isSubmit} type="number" style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} onChange={(e) => setNumber(e.target.value)}/></div> 
            </div>
            <div className='Carrer'> 
              <p style={{fontSize: "14px"}}>Carrera</p>
              <div className='CarrerInput'><select name="CarrerOption" onChange={(e) => setCarrer(e.target.value)}>
                            <option value="Carrera"> Carrera </option>
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
                        </select></div> 
            </div>
            <div className='Buttons'>
              <button className='Login' type="button" onClick={() => {submit.handleButtonClick(true), handleRegister()}}> Craer cuenta </button>
              <Link to="/login"><button className='Register' style={{cursor:"pointer"}}onClick={() => submit.handleButtonClick(false)}>Ya tienes una cuenta? Inicia Sesion </button></Link>
            </div>
            <div className='Option'>
                <p style={{fontSize: "16px", textAlign:"center"}}>Tambien</p>
            </div>
            <div className='Google'>
              <button type="button" className="GoogleButton"  onClick={() => {handleGoogleRegister()}}>Registrate con Google </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
