import styled from "styled-components";

function Footer(){
    return(
        <Foot>
            <p>Hábitos</p>
            <button>Hoje</button>
            <p>Histórico</p>
        </Foot>
    )
}

const Foot = styled.footer`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
height: 70px;
position: fixed;
background: #FFFFFF;
bottom:0;
left: 0;

    p{
        margin-left: 30px;
        margin-right: 30px;
        color: #52B6FF;
    }
`
export default Footer;