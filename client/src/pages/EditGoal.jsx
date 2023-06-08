import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useGoalContext } from '../context/GoalContext';
import { useAuthContext } from '../context/AuthContext';

function EditGoal() {
  const [title, setTitle] = useState(' ');
  const [description, setDescription] = useState(' ');
  const [completed, setCompleted] = useState(false);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useGoalContext();
  const { user } = useAuthContext();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoal = async () => {
      setLoading(true);

      const response = await fetch(
        `https://api-goal-assist.onrender.com/api/goal/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Parsing the response json data into js objects.
      const data = await response.json();

      // If any error occured.
      if (!response.ok) {
        setLoading(false);
        setError(data.error.message);
      }

      // If request is successful
      if (response.ok) {
        setTitle(data.title);
        setDescription(data.description);
        setCompleted(data.completed);
        setLoading(false);
      }
    };

    fetchGoal();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // making a authorized post request to the server.
    const response = await fetch(
      `https://api-goal-assist.onrender.com/api/goal/${id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, completed }),
      }
    );

    // Parsing the response json data into js objects.
    const data = await response.json();

    // If any error occured.
    if (!response.ok) {
      setError(data.error.message);
    }

    // If request is successful
    if (response.ok) {
      // Updating the goal state in goal context (Adding goal to the goal context).
      dispatch({ type: 'goal/edit', payload: data });
      navigate('/');
    }
  };

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      {!loading && (
        <form className="form">
          <div className="form__container ">
            <h3 className="form__heading">Edit Goal !</h3>
            {error && <div className="form__error">{error}</div>}
            <input
              type="text"
              className="form__input"
              placeholder="What's your goal !"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Goal description !"
              className="form__input"
              rows={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted((prevState) => !prevState)}
            />
            <button
              type="submit"
              className="form__button"
              onClick={handleSubmit}
            >
              Edit Goal
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default EditGoal;
