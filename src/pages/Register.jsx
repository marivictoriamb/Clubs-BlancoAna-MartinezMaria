import { useState, useEffect } from 'react'
import styles from '../css/Login.module.css'
import { useRequiered } from '../hooks/requiered.js'
import {usePassword} from '../hooks/password.js'
import { useSizes } from '../hooks/sizes.js'
import { Link } from "react-router-dom"
import { registerWithCredentials, signUpGoogle } from '../controllers/auth.js'
import { useGames } from '../controllers/api.js'
import { useNavigate } from "react-router-dom";
import {useUser} from "../hooks/user.js"
import { getGame, getGameId, getGames } from '../controllers/games.js'

function Register(){
  const submit = useRequiered();
  const password = usePassword();
  const size = useSizes();
  const games = useGames();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [game, setGame] = useState("1");
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user != null){
      navigate("/landingadmin", {replace: true});
    }
  }, [user, navigate]);

  async function handleGame(value){
    const g = await getGameId(value);
    setGame(g);
  }

  const handleRegister = async () => {
      const user = await registerWithCredentials(name, username, email, passw, game);
      if (user == null){
        alert('Ya se tiene una cuenta registrada con dicho correo');
      } 
  };

  async function handleGameTitle(){
    const g = await getGames();
    await handleGame(g[0].titulo);
  }

  async function handleGoogleRegister() {
    await handleGameTitle()
    const user = await signUpGoogle(game);
    if (user == null){
      alert('No se tiene una cuenta registrada con dicho correo');
    }
  };

  return (
    <div className={styles.All}>
      <div className={styles.Photo} ref={size.targetDivRef} style={{ width: size.targetWidth, height: size.targetHeight }}>
        <img className={styles.Inicio} alt="Inicio" src="https://www.unimet.edu.ve/wp-content/uploads/2023/12/FOTOS-CAMPUS-2023-24-1-1024x683.jpg" style={{height: size.targetHeight }}/>
      </div>
      <div className={styles.Information} ref={size.sourceDivRef}>
        <p style={{fontSize: "20px", width:"90%", textAlign:'center', fontWeight:"600"}}>Registro</p>
        <form>
          <div className={styles.Form}>
            <div className={styles.Nombre}> 
              <p style={{fontSize: "14px"}}>Nombre y Apellido</p>
              <div className={styles.NombreInput}><input required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} onChange={(e) => setName(e.target.value)}/></div> 
            </div>
            <div className={styles.Username}> 
              <p style={{fontSize: "14px"}}>Username</p>
              <div className={styles.UsernameInput}><input required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} onChange={(e) => setUsername(e.target.value)}/></div> 
            </div>
            <div className={styles.Correo}> 
              <p style={{fontSize: "14px"}}>Correo</p>
              <div className={styles.CorreoInput}><input pattern=".*@correo.unimet.edu.ve" required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} onChange={(e) => setEmail(e.target.value)}/></div> 
            </div>
            <div className={styles.Contrasena}>
              <div className={styles.ContrasenaText}>
                <p style={{fontSize: "14px"}}>Contraseña</p>
                <img onClick={() => password.handlePasswordClick(!password.isVisible)} alt="eye" src={password.eye} style={{width: "1.5vw", height:"1.5vw", cursor:"pointer"}}/>
              </div>
              <div className={styles.ContrasenaInput}><input 
                  required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} type= {password.password}
                  minLength="6" maxLength="8" onChange={(e) => setPassw(e.target.value)}/>
              </div>
              <p className={styles.Details} style={{fontSize:"12px"}}>Usa de 6 a 8 caracteres</p>
            </div>
            <div className={styles.Videojuegos}> 
              <p style={{fontSize: "14px"}}>Videojuego Favorito</p>
              <div className={styles.VideojuegoFavorito}><select name="VideojuegoFavorito" onChange={(e) => handleGame(e.target.value)}>
              {games.isLoading  ? (
                  <option key={"loading"}> . . .</option>
              ) : (
                  games.data.map((game, id) => (<option key={id} >{game.titulo}</option>
                  ))
              )}
                        </select></div> 
            </div>
            <div className={styles.Buttons}>
              <button className={styles.Login} type="button" onClick={() => {submit.handleButtonClick(true), handleRegister()}}> Craer cuenta </button>
              <button className={styles.Register} style={{cursor:"pointer"}}onClick={() => {submit.handleButtonClick(false), navigate("/login")}}>Ya tienes una cuenta? Inicia Sesion </button>
            </div>
            <div className={styles.Option}>
                <p style={{fontSize: "16px", textAlign:"center"}}>Tambien</p>
            </div>
            <div className={styles.Google}>
              <button type="button" className={styles.GoogleButton}  onClick={() => {handleGoogleRegister()}}>Registrate con Google </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

