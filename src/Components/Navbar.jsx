import styled from "styled-components"
import React, { useState } from 'react';
import BurguerButton from "./BurgueButton";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(!clicked)
  }

  const handleNavigate = (name) => () => {
    navigate(name);
  }

  return (
    <Container>
      <NavContainer>
      <img src="../../public/game3.png"  onClick={handleNavigate("/landingadmin")}  className={`imagen`}/>
        <div className={`links ${clicked ? 'active' : ''}`}>
            <img src="./public/search2.png" onClick={handleNavigate("/buscador")} className={`imagen`}  />
            <img src="./public/user2.png" onClick={handleNavigate("/profile")}  className={`imagen`} />
        </div>
        <div className={`burguer`}>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
      </NavContainer>
    </Container>
  )

}


const Container = styled.div``

const NavContainer = styled.nav`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #5b3263;

  .imagen:hover{
    transform: scale(1.05);
  }

  .burguer{
    display: none
  }
  
  @media screen and (max-width: 768px){
    .burguer{
      display:inline-block;
    }
  }
  img{
    color: white
    text-decoratore: none;
    margin-right:4rem;
  }
  .links{
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: 2rem;
    margin-right: 2rem;
    text-align: center;
    transition: all .5s ease;
    a{
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media(min-width: 768px){
      position: initial;
      margin: 0;
      a{
        font-size: 1rem;
        color: white;
        display: inline;
      }
      display: block;
    }
  }
  .links.active{
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
    left: 2rem;
    right: 0;
    text-align: center;
    a{
      font-size: 2rem;
      margin-top: 1rem;
      color: white;
    }
  }
`

const BgDiv = styled.div`
  background-color: #5b3263;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all .6s ease ;
  
  &.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export default Navbar