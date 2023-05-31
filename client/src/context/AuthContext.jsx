import { createContext, useContext, useReducer } from 'react';

// Setting the initial state of the AuthContext.
const initialState = {
  user: JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};

// Setting up the authReducer to manage the actions happening at client side.
// It's main purpose is to sync the user data at the client side with tha data at server.
const authReducer = (state, action) => {
  switch (action.type) {
    case 'auth/login':
      return { user: action.payload };
    case 'auth/logout':
      return { user: null };
    default:
      return state;
  }
};

// Creating AuthContext
export const AuthContext = createContext();

// Setting up Provider for AuthContext to provide user value to all the child components.
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Setting custom useContext hook to get the user value from AuthContext.
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
