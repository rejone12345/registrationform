export default function SuccessScreen({ userName, onReset }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card pulse-glow rounded-2xl p-10 max-w-md w-full text-center slide-up">
        {/* ── Checkmark icon ────────────────────────────── */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-bg mb-6">
          <svg className="w-10 h-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-text mb-2">
          Registration Successful!
        </h2>
        <p className="text-text-muted mb-8">
          Welcome aboard, <span className="text-primary-light font-medium">{userName}</span>!
          <br />
          Your account has been created successfully.
        </p>

        <button
          onClick={onReset}
          className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-purple-600 hover:from-primary-hover hover:to-purple-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/25 cursor-pointer"
        >
          Register Another
        </button>
      </div>
    </div>
  )
}
