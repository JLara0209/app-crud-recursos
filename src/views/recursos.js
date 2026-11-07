import { getAll, deleteById } from '../services/storage.js';
import { TIPOS, TEMAS, NIVELES } from '../data/options.js';
import { showToast } from '../components/toast.js';

// Obtiene la etiqueta correspondiente al valor buscando en la lista de opciones
function getLabel(lista, value) {
  const item = lista.find((option) => option.value === value);
  return item ? item.label : value;
}

// Renderiza el listado de recursos guardados con ordenamiento, estado vacío y eliminación
export function renderRecursos(app) {
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
              <div class="resource-card-actions">
                <a href="#/editar/${recurso.id}" class="btn btn-secondary">Editar</a>
                <button type="button" class="btn btn-danger btn-delete" data-id="${recurso.id}" data-action="delete">Eliminar</button>
              </div>
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

  const deleteButtons = app.querySelectorAll('button[data-action="delete"]');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      showDeleteModal(app, id);
    });
  });
}

// Muestra la ventana modal personalizada para confirmar la eliminación de un recurso
function showDeleteModal(app, id) {
  const existingModal = document.querySelector('#delete-modal');
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.id = 'delete-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'modal-title');

  modal.innerHTML = `
    <div class="card modal-card">
      <div class="modal-icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <div class="modal-body">
        <h2 id="modal-title" class="modal-title">¿Eliminar recurso?</h2>
        <p class="modal-message">¿Estás seguro de que deseas eliminar este recurso? Esta acción no se puede deshacer.</p>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" id="modal-cancel">Cancelar</button>
        <button type="button" class="btn btn-danger" id="modal-confirm">Sí, eliminar</button>
      </div>
    </div>
  `;

  const closeModal = () => {
    modal.remove();
    document.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  modal.querySelector('#modal-cancel').addEventListener('click', () => {
    closeModal();
  });

  modal.querySelector('#modal-confirm').addEventListener('click', () => {
    closeModal();
    const deleted = deleteById(id);

    if (deleted) {
      showToast('Recurso eliminado');
      renderRecursos(app);
    } else {
      showToast('Recurso no encontrado', 'error');
    }
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', handleKeyDown);
  app.appendChild(modal);
}

export const renderList = renderRecursos;
