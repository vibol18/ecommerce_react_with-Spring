import { useState } from "react";
import { registerUser } from "../services/RegisterService";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsRegistered(false);

    try {
      const res = await registerUser(user);
      if (res.status === 201) {
        setIsRegistered(true);
      } else {
        alert("Register Successfully please login to continue ");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "#534AB7";
    e.target.style.boxShadow = "0 0 0 3px rgba(83,74,183,0.12)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "#d1d5db";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logo}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>

        <h1 style={styles.title}>Create an account</h1>
        <p style={styles.subtitle}>Fill in the details below to get started</p>

        {/* Success banner */}
        {isRegistered && (
          <div style={styles.successBanner}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Account created successfully — welcome!
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Username */}
          <div style={styles.field}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <div style={styles.inputWrap}>
              <svg style={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="john_doe"
                autoComplete="username"
                value={user.username}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>Email address</label>
            <div style={styles.inputWrap}>
              <svg style={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={user.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.inputWrap}>
              <svg style={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                autoComplete="new-password"
                value={user.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div style={styles.field}>
            <label htmlFor="phone" style={styles.label}>Phone number</label>
            <div style={styles.inputWrap}>
              <svg style={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 5.55 5.55l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+1 (555) 000-0000"
                autoComplete="tel"
                value={user.phone}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" style={styles.submitBtn} disabled={isLoading}>
            {isLoading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Creating account…
              </>
            ) : (
              <>
                Create account
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>

        <p style={styles.loginRow}>
          Already have an account?{" "}
          <a href="/login" style={styles.loginLink}>Sign in</a>
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f5f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    padding: "2rem",
    width: "100%",
    maxWidth: 360,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  logo: {
    width: 36, height: 36,
    background: "#534AB7",
    borderRadius: 8,
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: "1.25rem",
  },
  title: {
    fontSize: 20, fontWeight: 600,
    color: "#111827", margin: "0 0 4px",
  },
  subtitle: {
    fontSize: 13, color: "#6b7280",
    margin: "0 0 1.5rem",
  },
  successBanner: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 13, color: "#15803d",
    marginBottom: "1rem",
  },
  form: { display: "flex", flexDirection: "column" },
  field: { marginBottom: "1rem" },
  label: {
    display: "block",
    fontSize: 13, fontWeight: 500,
    color: "#374151", marginBottom: 6,
  },
  inputWrap: {
    position: "relative",
    display: "flex", alignItems: "center",
  },
  inputIcon: {
    position: "absolute", left: 10,
    color: "#9ca3af", pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "0 36px 0 34px",
    height: 38,
    fontSize: 14,
    border: "1px solid #d1d5db",
    borderRadius: 8,
    background: "#fff",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s, box-shadow 0.15s",
  },
  eyeBtn: {
    position: "absolute", right: 10,
    background: "none", border: "none", padding: 0,
    cursor: "pointer", color: "#9ca3af",
    display: "flex", alignItems: "center",
    boxShadow: "none",
  },
  submitBtn: {
    height: 38,
    background: "#534AB7",
    color: "#fff", border: "none",
    borderRadius: 8,
    fontSize: 14, fontWeight: 500,
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
    marginTop: "0.25rem",
    transition: "background 0.15s",
  },
  loginRow: {
    textAlign: "center", fontSize: 13,
    color: "#6b7280", marginTop: "1.25rem", marginBottom: 0,
  },
  loginLink: {
    color: "#534AB7", textDecoration: "none",
  },
};

export default Register;