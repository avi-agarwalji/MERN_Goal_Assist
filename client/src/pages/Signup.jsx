import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form">
      <form className="form__container">
        <h2 className="form__heading">Signup</h2>
        <input
          type="text"
          className="form__element"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="form__element"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form__element"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="form__element--submit"
          onClick={handleSubmit}
        >
          Signup
        </button>
        <p className="form__text">
          Alreday have an account? <NavLink to="/signin">Signin here</NavLink>.
        </p>
      </form>
    </div>
  );
}
export default Signup;
