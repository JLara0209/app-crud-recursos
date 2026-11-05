import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'devshelf:recursos';

// Obtiene todos los recursos guardados en localStorage
export function getAll() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : []; //Condicion operador ternario if-else
  } catch {
    return [];
  }
}

// Crea y almacena un nuevo recurso asignándole id único y fecha de creación
export function create(data) {
  const resources = getAll();
  const newResource = {
    ...data,
    id: uuidv4(),
    fechaCreacion: new Date().toISOString()
  };
  resources.push(newResource);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  return newResource;
}

// Obtiene estadísticas del total de recursos, favoritos y cantidad de temas únicos
export function getStats() {
  const resources = getAll();
  const total = resources.length;
  const favoritos = resources.filter((resource) => Boolean(resource.favorito)).length;
  const temas = new Set(resources.map((resource) => resource.tema).filter(Boolean)).size;

  return { total, favoritos, temas };
}
