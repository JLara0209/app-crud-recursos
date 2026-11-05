import { getStats } from '../services/storage.js';

// Renderiza la vista de bienvenida con hero, estadísticas y funcionalidades
export function renderHome(app) {
  if (!app) return;

  const stats = getStats();

  app.innerHTML = `
    <div class="container">
      <section class="hero">
        <h1>Tu biblioteca de recursos para aprender a programar</h1>
        <p>Centraliza, organiza y accede fácilmente a todo tu material de estudio.</p>
        <a href="#/recursos" class="btn btn-primary">Empezar</a>
      </section>

      <section class="grid-cards">
        <div class="card stat-card">
          <span class="stat-number">${stats.total}</span>
          <span class="stat-label">Recursos guardados</span>
        </div>
        <div class="card stat-card">
          <span class="stat-number">${stats.favoritos}</span>
          <span class="stat-label">Favoritos</span>
        </div>
        <div class="card stat-card">
          <span class="stat-number">${stats.temas}</span>
          <span class="stat-label">Temas</span>
        </div>
      </section>

      <section class="grid-cards">
        <div class="card feature-card">
          <h3>Guardar</h3>
          <p>Colecciona enlaces a artículos, cursos, videos o documentación técnica.</p>
        </div>
        <div class="card feature-card">
          <h3>Organizar</h3>
          <p>Clasifica tus recursos por temática, tipo de contenido y nivel de aprendizaje.</p>
        </div>
        <div class="card feature-card">
          <h3>Encontrar</h3>
          <p>Localiza con rapidez los materiales que necesitas consultar mientras programas.</p>
        </div>
      </section>
    </div>
  `;
}
