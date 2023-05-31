import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSignin } from '../hooks/useSignin';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signin, loading, error] = useSignin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(email, password);
  };

  return (
    <form className="form">
      <div className="form__container">
        <h2 className="form__heading">SignIn</h2>
        {error && <div className="form__error">{error}</div>}
        <input
          type="text"
          className="form__element"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="form__element"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="form__element--submit"
          onClick={handleSubmit}
        >
          Signin
        </button>
        <p className="form__text">
          Don't have an account? <NavLink to="/signup">Signup here</NavLink>.
        </p>
      </div>
    </form>
  );
}
export default Signin;
