import { useState } from 'react';
import { Login } from '../app/components/Login';
import { SignUp } from '../app/components/SignUp';
import Adm from '../app/components/Adm';
import { ForgotPassword } from '../app/components/ForgotPassword';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {UserInbox} from "./components/UserInbox";
import {MessageProvider, useMessages} from "./components/UseMessage";
import UserPage from "./components/UserPage";

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
        <MessageProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<LoginRoute />} />
                  <Route path="/adm" element={<Adm />} />
                  <Route path="/adm/user-inbox" element={<UserInbox />} />
                  <Route path="/UserPage" element={<UserPage />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
          </BrowserRouter>
        </MessageProvider>
  );
}