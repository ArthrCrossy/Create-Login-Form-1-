import { useState } from 'react';
import { Login } from '../app/components/Login';
import { SignUp } from '../app/components/SignUp';
import Adm from '../app/components/Adm';
import { ForgotPassword } from '../app/components/ForgotPassword';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {UserInbox} from "./components/UserInbox";
import {MessageProvider, useMessages} from "./components/UseMessage";
import UserPage from "./components/UserPage";
import ContatoSendUserToAdm from "../app/components/ContatoSendUserToAdm";
import UserNutritionalMain from "../app/components/UserNutritionalMain";

type ViewType = 'login' | 'signup' | 'forgot-password';

export default function App() {

    const [currentView, setCurrentView] = useState<ViewType>('login');

    function LoginRoute() {
        const navigate = useNavigate();
        return (
            <Login
                onSwitchToSignUp={() => navigate("/signup")}
                onForgotPassword={() => navigate("/forgot-password")}
            />
        );
    }

    return (
        <Routes>
            <Route path="/" element={<LoginRoute />} />
            <Route path="/adm" element={<Adm />} />
            <Route path="/adm/user-inbox" element={<UserInbox />} />
            <Route path="/userpage" element={<UserPage />} />
            <Route path="/userpage/contato" element={<ContatoSendUserToAdm />} />
            <Route path="/userpage/userNutritionalMain" element={<UserNutritionalMain />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    );
}
