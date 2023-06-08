import { Link } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';
import { useGoalContext } from '../context/GoalContext';

function Goal({ goal, setError }) {
  const { user } = useAuthContext();
  const { dispatch } = useGoalContext();

  // function to handle delete goal link.
  const handleDelete = async (id) => {
    // check if id exists.
    if (!id) return;

    // making delete request to the server.
    const response = await fetch(
      `https://api-goal-assist.onrender.com/api/goal/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    // parsing the response json data into js objects.
    const data = await response.json();

    // if there is error in request.
    if (!response.ok) {
      setError(data.error);
    }

    // if request is successful.
    if (response.ok) {
      // handle the goal state of the GoalContext.
      dispatch({ type: 'goal/delete', payload: data._id });
    }
  };

  return (
    <div className="goal">
      {/* Goal info */}
      <div className="goal__info">
        <h3>{goal.title}</h3>
        <p className="goal__info--description">{goal.description}</p>
        <p className="goal__info--status">
          <span>Completed - </span>
          {goal.completed?.toString()}
        </p>
      </div>
      {/* Actions */}
      <div className="goal__actions">
        <Link
          className="btn"
          to={`https://goal-assist.onrender.com/goal/${goal._id}`}
        >
          Edit
        </Link>
        <Link className="btn" to="" onClick={() => handleDelete(goal._id)}>
          Delete
        </Link>
      </div>
    </div>
  );
}
export default Goal;
