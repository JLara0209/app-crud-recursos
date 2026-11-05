import { getAll } from '../services/storage.js';
import { TIPOS, TEMAS, NIVELES } from '../data/options.js';

// Obtiene la etiqueta correspondiente al valor buscando en la lista de opciones
function getLabel(lista, value) {
  const item = lista.find((option) => option.value === value);
  return item ? item.label : value;
}

// Renderiza el listado de recursos guardados con ordenamiento y estado vacío
export function renderList(app) {
  if (!app) return;

  const recursos = getAll();
  const sortedResources = [...recursos].sort(
    (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
  );

  const getDomain = (url) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  let contentHtml = '';

  if (sortedResources.length === 0) {
    contentHtml = `
      <div class="card empty-state">
        <p>Aún no tienes recursos</p>
        <a href="#/nuevo" class="btn btn-primary">Agregar el primero</a>
      </div>
    `;
  } else {
    const cardsHtml = sortedResources
      .map((recurso) => {
        const tipoLabel = getLabel(TIPOS, recurso.tipo);
        const temaLabel = getLabel(TEMAS, recurso.tema);
        const nivelLabel = getLabel(NIVELES, recurso.nivel);
        const domain = getDomain(recurso.url);
        const fechaFormateada = new Date(recurso.fechaCreacion).toLocaleDateString('es-SV');

        return `
          <article class="card resource-card">
            <div class="resource-card-header">
              <span class="badge badge--${recurso.tipo}">${tipoLabel}</span>
              ${recurso.favorito ? '<span class="favorite-star" title="Favorito">★</span>' : ''}
            </div>
            <h3 class="resource-title">
              <a href="${recurso.url}" target="_blank" rel="noopener">${recurso.titulo}</a>
            </h3>
            <code class="resource-domain">${domain}</code>
            <div class="resource-meta">
              <span>${temaLabel}</span>
              <span>•</span>
              <span>${nivelLabel}</span>
            </div>
            <div class="resource-card-footer">
              <span class="resource-date">${fechaFormateada}</span>
              <a href="#/editar/${recurso.id}" class="btn btn-secondary">Editar</a>
            </div>
          </article>
        `;
      })
      .join('');

    contentHtml = `<div class="resource-grid">${cardsHtml}</div>`;
  }

  app.innerHTML = `
    <div class="container list-page">
      <header class="view-header">
        <h1>Mis recursos</h1>
        <a href="#/nuevo" class="btn btn-primary">+ Nuevo recurso</a>
      </header>
      ${contentHtml}
    </div>
  `;
}
