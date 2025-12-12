import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import StoreContextProvider from './pages/Context/StoreContext'

// Get Clerk publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Error component to display when environment variable is missing
const ErrorDisplay = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5'
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      maxWidth: '600px',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#FF4C24', marginBottom: '20px' }}>⚠️ Configuration Error</h1>
      <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
        The application is missing the required Clerk authentication key.
      </p>
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '4px',
        textAlign: 'left',
        marginTop: '20px'
      }}>
        <h3 style={{ marginTop: 0 }}>To fix this issue:</h3>
        <ol style={{ lineHeight: '1.8' }}>
          <li>Go to your Vercel project settings</li>
          <li>Navigate to <strong>Settings → Environment Variables</strong></li>
          <li>Add the following environment variable:
            <ul style={{ marginTop: '10px' }}>
              <li><strong>Name:</strong> <code>VITE_CLERK_PUBLISHABLE_KEY</code></li>
              <li><strong>Value:</strong> Your Clerk publishable key (starts with <code>pk_test_</code> or <code>pk_live_</code>)</li>
            </ul>
          </li>
          <li>Redeploy your application</li>
        </ol>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Check <code>VERCEL_ENV_VARS.md</code> in your project for detailed setup instructions.
        </p>
      </div>
    </div>
  </div>
)

if (!PUBLISHABLE_KEY) {
  ReactDOM.createRoot(document.getElementById('root')).render(<ErrorDisplay />)
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <StoreContextProvider>
          <App />
        </StoreContextProvider>
      </BrowserRouter>
    </ClerkProvider>,
  )
}
