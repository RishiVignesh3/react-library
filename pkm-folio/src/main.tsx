import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

import '@org/ui';
import './styles.css';

import { CaptureProvider } from './features/capture/CaptureProvider';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <CaptureProvider>
        <App />
      </CaptureProvider>
    </BrowserRouter>
  </StrictMode>,
);
