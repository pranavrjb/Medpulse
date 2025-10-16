import React from 'react'
import { createRoot } from 'react-dom/client';
import {StrictMode} from 'react';
import './index.css';
import App from './App.jsx';
import { BrowserRouter} from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
// import { AuthProvider } from './context/authContext/index.jsx';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
        <UserProvider>
        {/* <AuthProvider> */}
                <App />
                {/* </AuthProvider> */}
        </UserProvider>
        </BrowserRouter>
    </StrictMode>
)
