import { Link } from "react-router-dom"

function App(){
    return (
        <div className="Btns">
            <div className="LoginH"> <Link to="/login">Iniciar Sesion</Link> </div>
            
            <div className="RegisterH"> <Link to="/signup">Registrarse</Link></div>
        </div>
    )
} 
export default App
