import { useState } from 'react'
import RegistrationForm from './components/RegistrationForm'
import SuccessScreen from './components/SuccessScreen'

export default function App() {
  const [registeredUser, setRegisteredUser] = useState(null)

  if (registeredUser) {
    return (
      <SuccessScreen
        userName={registeredUser}
        onReset={() => setRegisteredUser(null)}
      />
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg slide-up">
        {/* ── Header ──────────────────────────────────────── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 mb-4 shadow-lg shadow-primary/25">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-text-muted bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="mt-2 text-text-muted text-sm">
            Fill in the details below to register
          </p>
        </div>

        {/* ── Form Card ───────────────────────────────────── */}
        <div className="glass-card rounded-2xl p-8">
          <RegistrationForm onSuccess={setRegisteredUser} />
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          Your data is securely stored &amp; encrypted
        </p>
      </div>
    </div>
  )
}
