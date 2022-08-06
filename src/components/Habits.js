import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';
import Header from "./Header";
import Footer from "./Footer";

function Habits() {
    return (
        <>
            <GlobalStyle />
            <Header />
            <Main>
                <AddHabits>
                    <p>Meus hábitos</p>
                    <button><ButtonText>+</ButtonText></button>
                </AddHabits>
                <NoHabits>
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                </NoHabits>
            </Main>
            <Footer />
        </>
    )
}

const GlobalStyle = createGlobalStyle`
body{
    background-color: #D4D4D4;
}
`

const Main = styled.main`
margin-top: 70px;
width: 100vw;
`

const AddHabits = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 100px;
height: 35px;
button{
    height:35px;
    width: 40px;
    font-size: 26px;
    margin-right: 18px;
    border: none;
    color: #FFFFFF;
    background-color: #52B6FF;
    border-radius: 4px;
    position: relative;
}
p{
    font-size: 22px;
    margin-left: 18px;
    font-size: 22px;
    color: #126BA5;
}
`

const ButtonText = styled.span`
position: absolute;
bottom: 3px;
right: 13px;
`

const NoHabits = styled.div`
width: 100vw;
display: flex;
justify-content: center;
p{
    margin-top: 28px;
    width: 90vw;
    color: #666666;
    font-size: 17px;
    line-height: 22px;
}
`



export default Habits;