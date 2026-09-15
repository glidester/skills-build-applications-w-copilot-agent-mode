import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>Octofit <em>Tracker</em></span>
        </NavLink>
        <nav aria-label="Primary navigation">
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/users">Members</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
      <footer>Built for consistent effort, one session at a time.</footer>
    </div>
  );
}

function Home() {
  return (
    <section className="home-page">
      <div className="home-copy">
        <span className="eyebrow">Your movement, in view</span>
        <h1>Show up.<br /><i>Move forward.</i></h1>
        <p>Octofit turns everyday activity into a shared rhythm of progress, accountability, and a little friendly competition.</p>
        <NavLink className="primary-action" to="/activities">View activity <span aria-hidden="true">↗</span></NavLink>
      </div>
      <div className="home-stat"><span className="stat-label">This week</span><strong>Keep your<br /><i>streak alive.</i></strong><span className="stat-mark">◎</span></div>
    </section>
  );
}

export default App;
