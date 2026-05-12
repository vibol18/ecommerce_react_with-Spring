import { useState } from "react";
import { loginUser } from "../services/authService";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await loginUser(user);
      if (res.data) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        alert("Login failed ❌");
      }
    } catch (error) {
      console.error("login error", error);
      alert("Something went wrong ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo mark */}
        <div style={styles.logo}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>

        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>Sign in to your account to continue</p>

        {/* Success banner */}
        {isLoggedIn && (
          <div style={styles.successBanner}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Logged in successfully — welcome!
            <a href="/" className=""></a>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email field */}
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
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, { boxShadow: "none", borderColor: "#d1d5db" })}
                required
              />
            </div>
          </div>

          {/* Password field */}
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
                autoComplete="current-password"
                value={user.password}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, { boxShadow: "none", borderColor: "#d1d5db" })}
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

          {/* Remember me + Forgot */}
          <div style={styles.rowForgot}>
            <label style={styles.checkWrap}>
              <input type="checkbox" style={{ accentColor: "#534AB7" }} />
              <span style={{ fontSize: 13, color: "#6b7280" }}>Remember me</span>
            </label>
            <a href="#" style={styles.forgotLink}>Forgot password?</a>
          </div>

          {/* Submit */}
          <button type="submit" style={styles.submitBtn} disabled={isLoading}>
            {isLoading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}><span style={styles.dividerText}>or</span></div>

        {/* Google SSO */}
        <button type="button" style={styles.googleBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        <p style={styles.signupRow}>
           
          Don't have an account?{" "}
          <a href="/register" style={styles.signupLink}>Create one</a>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
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
  inputFocus: {
    borderColor: "#534AB7",
    boxShadow: "0 0 0 3px rgba(83,74,183,0.12)",
  },
  eyeBtn: {
    position: "absolute", right: 10,
    background: "none", border: "none", padding: 0,
    cursor: "pointer", color: "#9ca3af",
    display: "flex", alignItems: "center",
    boxShadow: "none",
  },
  rowForgot: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: "1.25rem", marginTop: -4,
  },
  checkWrap: {
    display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
  },
  forgotLink: {
    fontSize: 13, color: "#534AB7", textDecoration: "none",
  },
  submitBtn: {
    height: 38,
    background: "#534AB7",
    color: "#fff", border: "none",
    borderRadius: 8,
    fontSize: 14, fontWeight: 500,
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
    transition: "background 0.15s",
  },
  divider: {
    position: "relative",
    textAlign: "center",
    margin: "1.25rem 0",
    borderTop: "1px solid #e5e7eb",
  },
  dividerText: {
    position: "relative", top: -10,
    background: "#fff",
    padding: "0 10px",
    fontSize: 12, color: "#9ca3af",
  },
  googleBtn: {
    width: "100%", height: 38,
    background: "#fff",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 13, fontWeight: 500,
    color: "#374151",
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    boxShadow: "none",
  },
  signupRow: {
    textAlign: "center", fontSize: 13,
    color: "#6b7280", marginTop: "1.25rem", marginBottom: 0,
  },
  signupLink: {
    color: "#534AB7", textDecoration: "none",
  },
};

export default Login;