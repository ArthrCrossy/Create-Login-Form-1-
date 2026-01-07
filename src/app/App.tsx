import { useState } from 'react';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { ForgotPassword } from './components/ForgotPassword';

type ViewType = 'login' | 'signup' | 'forgot-password';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('login');

  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentView === 'login' && (
        <Login
          onSwitchToSignUp={() => setCurrentView('signup')}
          onForgotPassword={() => setCurrentView('forgot-password')}
        />
      )}
      {currentView === 'signup' && (
        <SignUp onSwitchToLogin={() => setCurrentView('login')} />
      )}
      {currentView === 'forgot-password' && (
        <ForgotPassword onBackToLogin={() => setCurrentView('login')} />
      )}
    </div>
  );
}