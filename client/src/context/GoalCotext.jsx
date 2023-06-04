import { createContext, useContext, useReducer } from 'react';

// Setting inital state of the authReducer.
const initialState = {
  goals: [],
};

// Setting up the goalReducer which handles all the goal related tasks.
// Basically it will help in syncing the server data and the client data.
const goalReducer = (state, action) => {
  switch (action.type) {
    case 'goal/fetch':
      return { goals: action.payload };
    case 'goal/add':
      return { goals: [...state.goals, action.payload] };
    case 'goal/delete':
      return {
        goals: state.goals.filter((goal) => goal._id !== action.payload),
      };
    default:
      state;
  }
};

// Creating a GoalContext.
export const GoalCotnext = createContext();

// Setting up the GoalContextPRovider which provides the state value to all it's child component.
export const GoalCotnextProvider = ({ children }) => {
  // This will act as a global state and the dispatch function is used to modify that state.
  const [state, dispatch] = useReducer(goalReducer, initialState);

  return (
    <GoalCotnext.Provider value={{ ...state, dispatch }}>
      {children}
    </GoalCotnext.Provider>
  );
};

// Setting up custom useGoalContext to get access to the state values.
export const useGoalContext = () => {
  const context = useContext(GoalCotnext);
  return context;
};
