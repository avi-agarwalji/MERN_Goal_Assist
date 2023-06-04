import { useState } from 'react';
import { useGoalContext } from '../context/GoalCotext';
import { useAuthContext } from '../context/AuthContext';

function AddGoal({ handleModal }) {
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const { dispatch } = useGoalContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // making a authorized post request to the server.
    const response = await fetch('http://localhost:4000/api/goal/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: goal, description }),
    });

    // Parsing the response json data into js objects.
    const data = await response.json();

    // If any error occured.
    if (!response.ok) {
      setError(data.error.message);
    }

    // If request is successful
    if (response.ok) {
      // Setting the goal state in goal context (Adding goal to the goal context).
      dispatch({ type: 'goal/add', payload: data.goal });
      // Closes the modal.
      handleModal(e);
    }
  };

  return (
    <form className="form__container form__container--goal">
      <h2 className="form__heading">Set Goal !</h2>
      {error && <div className="form__error">{error}</div>}
      <input
        type="text"
        className="form__input"
        placeholder="What's your goal !"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <input
        type="text"
        placeholder="Goal description here !"
        className="form__input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="form__button" onClick={handleSubmit}>
        Set Goal
      </button>
    </form>
  );
}

export default AddGoal;
