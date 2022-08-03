import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import SignUp from './SignUp';
import Habits from './Habits';
import GlobalStyle from '../assets/style/GlobalStyle';



function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/cadastro" element={<SignUp/>}/>
                <Route path="/habitos" element={<Habits/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;