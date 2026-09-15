import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('teams').then(setTeams).then(() => setStatus('ready')).catch((requestError) => {
      setError(requestError.message);
      setStatus('error');
    });
  }, []);

  return (
    <CollectionPage title="Teams" eyebrow="Together, stronger" description="Find your crew and keep momentum visible." items={teams} status={status} error={error} empty="No teams have been created yet." renderItem={(team) => (
      <article className="data-card" key={team._id || team.name}>
        <div><span className="card-kicker">Team</span><h2>{team.name || 'Unnamed team'}</h2></div>
        <strong>{team.members?.length || team.memberCount || 0} members</strong>
      </article>
    )} />
  );
}

function CollectionPage({ title, eyebrow, description, items, status, error, empty, renderItem }) {
  return <section className="collection-page" data-api-endpoint="-8000.app.github.dev/api/teams"><div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{status === 'loading' && <p className="state-message">Loading records...</p>}{status === 'error' && <p className="state-message state-error">{error}</p>}{status === 'ready' && (items.length ? <div className="data-grid">{items.map(renderItem)}</div> : <p className="state-message">{empty}</p>)}</section>;
}

export default Teams;
