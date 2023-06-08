import { useEffect, useState } from 'react';

import { useAuthContext } from '../context/AuthContext';
import { useGoalContext } from '../context/GoalContext';

import AddGoal from '../components/AddGoal';
import Modal from '../components/Modal';
import Goal from '../components/Goal';

function Home() {
  // Getting user and goal values from global context.
  const { user } = useAuthContext();
  const { goals, dispatch } = useGoalContext();

  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // making request to fetch all the goals for the currently logged in user.
    const fetchGoals = async () => {
      const response = await fetch('https://goal-assist.onrender.com/api/goal/', {
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
        setError(data.error.message);
      }

      // if request is successful.
      if (response.ok) {
        // setting the goal state of the GoalContext (removing deleted goal from context).
        dispatch({ type: 'goal/fetch', payload: data });
      }
    };

    fetchGoals();
  }, []);

  // function to handle modal (open/close).
  const handleModal = (e) => {
    e.preventDefault();
    setModal((prevState) => !prevState);
  };

  return (
    <div className="home">
      {/* open modal if modal value is true */}
      {modal && (
        <Modal handleModal={handleModal}>
          <AddGoal handleModal={handleModal} />
        </Modal>
      )}
      {error && <div className="form__error">{error}</div>}
      <div className="home__btn">
        <button className="btn" onClick={handleModal}>
          Set Goal
        </button>
      </div>
      <div className="home__container">
        <h2>Your Goals</h2>

        {/* if there is no goal for currently logged in user */}
        {goals.length < 1 && (
          <h4 style={{ color: '#07d3d3' }}>Set your goals now !!</h4>
        )}

        <div className="home__goals">
          {/* If goals exists for the currently logged in user */}
          {goals.length > 0 &&
            goals.map((goal) => {
              return <Goal key={goal._id} goal={goal} setError={setError} />;
            })}
        </div>
      </div>
    </div>
  );
}
export default Home;
