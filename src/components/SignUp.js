import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/imgs/Logo.png";
import { signUp } from "../assets/services/trackIt";
import { ThreeDots } from  'react-loader-spinner';
import { useState } from "react";

function SignUp() {
    const [isSignIn,setIsSignIn] = useState(false);
    const [form ,setForm] = useState({email: "", name: "", image: "", password: ""});
    let navigate = useNavigate();

    function SignUpError(){
        setIsSignIn(false);
        alert("Houve um erro nessa tentativa de cadastro, por favor tente novamente");        
    }

    function SignUpSucces(response){
        console.log(response)
        navigate('/')
    }

    function handleSubmit(event){
        event.preventDefault();
        if(isSignIn){return};
        setIsSignIn(!isSignIn);
        const promise = signUp(form);
        promise.then(response => SignUpSucces(response));
        promise.catch(SignUpError);                
    }   

    return (
        <Main>
            <img src={Logo} alt="logo" />
            <SignForm onSubmit={handleSubmit} isSignIn={isSignIn}>
                <input required disabled={isSignIn ? true: false } onChange={(e) => setForm({...form, email: e.target.value})} type="email" placeholder="email" />
                <input required disabled={isSignIn ? true: false } onChange={(e) => setForm({...form, password: e.target.value})} type="password" placeholder="senha" />
                <input required disabled={isSignIn ? true: false } onChange={(e) => setForm({...form, name: e.target.value})} type="text" placeholder="nome" />
                <input required disabled={isSignIn ? true: false } onChange={(e) => setForm({...form, image: e.target.value})} placeholder="foto" />
                <button>{isSignIn? 
                        <ThreeDots
                        height = "35"
                        width = "80"
                        radius = "9"
                        color = 'white'
                        ariaLabel = 'three-dots-loading'     
                        wrapperStyle
                        wrapperClass
                        />:"Cadastrar"}</button>                
            </SignForm>
            <Link to="/">
                <p>Já tem uma conta? Faça login!</p>
            </Link>

        </Main>

    )
}

const Main = styled.main`
display: flex;
flex-direction: column;
height: 80vh;
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
const SignForm = styled.form`
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
        display: flex;
        align-items: center;
        justify-content: center;
        border:none;
        background:  #52B6FF;
        color: #FFFFFF;
        ${props => props.isSignIn ?  "opacity: 0.7;" : ""}  
    }
`


export default SignUp;