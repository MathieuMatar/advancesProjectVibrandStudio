import './login.css'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { login, loading, error, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch {
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <span>Log In</span>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" />
        <label className="passw" htmlFor="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
        <label className="check pass" htmlFor="showpass">
          <input type="checkbox" name="showpass" value="no" />
          Show Password
        </label>
        <label className="check" htmlFor="remember">
          <input type="checkbox" name="remember" value="yes" />
          Remember me
        </label>
        <input type="submit" value={loading ? 'Logging in...' : 'Login'} disabled={loading} />
        {error && <div className="error">{error}</div>}
        <a href="">Forgot Password?</a>
        <a href="">Terms and Conditions</a>
      </form>
      <svg viewBox="0 0 160 190" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="clip">
            <path
              d="M 6,0 H 142 A 6,6 0 0 1 148,6 V 6 A 6,6 0 0 0 154,12 H 154 A 6,6 0 0 1 160,18 V 30 H 160 V 184 A 6,6 0 0 1 154,190 H 6 A 6,6 0 0 1 0,184 V 6 A 6,6 0 0 1 6,0 Z" />
          </clipPath>
        </defs>
        <image href="https://www.winnershtriangle.co.uk/wp-content/uploads/2023/06/WT-banner-1024x680.jpg" width="160" height="190" clipPath="url(#clip)" preserveAspectRatio="xMidYMid slice" />
      </svg>
      <svg onClick={() => (window.location.href = 'https://vibrandstudio.com')} className='close' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 4" role="button" aria-label="Go to vibrandstudio.com" style={{ cursor: 'pointer' }}><path d="m1 1 2 2m0-2L1 3" /></svg>
    </div>
  )
}

export { Login }