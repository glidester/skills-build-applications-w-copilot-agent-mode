import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('activities')
      .then(setActivities)
      .then(() => setStatus('ready'))
      .catch((requestError) => {
        setError(requestError.message);
        setStatus('error');
      });
  }, []);

  return (
    <CollectionView
      eyebrow="Movement log"
      title="Activities"
      description="Recent training sessions captured by your team."
      items={activities}
      status={status}
      error={error}
      empty="No activities have been logged yet."
      renderItem={(activity) => (
        <article className="data-card" key={activity._id || `${activity.type}-${activity.durationMinutes}`}>
          <div>
            <span className="card-kicker">{activity.type || 'Workout'}</span>
            <h2>{activity.durationMinutes || 0} min</h2>
          </div>
          <strong>{activity.points || 0} pts</strong>
        </article>
      )}
    />
  );
}

function CollectionView({ eyebrow, title, description, items, status, error, empty, renderItem }) {
  return (
    <section className="collection-page">
      <div className="page-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {status === 'loading' && <p className="state-message">Loading records...</p>}
      {status === 'error' && <p className="state-message state-error">{error}</p>}
      {status === 'ready' && (items.length ? <div className="data-grid">{items.map(renderItem)}</div> : <p className="state-message">{empty}</p>)}
    </section>
  );
}

export default Activities;
