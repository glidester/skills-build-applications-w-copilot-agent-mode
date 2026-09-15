import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).then(() => setStatus('ready')).catch((requestError) => {
      setError(requestError.message);
      setStatus('error');
    });
  }, []);

  return <section className="collection-page"><div className="page-heading"><span className="eyebrow">Suggested for you</span><h1>Workouts</h1><p>Small, intentional sessions to keep your progress moving.</p></div>{status === 'loading' && <p className="state-message">Loading workouts...</p>}{status === 'error' && <p className="state-message state-error">{error}</p>}{status === 'ready' && (workouts.length ? <div className="data-grid">{workouts.map((workout) => <article className="data-card" key={workout._id || workout.name}><div><span className="card-kicker">{workout.level || 'Training plan'}</span><h2>{workout.name || workout.title || 'Custom workout'}</h2></div><span>{workout.durationMinutes ? `${workout.durationMinutes} min` : workout.description || 'Ready when you are'}</span></article>)}</div> : <p className="state-message">No workouts available yet.</p>)}</section>;
}

export default Workouts;
