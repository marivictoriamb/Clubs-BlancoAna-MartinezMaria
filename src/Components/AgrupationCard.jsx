import { useState } from 'react';
import { deleteAgrupation } from '../controllers/agrupaciones';
import './AgrupationCard.css'

function AgrupationCard({name, description}){    
    async function handleSubmit(){
        await deleteAgrupation(name);
        alert("Agrupacion Eliminada");
    }

    return(
        <div className="Card">
            
            <h1 style={{fontSize:"4vh"}} className="AgrupationName">{name}</h1>
            <p style={{fontSize:"4vh", color:"rgb(202, 198, 198)"}} className="AgrupationDescription">{description}</p>
            <button className='Delete' onClick={()=>{handleSubmit()}}>Delete</button>
        </div>
    )
}
export default AgrupationCard;