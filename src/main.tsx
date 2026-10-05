import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
const container = document.getElementById('root')!;

const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Les pages pré-générées contiennent déjà le HTML : on l'« hydrate ».
// En développement (page vide), on effectue un rendu classique.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
