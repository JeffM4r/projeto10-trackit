import styled from "styled-components";

function Header(){
    return(
        <Head>
            <p>TrackIt</p>
            <img src="https://gartic.com.br/imgs/mural/ar/arc4n1n3_m1l_gr4u/pyke-p-monk-d-iago.png"alt="perfil"/>
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