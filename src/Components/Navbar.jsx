import styled from "styled-components"
import React, { useState } from 'react';
import BurguerButton from "./BurgueButton";

function Navbar() {

  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    setClicked(!clicked)
  }
  return (
    <Container>
      <NavContainer>
      <img src="../../public/game3.png" />
        <div className={`links ${clicked ? 'active' : ''}`}>
            <a onClick={handleClick} href="/landingadmin">Home</a>
            <a onClick={handleClick} href="/profile">Perfil</a>
            <a onClick={handleClick} href="/buscador">Buscar</a>
        </div>
        <div className='burguer'>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
      </NavContainer>
    </Container>
  )
}

const Container = styled.div``

const NavContainer = styled.nav`
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a{
    color: white
    text-decoratore: none;
    margin-right: 1rem;
  }
  .links{
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
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
    left: 0;
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