import styled from "styled-components"
import { createGlobalStyle } from "styled-components"
import Header from "./Header"
import Footer from "./Footer"

function Today(){
    return (
        <>
            <GlobalStyle />
            <Header />
            <Main>
                <p>aajjaajjajja</p>
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

export default Today;