import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/imgs/Logo.png"

function Login() {
    return (
        <Main>
            <img src={Logo} alt="logo" />
            <LoginForm>
                <input type="email" placeholder="email" />
                <input type="password" placeholder="senha" />
                <button>Entrar</button>
            </LoginForm>
            <Link to="/cadastro">
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>

        </Main>

    )
}

const Main = styled.main`
display: flex;
flex-direction: column;
height: 100vh;
width: 100vw;
align-items: center;
margin-top: 68px;
    img{
        margin-bottom: 32px;
    }
    a{
        color: #52B6FF;
        font-size: 13px;
    }
`
const LoginForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: 25px;

    input, button{
        width: 80vw;
        max-width: 1000px;
        height: 45px;
        box-sizing:border-box;
        margin-bottom: 6px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        line-height: 26px;
    }
    input{
        padding-left: 11px;
        padding-right: 11px;
    }
    input::placeholder{
       color: #DBDBDB;
    }
    button{
        border:none;
        background: #52B6FF;
        color: #FFFFFF;
    }
`

export default Login;