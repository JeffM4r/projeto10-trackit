import styled from "styled-components";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import {Link} from 'react-router-dom';

function Footer(){
    const percent = 3
    const tarefas = 4


    return(
        
        <Foot>
            <Link to="/habitos" style={{textDecoration:"none"}}><p>Hábitos</p></Link>
            <Link to="/hoje"><Circle><div><CircularProgressbarWithChildren styles={buildStyles({pathTransitionDuration: 0.15})} value={percent} maxValue={tarefas}><Text>hoje</Text></CircularProgressbarWithChildren></div></Circle></Link>
            <Link to="/historico" style={{textDecoration:"none"}}> <p>Histórico</p> </Link>
        </Foot>
    )
}


const Circle = styled.div`
    background-color: #52B6FF;
    width: 91px;
    height: 91px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    text-align: center;
    color: #FFFFFF;
    margin-bottom: 20px;
    position: fixed;
    bottom: 0;
    left: 40vw;
    div{
        width: 90%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .CircularProgressbar-path {
        stroke: #ffffff;
    }
    .CircularProgressbar-trail {
        stroke: transparent;
    }
`
const Text = styled.span`
font-size: 18px;
margin-top: 68px;
`

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