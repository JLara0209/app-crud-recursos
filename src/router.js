import { renderHome } from './views/home.js';
import { renderForm } from './views/form.js';
import { renderRecursos } from './views/recursos.js';
import { setActiveLink } from './components/navbar.js';
import { getById } from './services/storage.js';
import { showToast } from './components/toast.js';

export const routes = {
  '#/': renderHome,
  '#/recursos': renderRecursos,
  '#/nuevo': renderForm,
};

export function initRouter(app) {
  function handleRoute() {
    const hash = window.location.hash;
    const editMatch = hash.match(/^#\/editar\/(.+)$/);

    if (editMatch) {
      const id = editMatch[1];
      const recurso = getById(id);

      if (recurso) {
        if (app) {
          renderForm(app, recurso);
        }
        setActiveLink('#/recursos');
      } else {
        showToast('Recurso no encontrado', 'error');
        window.location.hash = '#/recursos';
      }
      return;
    }

    const isKnown = Boolean(routes[hash]);
    const renderView = isKnown ? routes[hash] : routes['#/'];

    if (app) {
      renderView(app);
    }
    setActiveLink(isKnown ? hash : '#/');
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);

  handleRoute();
}
