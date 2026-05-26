# MeteoCan

Aplicación web de pronóstico meteorológico para las **Islas Canarias** construida con [Lovable](https://lovable.dev).

## Características

- **Pronóstico de 7 días** para todas las islas y municipios de Canarias.
- **Búsqueda y filtrado** por isla y municipio.
- **Datos de mar y oleaje** para zonas costeras (temperatura del agua, altura de ola, periodo y dirección).
- **Gráfico de mareas** con pleamar y bajamar para las próximas 72 h.
- **Webcams en directo** en localizaciones seleccionadas (vía SkylineWebcams).
- Diseño moderno y responsive con Tailwind CSS y animaciones suaves.

## Fuentes de datos

| Servicio | Proveedor |
|----------|-----------|
| Pronóstico meteorológico | [meteoblue](https://www.meteoblue.com) |
| Mar y oleaje | [Open-Meteo Marine](https://open-meteo.com) |
| Mareas (armónica) | Estimación interna ajustada por longitud |
| Webcams | [SkylineWebcams](https://www.skylinewebcams.com) |

## Tecnologías

- **Framework**: [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7)
- **Estilo**: Tailwind CSS v4 + shadcn/ui
- **Datos**: TanStack Query + funciones servidor (`createServerFn`)
- **Gráficos**: Recharts
- **Iconos**: Lucide React

## Requisitos previos

- [Node.js](https://nodejs.org/) o [Bun](https://bun.sh/)
- macOS, Linux o Windows con WSL

> **Nota para macOS**: si `brew` da el error *"Your Command Line Tools are too outdated"*, ejecuta:
> ```bash
> sudo rm -rf /Library/Developer/CommandLineTools
> sudo xcode-select --install
> ```
> Espera a que termine la instalación y vuelve a intentar instalar Homebrew.

## Instalación

```bash
# 1. Clona o descarga el proyecto
cd MeteoCan

# 2. Instala dependencias
bun install
# o, si no tienes bun:
npm install

# 3. Arranca el servidor de desarrollo
bun dev
# o:
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `bun dev` | Servidor de desarrollo con hot reload |
| `bun run build` | Build de producción |
| `bun run preview` | Previsualizar build de producción |
| `bun run lint` | Revisar estilo con ESLint |
| `bun run format` | Formatear código con Prettier |

## Estructura del proyecto

```
src/
├── components/      # Componentes reutilizables (TideChart, ui/shadcn)
├── lib/             # Lógica: ubicaciones, mareas, peticiones al tiempo
├── routes/          # Rutas de TanStack (file-based routing)
│   ├── __root.tsx   # Layout raíz
│   └── index.tsx    # Página principal
├── styles.css       # Tokens de diseño y Tailwind
└── router.tsx       # Configuración del router
```

## Despliegue

Este proyecto está optimizado para desplegarse en la plataforma **Lovable Cloud**. También puedes compilarlo estáticamente o desplegarlo en cualquier servicio compatible con Vite (Vercel, Netlify, Cloudflare Pages, etc.).

## Licencia

MIT – Uso libre para fines personales y educativos.
