# DevShelf

Biblioteca personal para guardar y organizar recursos de aprendizaje de programación (videos, artículos, documentación, cursos y herramientas). Una aplicación web ligera enfocada en mantener tus enlaces y referencias de estudio ordenados y accesibles.

## Funcionalidades

- Página de bienvenida con estadísticas (total de recursos, favoritos y temas).
- Registro de recursos con validación de formulario.
- Listado de recursos en tarjetas con badges por tipo.
- Edición de recursos.
- Persistencia en localStorage.

## Tecnologías

- **Vite** (^8.3.5): entorno de desarrollo y empaquetador.
- **JavaScript vanilla** (módulos ES): lógica de la aplicación sin frameworks.
- **CSS con variables**: estilos personalizados basados en tokens de diseño.
- **uuid** (^14.0.3): generación de identificadores únicos para cada recurso.

## Requisitos

- Node.js
- pnpm

## Estructura del proyecto

```text
app-crud-recursos/
├── src/
│   ├── main.js              # Punto de entrada de la aplicación
│   ├── style.css            # Archivo principal de estilos (importa src/styles/)
│   ├── router.js            # Enrutador por hash
│   ├── components/          # Piezas reutilizables de la interfaz (navbar, toast)
│   ├── views/               # Vistas principales de la aplicación (una por página)
│   ├── services/
│   │   └── storage.js       # Acceso y operaciones sobre localStorage
│   └── data/
│       └── options.js       # Opciones de selección para tipo, tema y nivel
├── package.json             # Dependencias y scripts del proyecto
└── AGENTS.md                # Reglas y convenciones del proyecto
```

## Modelo de datos

Estructura del objeto recurso almacenado en `localStorage` (clave `devshelf:recursos`):

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "titulo": "MDN Web Docs - JavaScript",
  "url": "https://developer.mozilla.org/es/docs/Web/JavaScript",
  "tipo": "docs",
  "tema": "javascript",
  "nivel": "intermedio",
  "favorito": true,
  "fechaCreacion": "2026-11-06T20:00:00.000Z"
}
```

## Autor

- [Tu nombre]
- Proyecto del bootcamp [Nombre del bootcamp]
