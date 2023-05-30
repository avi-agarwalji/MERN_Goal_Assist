import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form className="form">
      <div className="form__container">
        <h2 className="form__heading">SignIn</h2>
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
