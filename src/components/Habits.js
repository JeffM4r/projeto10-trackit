import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

function Habits() {
    return (
        <>
            <Header />
            <Main>
                <div></div>
            </Main>
            <Footer/>
        </>
    )
}

const Main = styled.main`
margin-top: 70px;
width: 100vw;
height: calc(100vh - 70px);
background-color: #D4D4D4;
`

export default Habits;