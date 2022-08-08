import styled from "styled-components";
import { useState, useEffect } from "react";
import { createGlobalStyle } from 'styled-components';
import Header from "./Header";
import Footer from "./Footer";
import { sendHabit, receiveHabit,  deleteHabit } from "../assets/services/trackIt";
import TokenContext from "../assets/context/TokenContext";
import { useContext } from "react";
import { ThreeDots } from 'react-loader-spinner';

function Week({ children, daysSelected, setDaysSelected, day, isLoading,reseter,setReseter }) {
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        setSelected(false);
        setReseter(false);
    }, [reseter]);

    function select() {
        if (isLoading) { return };
        setSelected(true)
        if (selected === true) {
            let index = daysSelected.indexOf(day)
            daysSelected.splice(index, 1);
            setDaysSelected(daysSelected => [...daysSelected])
            setSelected(false)
            return
        } else {
            daysSelected.push(day)
            setDaysSelected(daysSelected => [...daysSelected])
            return
        }
    }

    return (
        <>
            {selected ? <ActiveButton onClick={select}><p>{children}</p></ActiveButton> : <InactiveButton onClick={select}><p>{children}</p></InactiveButton>}
        </>
    )
}

function Habits() {
    const { data } = useContext(TokenContext)
    const [daysSelected, setDaysSelected] = useState([])
    const [habitName, setHabitName] = useState("")
    const [isAddingHabit, setIsAddingHabit] = useState(false)
    const [hasHabits, setHasHabits] = useState(true)
    const [habitsList, setHabitsList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [reseter,setReseter] = useState(false)
    const config = { headers: { "Authorization": `Bearer ${data.token}` } }

    useEffect(() => {
        const requisicao = receiveHabit(config);
        requisicao.then(resposta => {
            setHabitsList(resposta.data)
            setHasHabits(true)
            if (resposta.data.length === 0) {
                setHasHabits(false)
            }
        });
    }, [isLoading]);

    function errorAlert() {
        alert("Tente novamente");
    }

    function deletingHabit(id){
        const certain = window.confirm("Tem certeza que quer excluir?")
        if(certain === true){
            const response = deleteHabit(id, config)
            response.then(response => {setIsLoading(true);setIsLoading(false);})
        }
    }

    function postedSuccess() {
        setIsLoading(false);
        setIsAddingHabit(false);
        setHabitName("");
        setDaysSelected([]);
        setReseter(true);
    }

    function sendingHabit() {
        if (habitName.length === 0 || daysSelected.length === 0) { alert("Preencha corretamente"); return };
        setIsLoading(true);
        const post = { name: habitName, days: daysSelected };
        const promise = sendHabit(post, config);
        promise.then(response => postedSuccess(response));
        promise.catch(response => errorAlert(response));
    }

    function showAddHabit() {
        setIsAddingHabit(true)
    }
    function cancelAddHabit() {
        setIsAddingHabit(false)
    }

    return (
        <>
            <GlobalStyle />
            <Header />
            <Main>
                <AddHabits>
                    <p>Meus hábitos</p>
                    <button onClick={showAddHabit}><ButtonText>+</ButtonText></button>
                </AddHabits>
                <AddingHabit style={{ display: isAddingHabit ? "flex" : "none" }}>
                    <input disabled={isLoading ? true : false} onChange={(e) => setHabitName(e.target.value)} value={habitName} placeholder="nome do hábito"></input>
                    <WeekButtons>
                        <Week reseter={reseter} setReseter={setReseter} isLoading={isLoading} day={0} daysSelected={daysSelected} setDaysSelected={setDaysSelected}>D</Week>
                        <Week reseter={reseter} setReseter={setReseter} isLoading={isLoading} day={1} daysSelected={daysSelected} setDaysSelected={setDaysSelected}>S</Week>
                        <Week reseter={reseter} setReseter={setReseter} isLoading={isLoading} day={2} daysSelected={daysSelected} setDaysSelected={setDaysSelected}>T</Week>
                        <Week reseter={reseter} setReseter={setReseter} isLoading={isLoading} day={3} daysSelected={daysSelected} setDaysSelected={setDaysSelected}>Q</Week>
                        <Week reseter={reseter} setReseter={setReseter} isLoading={isLoading} day={4} daysSelected={daysSelected} setDaysSelected={setDaysSelected}>Q</Week>
                        <Week reseter={reseter} setReseter={setReseter} isLoading={isLoading} day={5} daysSelected={daysSelected} setDaysSelected={setDaysSelected}>S</Week>
                        <Week reseter={reseter} setReseter={setReseter} isLoading={isLoading} day={6} daysSelected={daysSelected} setDaysSelected={setDaysSelected}>S</Week>
                    </WeekButtons>
                    <ButtonsContainer>
                        <CancelButton onClick={cancelAddHabit}>Cancelar</CancelButton>
                        <SaveButton onClick={sendingHabit} isLoading={isLoading}>{isLoading ?
                            <ThreeDots
                                height="35"
                                width="80"
                                radius="9"
                                color='white'
                                ariaLabel='three-dots-loading'
                                wrapperStyle
                                wrapperClass
                            /> : "Salvar"}</SaveButton>
                    </ButtonsContainer>
                </AddingHabit>

                {habitsList.map(habit =>
                    <HabitsAdded key={habit.id}>
                        <p>{habit.name}</p>
                        <ion-icon onClick={()=>deletingHabit(habit.id)} name="trash-outline"></ion-icon>
                        <AddedWeekButtons>
                            {habit.days.includes(0) ? <ActiveButton><p>D</p></ActiveButton> : habit.days.includes("0") ? <ActiveButton><p>D</p></ActiveButton> : <InactiveButton><p>D</p></InactiveButton>}
                            {habit.days.includes(1) ? <ActiveButton><p>S</p></ActiveButton> : habit.days.includes("1") ? <ActiveButton><p>S</p></ActiveButton> : <InactiveButton><p>S</p></InactiveButton>}
                            {habit.days.includes(2) ? <ActiveButton><p>T</p></ActiveButton> : habit.days.includes("2") ? <ActiveButton><p>T</p></ActiveButton> : <InactiveButton><p>T</p></InactiveButton>}
                            {habit.days.includes(3) ? <ActiveButton><p>Q</p></ActiveButton> : habit.days.includes("3") ? <ActiveButton><p>Q</p></ActiveButton> : <InactiveButton><p>Q</p></InactiveButton>}
                            {habit.days.includes(4) ? <ActiveButton><p>Q</p></ActiveButton> : habit.days.includes("4") ? <ActiveButton><p>Q</p></ActiveButton> : <InactiveButton><p>Q</p></InactiveButton>}
                            {habit.days.includes(5) ? <ActiveButton><p>S</p></ActiveButton> : habit.days.includes("5") ? <ActiveButton><p>S</p></ActiveButton> : <InactiveButton><p>S</p></InactiveButton>}
                            {habit.days.includes(6) ? <ActiveButton><p>S</p></ActiveButton> : habit.days.includes("6") ? <ActiveButton><p>S</p></ActiveButton> : <InactiveButton><p>S</p></InactiveButton>}
                        </AddedWeekButtons>
                    </HabitsAdded>
                )}

                <NoHabits style={{ display: hasHabits ? "none" : "flex" }}>
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
display: flex;
flex-direction: column;
align-items: center;
width: 100vw;
margin-bottom: 120px;
`
const AddingHabit = styled.div`
height: 180px;
width: 85%;
margin-top: 20px;
background-color: #FFFFFF;
border-radius: 5px;
display: flex;
align-items: center;
flex-direction: column;
    input{
        width: 90%;
        max-width: 1000px;
        height: 45px;
        box-sizing:border-box;
        margin-top: 18px;
        margin-bottom: 8px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        line-height: 26px;
        padding-left: 11px;
        padding-right: 11px;
        font-size:20px;
        color: #666666;
        font-family: 'Lexend Deca', sans-serif;
    }
    input::placeholder{
       color: #DBDBDB;
    }
  
`
const HabitsAdded = styled.div`
width: 85%;
margin-top: 20px;
background-color: #FFFFFF;
border-radius: 5px;
position: relative;
 ion-icon{
    position: absolute;
    font-size: 15px;
    top:11px;
    right: 11px;
 }    
 & > p{
    margin-left:15px;
    margin-top: 13px;
    margin-bottom: 8px;
    font-size: 20px;
    color: #666666;
    max-width: 90%;
 }
 & > div{
    margin-left: 15px;
 }
`
const AddedWeekButtons = styled.div`
display: flex;
width: 90%;
justify-content: flex-start;
margin-bottom: 15px;
`

const WeekButtons = styled.div`
display: flex;
width: 90%;
justify-content: flex-start;
margin-bottom: 29px;
`
const InactiveButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 30px;
width: 30px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
margin-right: 4px;
    p{
        font-size:19px;
        color: #DBDBDB;
    }
`
const ActiveButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 30px;
width: 30px;
background: #CFCFCF;
border: 1px solid #CFCFCF;
border-radius: 5px;
margin-right: 4px;
    p{
    font-size:19px;
    color: #FFFFFF;
    }
`

const ButtonsContainer = styled.div`
display: flex;
width: 90%;
justify-content: flex-end;
`
const CancelButton = styled.button`
height: 35px;
width: 84px;
border-radius: 5px;
border:none;
margin-left: 10px;
background-color: #FFFFFF;
font-size: 16px;
color: #52B6FF;
`
const SaveButton = styled.button`
height: 35px;
width: 84px;
border-radius: 5px;
border:none;
margin-left: 10px;
background-color: #52B6FF;
font-size: 16px;
color: #FFFFFF;
${props => props.isLoading ? "opacity: 0.7;" : ""} 
`

const AddHabits = styled.div`
display: flex;
align-items: center;
width: 90%;
justify-content: space-between;
margin-top: 100px;
height: 35px;
button{
    height:35px;
    width: 40px;
    font-size: 26px;
    border: none;
    color: #FFFFFF;
    background-color: #52B6FF;
    border-radius: 4px;
    position: relative;
}
p{
    font-size: 22px;
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