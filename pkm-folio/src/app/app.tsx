import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from './layout/app-layout';
import { CapturePage } from './pages/capture-page';
import { HomePage } from './pages/home-page';
import { LibraryPage } from './pages/library-page';

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="capture" element={<CapturePage />} />
        <Route path="library" element={<LibraryPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
