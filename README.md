# SIGA - Sistema Integrado de Gestión para Asociaciones

## Descripción
SIGA es una aplicación web desarrollada en React.js para la gestión integral de asociaciones, incluyendo módulos para miembros, eventos y finanzas.

## Características
- ✅ Gestión de miembros
- ✅ Gestión de eventos
- ✅ Gestión financiera
- ✅ Autenticación y autorización
- ✅ Interfaz responsive
- ✅ API REST integrada

## Tecnologías
- React 18.2.0
- React Router DOM 6.8.0
- Axios 1.3.0
- Context API + Hooks
- CSS3

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/siga-frontend.git
cd siga-frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Ejecutar en desarrollo:
```bash
npm start
```

## Scripts Disponibles
- `npm start` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm test` - Ejecutar tests
- `npm run deploy:prod` - Desplegar a producción

## Estructura del Proyecto
```
siga-frontend/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/          # Páginas de la aplicación
│   ├── context/        # Contextos de React
│   ├── services/       # Servicios de API
│   ├── hooks/          # Hooks personalizados
│   ├── routes/         # Configuración de rutas
│   └── styles/         # Estilos CSS
├── public/             # Archivos públicos
└── docs/              # Documentación
```

## Contribución
1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia
Distribuido bajo la Licencia MIT. Ver LICENSE para más información.

## Autores
- Freddy A. Lombana Cardenas
- Danius Fuentes Solano

Documentación Técnica en `docs/Actividad4-DesarrolloFrontend.pdf`
