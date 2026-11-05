export function renderNavbar(container) {
  if (!container) return;
  container.innerHTML = `
    <nav class="navbar">
      <a href="#/" class="logo">DevShelf</a>
      <div class="nav-links">
        <a href="#/" class="nav-link">Inicio</a>
        <a href="#/recursos" class="nav-link">Mis recursos</a>
        <a href="#/nuevo" class="nav-link">Nuevo recurso</a>
      </div>
    </nav>
  `;
}

export function setActiveLink(hash = '#/') {
  const currentHash = hash || '#/';
  const links = document.querySelectorAll('.navbar a');
  links.forEach((link) => {
    if (link.classList.contains('logo')) {
      link.classList.remove('active');
      return;
    }
    if (link.getAttribute('href') === currentHash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
