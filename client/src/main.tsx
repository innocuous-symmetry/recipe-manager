import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthProvider from './context/AuthProvider'
import SelectorProvider from './context/SelectorProvider'
import './sass/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AuthProvider>
        <SelectorProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </SelectorProvider>
    </AuthProvider>
)
