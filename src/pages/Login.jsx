import { useEffect, useState } from 'react'
import '../css/Login.css'
import Forgotten from '../Components/Forgotten.jsx'
import { useRequiered } from '../hooks/requiered.js'
import {usePassword} from '../hooks/password.js'
import { useSizes } from '../hooks/sizes.js'
import {useUser} from "../hooks/user.js"
import { Link } from "react-router-dom"
import { loginWithCredentials, signInGoogle } from '../controllers/auth.js'
import { useNavigate } from "react-router-dom";


function Login(){
  const submit = useRequiered();
  const password = usePassword();
  const [popUp, setPopUp] = useState(false);
  const size = useSizes();

  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user != null){
      navigate("/landingadmin", {replace: true});
    }
  }, [user, navigate]);

  function handleBack(){
    if (user != null){
      navigate("/landingadmin", {replace: true});
    } else {
      navigate("/home", {replace: true});
    }
}

  const handleLogin = async () => {
      const user = await loginWithCredentials(email, passw);
      if (user == null){
        alert('No se tiene una cuenta registrada con dicho correo');
      }
  };

  const handleGoogleLogin = async () => {
    const user = await signInGoogle();
    if (user == null){
      alert('No se tiene una cuenta registrada con dicho correo');
    }
};

  

  return (
    <div className="All">
      <div className="Information" ref={size.sourceDivRef}>
        <div className='Top1'> 
        <button style={{backgroundColor:"white", border:"none", outline:"none", cursor:"pointer"}} onClick={() => handleBack()}><img className="Logo" alt="Logo" src="../../public/logo.png" style={{marginTop:"2px", width: "25vh", height:"15vh"}}/></button>
        <p style={{fontSize: "20px", width:"90%", textAlign:'center', fontWeight:"600"}}>Inicio de Sesion</p>
        </div>
        <form>
          <div className='Form'>
            <div className='Correo'> 
              <p style={{fontSize: "14px"}}>Correo</p>
              <div className='CorreoInput'><input pattern=".*@correo.unimet.edu.ve" required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} onChange={(e) => setEmail(e.target.value)} value={email}/></div> 
            </div>
            <div className='Contrasena'>
              <div className='ContrasenaText'>
                <p style={{fontSize: "14px"}}>Contraseña</p>
                <img onClick={() => password.handlePasswordClick(!password.isVisible)} alt="eye" src={password.eye} style={{width: "1.5vw", height:"1.5vw", cursor:"pointer"}}/>
              </div>
              <div className='ContrasenaInput'><input 
                  required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} type= {password.password}
                  minLength="6" maxLength="8" onChange={(e) => setPassw(e.target.value)} value={passw}/>
              </div>
              <button type="button" className='Forget' style={{cursor:"pointer", color:"rgb(87, 86, 86)"}}onClick={() => {submit.handleButtonClick(false); setPopUp(true);}}>Olvidaste tu contraseña?</button>
              <Forgotten trigger={popUp}width={ (size.targetWidth + size.targetWidth)} height={size.targetHeight} setTrigger={setPopUp}/>
            </div>
            <div className='Buttons'>
              <button className='Login' type="button" onClick={() => {submit.handleButtonClick(true), handleLogin()}}> Iniciar Sesion </button>
              <Link to="/signup"><button className='Register' style={{cursor:"pointer"}}onClick={() => submit.handleButtonClick(false)}>No tienes cuenta? Registrate aqui </button></Link>
            </div>
            <div className='Option'>
                <p style={{fontSize: "14px", textAlign:"center"}}>Tambien</p>
            </div>
            <div className='Google' >
              <button type="button" className="GoogleButton" onClick={() => {handleGoogleLogin()}}>Inicia Sesion con Google </button>
            </div>
          </div>
        </form>
      </div>
      <div className="Photo" ref={size.targetDivRef} style={{ width: size.targetWidth, height: size.targetHeight }}>
        <img className="Inicio" alt="Inicio" src="https://www.unimet.edu.ve/wp-content/uploads/2023/12/FOTOS-CAMPUS-2023-24-1-1024x683.jpg" style={{height: size.targetHeight }}/>
      </div>
    </div>
  )
}

export default Login
