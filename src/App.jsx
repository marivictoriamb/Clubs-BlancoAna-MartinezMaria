import { Link, useNavigate } from "react-router-dom"

function App(){
    const navigate = useNavigate();

    return (
        <div className="Btns">
            <button className="LoginH" onClick={() => {navigate("/login")}}> Iniciar Sesion </button>
            
            <button className="RegisterH"  onClick={() => {navigate("/signup")}}> Registrarse</button>
        </div>
    )
} 
export default App
