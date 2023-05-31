import { useAuthContext } from '../context/AuthContext';

export function useLogout() {
  // getting dispatch method from auth context to modify global state value.
  const { dispatch } = useAuthContext();

  const logout = () => {
    // deleting user data which is set in local storage of client at the time of successful login.
    localStorage.removeItem('user');
    // dispatching logout action so that user value set to null in react context state.
    // if the user value is null, that means there is no user currently logged in.
    dispatch({ type: 'auth/logout' });
  };
  return { logout };
}
