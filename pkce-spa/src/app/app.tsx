import { Navigate, Route, Routes } from 'react-router-dom';

import { HomePage } from './HomePage';
import { SigninCallbackPage } from './SigninCallbackPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin-callback" element={<SigninCallbackPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
