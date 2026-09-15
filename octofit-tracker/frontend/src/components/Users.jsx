import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('users').then(setUsers).then(() => setStatus('ready')).catch((requestError) => {
      setError(requestError.message);
      setStatus('error');
    });
  }, []);

  return <CollectionPage title="Members" eyebrow="Your community" description="A quick view of everyone showing up for themselves." items={users} status={status} error={error} empty="No members found." renderItem={(user) => <article className="data-card" key={user._id || user.email}><div><span className="card-kicker">Member</span><h2>{user.username || user.name || 'Octofit member'}</h2></div><span>{user.email || 'Profile in progress'}</span></article>} />;
}

function CollectionPage({ title, eyebrow, description, items, status, error, empty, renderItem }) {
  return <section className="collection-page"><div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{status === 'loading' && <p className="state-message">Loading records...</p>}{status === 'error' && <p className="state-message state-error">{error}</p>}{status === 'ready' && (items.length ? <div className="data-grid">{items.map(renderItem)}</div> : <p className="state-message">{empty}</p>)}</section>;
}

export default Users;
