import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from "./Login";
import SignUp from './SignUp';
import Habits from './Habits';
import Historic from './Historic';
import Today from './Today';
import GlobalStyle from '../assets/style/GlobalStyle';
import TokenContext from '../assets/context/TokenContext';




function App() {
    const [data, setData] = useState("")
    const [percent, setPercent] = useState([])
    const [confirmed, setConfirmed] = useState(0)


    return (
        <TokenContext.Provider value={{ data, setData, percent, setPercent, confirmed, setConfirmed }}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<SignUp />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="/hoje" element={<Today />} />
                    <Route path="/historico" element={<Historic />} />
                </Routes>
            </BrowserRouter>
        </TokenContext.Provider>
    )
}

export default App;