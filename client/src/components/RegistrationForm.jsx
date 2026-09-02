import { useState } from 'react'

const INITIAL = {
  fullName: '',
  fatherName: '',
  motherName: '',
  mobileNumber: '',
  email: '',
  address: '',
}

const FIELDS = [
  { name: 'fullName',     label: 'Full Name',       type: 'text', required: true,  placeholder: 'John Doe',          icon: 'user' },
  { name: 'fatherName',   label: "Father's Name",   type: 'text', required: true,  placeholder: "Father's full name", icon: 'user' },
  { name: 'motherName',   label: "Mother's Name",   type: 'text', required: true,  placeholder: "Mother's full name", icon: 'user' },
  { name: 'mobileNumber', label: 'Mobile Number',   type: 'tel',  required: true,  placeholder: '01XXXXXXXXX',       icon: 'phone' },
  { name: 'email',        label: 'Email (optional)', type: 'email', required: false, placeholder: 'you@example.com',   icon: 'mail' },
]

const icons = {
  user: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
    </svg>
  ),
  phone: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
    </svg>
  ),
  mail: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  ),
}

export default function RegistrationForm({ onSuccess }) {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  /* ── Validation ──────────────────────────────────────────── */
  function validate() {
    const e = {}
    if (!form.fullName.trim())     e.fullName = 'Full name is required'
    if (!form.fatherName.trim())   e.fatherName = "Father's name is required"
    if (!form.motherName.trim())   e.motherName = "Mother's name is required"
    if (!form.mobileNumber.trim()) {
      e.mobileNumber = 'Mobile number is required'
    } else if (!/^\d{10,15}$/.test(form.mobileNumber.trim())) {
      e.mobileNumber = 'Enter a valid 10–15 digit number'
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Enter a valid email address'
    }
    return e
  }

  /* ── Change handler ──────────────────────────────────────── */
  function handleChange(e) {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
    if (serverError) setServerError('')
  }

  /* ── Submit handler ──────────────────────────────────────── */
  async function handleSubmit(e) {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrors(v); return }

    setLoading(true)
    setServerError('')

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setServerError(data.errors?.join(', ') || 'Registration failed')
        return
      }

      onSuccess(data.data?.fullName || form.fullName)
    } catch {
      setServerError('Network error — please check your connection')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* ── Server error banner ──────────────────────────── */}
      {serverError && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-error-bg border border-error/30 fade-in">
          <svg className="w-5 h-5 text-error shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <p className="text-sm text-error">{serverError}</p>
        </div>
      )}

      {/* ── Text fields ──────────────────────────────────── */}
      {FIELDS.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="block text-sm font-medium text-text-muted mb-1.5">
            {f.label} {f.required && <span className="text-primary-light">*</span>}
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {icons[f.icon]}
            </span>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              value={form[f.name]}
              onChange={handleChange}
              placeholder={f.placeholder}
              className={`
                w-full pl-10 pr-4 py-3 rounded-xl
                bg-surface-input text-text placeholder:text-text-muted/50
                border transition-all duration-200 outline-none input-glow
                ${errors[f.name] ? 'border-error' : 'border-border focus:border-border-focus'}
              `}
            />
          </div>
          {errors[f.name] && (
            <p className="mt-1 text-xs text-error fade-in">{errors[f.name]}</p>
          )}
        </div>
      ))}

      {/* ── Address textarea ─────────────────────────────── */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-text-muted mb-1.5">
          Address (optional)
        </label>
        <textarea
          id="address"
          name="address"
          rows={3}
          value={form.address}
          onChange={handleChange}
          placeholder="Street, City, Zip…"
          className="w-full px-4 py-3 rounded-xl bg-surface-input text-text placeholder:text-text-muted/50 border border-border focus:border-border-focus transition-all duration-200 outline-none input-glow resize-none"
        />
      </div>

      {/* ── Submit button ────────────────────────────────── */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-purple-600 hover:from-primary-hover hover:to-purple-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 spinner" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
            </svg>
            Registering…
          </>
        ) : (
          'Register'
        )}
      </button>
    </form>
  )
}
