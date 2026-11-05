import { TIPOS, TEMAS, NIVELES } from '../data/options.js';
import { create } from '../services/storage.js';
import { showToast } from '../components/toast.js';

// Renderiza el formulario para registrar un recurso nuevo
export function renderForm(app, resource = null) {
  if (!app) return;

  const tipoOptions = [
    '<option value="">Selecciona...</option>',
    ...TIPOS.map((item) => `<option value="${item.value}">${item.label}</option>`)
  ].join('');

  const temaOptions = [
    '<option value="">Selecciona...</option>',
    ...TEMAS.map((item) => `<option value="${item.value}">${item.label}</option>`)
  ].join('');

  const nivelRadios = NIVELES.map(
    (item) => `
      <label class="form-radio-label">
        <input type="radio" name="nivel" value="${item.value}" ${item.value === 'basico' ? 'checked' : ''} />
        ${item.label}
      </label>
    `
  ).join('');

  app.innerHTML = `
    <div class="container form-page">
      <h1 class="page-title">Nuevo recurso</h1>
      <div class="card form-card">
        <form id="resource-form" novalidate>
          <div class="form-group">
            <label class="form-label" for="titulo">Título</label>
            <input id="titulo" name="titulo" type="text" class="input" placeholder="Nombre del recurso" />
            <span class="form-error" id="error-titulo"></span>
          </div>

          <div class="form-group">
            <label class="form-label" for="url">URL</label>
            <input id="url" name="url" type="url" class="input" placeholder="https://ejemplo.com" />
            <span class="form-error" id="error-url"></span>
          </div>

          <div class="form-group">
            <label class="form-label" for="tipo">Tipo</label>
            <select id="tipo" name="tipo" class="select">
              ${tipoOptions}
            </select>
            <span class="form-error" id="error-tipo"></span>
          </div>

          <div class="form-group">
            <label class="form-label" for="tema">Tema</label>
            <select id="tema" name="tema" class="select">
              ${temaOptions}
            </select>
            <span class="form-error" id="error-tema"></span>
          </div>

          <fieldset class="form-fieldset">
            <legend class="form-label">Nivel</legend>
            <div class="form-radios">
              ${nivelRadios}
            </div>
          </fieldset>

          <div class="form-group">
            <label class="form-checkbox-label">
              <input id="favorito" name="favorito" type="checkbox" />
              Favorito
            </label>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Guardar</button>
            <a href="#/" class="btn btn-secondary">Cancelar</a>
          </div>
        </form>
      </div>
    </div>
  `;

  const form = app.querySelector('#resource-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Limpia estados de error previos
    form.querySelectorAll('.is-error').forEach((element) => {
      element.classList.remove('is-error');
      element.removeAttribute('aria-invalid');
    });
    form.querySelectorAll('.form-error').forEach((element) => {
      element.textContent = '';
    });

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.favorito = Boolean(data.favorito);

    let hasErrors = false;

    // Validación de título (obligatorio y mínimo 3 caracteres)
    if (!data.titulo || data.titulo.trim().length < 3) {
      const field = form.querySelector('#titulo');
      const error = form.querySelector('#error-titulo');
      field.classList.add('is-error');
      field.setAttribute('aria-invalid', 'true');
      error.textContent = 'El título es obligatorio y debe tener al menos 3 caracteres.';
      hasErrors = true;
    }

    // Validación de URL válida
    let isUrlValid = false;
    if (data.url && data.url.trim()) {
      try {
        new URL(data.url.trim());
        isUrlValid = true;
      } catch {
        isUrlValid = false;
      }
    }

    if (!isUrlValid) {
      const field = form.querySelector('#url');
      const error = form.querySelector('#error-url');
      field.classList.add('is-error');
      field.setAttribute('aria-invalid', 'true');
      error.textContent = 'Ingresa una URL válida.';
      hasErrors = true;
    }

    // Validación de tipo obligatorio
    if (!data.tipo) {
      const field = form.querySelector('#tipo');
      const error = form.querySelector('#error-tipo');
      field.classList.add('is-error');
      field.setAttribute('aria-invalid', 'true');
      error.textContent = 'El tipo es obligatorio.';
      hasErrors = true;
    }

    // Validación de tema obligatorio
    if (!data.tema) {
      const field = form.querySelector('#tema');
      const error = form.querySelector('#error-tema');
      field.classList.add('is-error');
      field.setAttribute('aria-invalid', 'true');
      error.textContent = 'El tema es obligatorio.';
      hasErrors = true;
    }

    if (hasErrors) return;

    create({
      titulo: data.titulo.trim(),
      url: data.url.trim(),
      tipo: data.tipo,
      tema: data.tema,
      nivel: data.nivel || 'basico',
      favorito: data.favorito
    });

    showToast('Recurso guardado');
    form.reset();
    window.location.hash = '#/recursos';
  });
}
