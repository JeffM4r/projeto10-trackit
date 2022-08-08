import styled from "styled-components"
import { createGlobalStyle } from "styled-components"
import { useState, useEffect, useContext } from "react"
import { getHabit, checkHabit, uncheckHabit } from "../assets/services/trackIt"
import TokenContext from "../assets/context/TokenContext"
import Header from "./Header"
import Footer from "./Footer"
import dayjs from "dayjs"

function TodoHabit({isDone,currentSequence,highestSequence,id,name, config, setHabitsList}) {
    const [done,setDone] = useState(isDone)

    function finishHabit(){
        const promise = checkHabit(id, config)
        promise.then(response => {
            setDone(true)
            const requisicao = getHabit(config);
            requisicao.then(resposta => {setHabitsList(resposta.data)})
        })
    }

    function unselectHabit(){
        const promise = uncheckHabit(id, config)
        promise.then(response => {
            setDone(false)
            const requisicao = getHabit(config);
            requisicao.then(resposta => {setHabitsList(resposta.data)})
        })
    }


    return (
        <Todo>
            <div>
                <h2>{name}</h2>
                <p>Sequência atual:{done? <span style={{color:"#8FC549"}}> {currentSequence} {currentSequence === 1 ? "dia" : "dias"}</span> : <span> {currentSequence} {currentSequence === 1 ? "dia" : "dias"}</span> }  <br /> 
                Seu recorde:{currentSequence === highestSequence && done? <span style={{color:"#8FC549"}}> {highestSequence} {highestSequence === 1 ? "dia" : "dias"}</span> :<span> {highestSequence} {highestSequence === 1 ? "dia" : "dias"}</span>}
                </p>
            </div>
            {done ? <ButtonChecked onClick={unselectHabit}>✔</ButtonChecked> : <ButtonCheck onClick={finishHabit}>✔</ButtonCheck>}
        </Todo>
    )
}

function Today() {
    const { data, setConfirmed, confirmed, setPercent,percent } = useContext(TokenContext)
    const today = dayjs()
    const week = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
    const [habitsList, setHabitsList] = useState([])
    const config = { headers: { "Authorization": `Bearer ${data.token}` } }

    useEffect(() => {
        const requisicao = getHabit(config);
        requisicao.then(resposta => {
            setHabitsList(resposta.data)
        });
    }, []);

    useEffect(() => {
        let i = 0
        habitsList.forEach((a) => {if(a.done === true){
            i += 1
       }
       setConfirmed(i)
       setPercent(Math.round((confirmed / habitsList.length) * 100 ))
    })
    })


    return (
        <>
            <GlobalStyle />
            <Header />
            <Main>

                <div>
                    <Tittle>{week[today.day()]}, {today.$D < 10 ? "0" + today.$D : today.$D}/{today.$M + 1 < 10 ? "0" + (today.$M + 1) : today.$M}</Tittle>
                    {confirmed > 0 ? <SubtitleComplete>{percent}% dos hábitos concluídos</SubtitleComplete> : <SubtitleNotComplete>Nenhum hábito concluído ainda</SubtitleNotComplete>}
                </div>
                <TodoHabits>
                    {habitsList.map(habit => <TodoHabit setHabitsList={setHabitsList} config={config} key={habit.id} isDone={habit.done} highestSequence={habit.highestSequence} id={habit.id} name={habit.name} currentSequence={habit.currentSequence}/>)}
                </TodoHabits>

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
width: 100vw;
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 120px;
`
const Tittle = styled.h1`
margin-top: 98px;
width: 90vw;
font-size: 23px;
color:#126BA5;
`
const SubtitleNotComplete = styled.p`
margin-top: 5px;
margin-bottom: 28px;
width: 90vw;
font-size: 18px;
color: #BABABA;
`
const SubtitleComplete = styled.p`
margin-top: 5px;
margin-bottom: 28px;
width: 90vw;
font-size: 18px;
color: #8FC549;
`

const TodoHabits = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 90%;
`
const Todo = styled.div`
background-color: #FFFFFF;
width: 100%;
display: flex;
justify-content: space-between;
border-radius: 5px;
margin-bottom: 10px;
    h2{
        margin-top: 13px;
        margin-left: 15px;
        font-size:20px;
    }
    p{
        margin-top: 7px;
        margin-left: 15px;
        font-size: 13px;
        line-height: 16px;
    }
`
const ButtonCheck = styled.button`
height: 69px;
width: 69px;
background: #EBEBEB;
border: none;
color: #FFFFFF;
font-size: 50px;
border-radius: 5px;
margin: 13px 13px 13px 0px;
`
const ButtonChecked = styled.button`
height: 69px;
width: 69px;
background: #8FC549;
border: none;
color: #FFFFFF;
font-size: 50px;
border-radius: 5px;
margin: 13px 13px 13px 0px;
`

export default Today;