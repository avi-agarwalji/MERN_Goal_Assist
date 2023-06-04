import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';
import { useGoalContext } from '../context/GoalCotext';

import AddGoal from '../components/AddGoal';
import Modal from '../components/Modal';

function Dashboard() {
  // Getting user and goal values from global context.
  const { user } = useAuthContext();
  const { goals, dispatch } = useGoalContext();

  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // making request to fetch all the goals for the currently logged in user.
    const fetchGoals = async () => {
      const response = await fetch('http://localhost:4000/api/goal/dashboard', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // parsing the response json data into js objects.
      const data = await response.json();

      // if any error occured in getting a response.
      if (!response.ok) {
        // if user is set in localStorage but that token is expired.
        if (response.status === 403)
          // clearing the user data which contains expired token value.
          localStorage.removeItem('user');
        setError(data.error);
      }

      // if request is successful.
      if (response.ok) {
        // setting the goal state of the GoalContext (removing deleted goal from context).
        dispatch({ type: 'goal/fetch', payload: data });
      }
    };

    fetchGoals();
  }, []);

  // function to handle delete goal link.
  const handleDelete = async (id) => {
    // check if id exists.
    if (!id) return;

    // making delete request to the server.
    const response = await fetch(`http://localhost:4000/api/goal/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

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

  // function to handle modal (open/close).
  const handleModal = (e) => {
    e.preventDefault();
    setModal((prevState) => !prevState);
  };

  return (
    <>
      {/* open modal if modal value is true */}
      {modal && (
        <Modal handleModal={handleModal}>
          <AddGoal handleModal={handleModal} />
        </Modal>
      )}
      <div className="dashboard">
        {error && <div className="form__error">{error}</div>}
        <div className="dashboard__button">
          <button onClick={handleModal}>Set Goal</button>
        </div>
        <div className="dashboard__goals">
          <h2 className="dashboard__goals--title">Your Goals</h2>

          {/* if there is no goal for currently logged in user */}
          {goals.length < 1 && (
            <h4 style={{ color: '#07d3d3' }}>Set your goals now !!</h4>
          )}

          {/* If goals exists for the currently logged in user */}
          {goals.length > 0 &&
            goals.map((goal) => {
              return (
                <div key={goal._id} className="dashboard__goal">
                  <Link className="dashboard__goals--heading">
                    {goal.title}
                  </Link>
                  <div className="dashboard__goals--actions">
                    <Link to="" onClick={() => handleDelete(goal._id)}>
                      Delete
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default Dashboard;
