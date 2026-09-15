import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('leaderboard').then(setEntries).then(() => setStatus('ready')).catch((requestError) => {
      setError(requestError.message);
      setStatus('error');
    });
  }, []);

  return (
    <section className="collection-page">
      <div className="page-heading">
        <span className="eyebrow">Friendly competition</span>
        <h1>Leaderboard</h1>
        <p>See who is building the strongest streak this week.</p>
      </div>
      {status === 'loading' && <p className="state-message">Loading rankings...</p>}
      {status === 'error' && <p className="state-message state-error">{error}</p>}
      {status === 'ready' && (entries.length ? (
        <div className="leaderboard-list">
          {entries.map((entry, index) => (
            <article className="leaderboard-row" key={entry._id || entry.userId || index}>
              <span className="rank">{String(index + 1).padStart(2, '0')}</span>
              <div><strong>{entry.username || entry.name || entry.userId || 'Team member'}</strong><small>{entry.team || 'Octofit community'}</small></div>
              <strong>{entry.points || entry.score || 0} pts</strong>
            </article>
          ))}
        </div>
      ) : <p className="state-message">No rankings available yet.</p>)}
    </section>
  );
}

export default Leaderboard;
