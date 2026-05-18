import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const MfRemote = React.lazy(() => import('mf_remote/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/mf-remote">MfRemote</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="mf-host" />} />
        <Route path="/mf-remote" element={<MfRemote />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
