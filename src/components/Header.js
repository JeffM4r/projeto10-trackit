import styled from "styled-components";
import TokenContext from "../assets/context/TokenContext";
import { useContext } from "react";

function Header(){
    const {data} = useContext(TokenContext)

    return(
        <Head>
            <p>TrackIt</p>
            <img src={data.image}alt="perfil"/>
        </Head>
    )
}

const Head = styled.header`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
height: 70px;
position: fixed;
background: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
top:0;
left: 0;
 p{
    margin-left: 18px;
    font-family: 'Playball', cursive;
    font-size: 40px;
    color: #FFFFFF;
 }
 img{
    margin-right: 10px;
    width: 51px;
    height: 51px;
    object-fit: cover;
    border-radius: 50px;
 }
`

export default Header;