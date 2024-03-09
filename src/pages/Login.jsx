import { useEffect, useState } from 'react'
import styles from '../css/Login.module.css'
import ErrorLogin from '../Components/ErrorLogin.jsx'
import { useRequiered } from '../hooks/requiered.js'
import {usePassword} from '../hooks/password.js'
import { useSizes } from '../hooks/sizes.js'
import {useUser} from "../hooks/user.js"
import { loginWithCredentials, signInGoogle } from '../controllers/auth.js'
import { useNavigate } from "react-router-dom";


function Login(){
  const submit = useRequiered();
  const password = usePassword();
  const size = useSizes();
  const [popUp, setPopUp] = useState(false);

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
    setPopUp(false);
      const user = await loginWithCredentials(email, passw);
      if (user == null){
        setPopUp(true);
      }
  };

  const handleGoogleLogin = async () => {
    setPopUp(false);
    const user = await signInGoogle();
    if (user == null){
      setPopUp(true);
    }
};

  

  return (
    <div className={styles.All}>
      <div className={styles.Information} ref={size.sourceDivRef}>
        <p id={styles.p}style={{fontSize: "30px", width:"90%", textAlign:'center', fontWeight:"600"}}>Inicio de Sesion</p>
        <form>
          <div className={styles.Form}>
            <div className={styles.Correo}> 
              <p id={styles.p} style={{fontSize: "14px"}}>Correo</p>
              <div className={styles.CorreoInput}><input pattern=".*@correo.unimet.edu.ve" required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} onChange={(e) => setEmail(e.target.value)} value={email}/></div> 
            </div>
            <div className={styles.Contrasena}>
              <div className={styles.ContrasenaText}>
                <p id={styles.p} style={{fontSize: "14px"}}>Contraseña</p>
                <img onClick={() => password.handlePasswordClick(!password.isVisible)} alt="eye" src={password.eye} style={{width: "1.5vw", height:"1.6vw", cursor:"pointer"}}/>
              </div>
              <div className={styles.ContrasenaInput}><input 
                  required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} type= {password.password}
                  minLength="6" maxLength="8" onChange={(e) => setPassw(e.target.value)} value={passw}/>
              </div>
            </div>
            <div className={styles.Buttons}>
              <button className={styles.Login} type="button" onClick={() => {submit.handleButtonClick(true), handleLogin()}}> Iniciar Sesion </button>
              <button className={styles.Register} style={{cursor:"pointer"}}onClick={() => {submit.handleButtonClick(false), navigate("/signup")}}>No tienes cuenta? Registrate aqui </button>
            </div>
            <div className={styles.Option}>
                <p id={styles.p} style={{fontSize: "14px", textAlign:"center"}}>Tambien</p>
            </div>
            <div className={styles.Google}>
              <button type="button" className={styles.GoogleButton} onClick={() => {handleGoogleLogin()}}>Inicia Sesion con Google </button>
            </div>
          </div>
        </form>
        {popUp && <ErrorLogin/>}
      </div>
      <div className={styles.Photo} ref={size.targetDivRef} style={{ width: size.targetWidth, height: size.targetHeight }}>
        <img className={styles.Inicio} alt="Inicio" src="../../public/photo.jpg" style={{height: size.targetHeight }}/>
      </div>
    </div>
  )
}

export default Login
