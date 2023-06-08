import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

export function useSignup() {
  const [loading, setLoading] = useState(null); // denotes the request to server is still going on.
  const [error, setError] = useState(null); // denotes an error occured while making a request to server.
  const { dispatch } = useAuthContext(); // used to update the global context value (user).

  const signup = async (name, email, password) => {
    setLoading(true);

    // making request to server.
    const response = await fetch(
      'https://goal-assist.onrender.com/api/auth/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      }
    );

    // Parses the response body as JSON and returns a Promise that resolves to the parsed JSON data.
    // Parsing the response json data into js objects.
    const data = await response.json();

    // If there is any error like validation or authentication setup in.
    if (!response.ok) {
      setLoading(false);
      // setting error state with the error message received in response body.
      setError(data.error.message);
    }

    // If the request is successful.
    if (response.ok) {
      // getting required data from the response.
      const payload = { token: data.token, name: data.user.name };

      // saving user information in the client local storage.
      localStorage.setItem('user', JSON.stringify(payload));

      // updating the global state with the user value.
      dispatch({ type: 'auth/login', payload });
      setLoading(false);
    }
  };

  return [signup, loading, error];
}
