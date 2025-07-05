# Attacked.AI News Platform

![Attacked.AI Logo](public/images/attacked-ai.webp)

**Attacked.AI** is a modern, responsive news platform designed to provide real-time global threat intelligence. It features a 3D globe visualization powered by Mapbox GL JS, a live incident feed, and a section for featured news stories. The platform is built with Next.js, TypeScript, Tailwind CSS, and Mapbox GL JS, and is deployed on Vercel.

This project is hosted on GitHub: [https://github.com/viswanathr73/Attacked.AI-News.git](https://github.com/viswanathr73/Attacked.AI-News.git)

## Table of Contents
- [Attacked.AI News Platform](#attackedai-news-platform)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Design Specifications](#design-specifications)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Running the Project](#running-the-project)
  - [Deployment](#deployment)
  - [Debugging Common Issues](#debugging-common-issues)
  - [Contributing](#contributing)
  - [License](#license)

## Features
- **3D Globe Visualization**: Displays mock global incidents on an interactive Mapbox GL JS globe.
- **Real-Time Incident Feed**: Shows timestamp, title, location, type, and severity of incidents with auto-refresh functionality.
- **Featured Stories Section**: Highlights top news stories with a responsive grid layout.
- **Dynamic Incident Pages**: Detailed pages (`/incident/[id]`) with incident information, a mini-map, source/target details, and related news stories.
- **Responsive Design**: Fully responsive layout with a dark theme, optimized for mobile and desktop.
- **Reusable Components**: Modular components like `IncidentCard`, `IncidentModal`, `MiniMap`, and `NewsCard` for extensibility.
- **Mock Data**: Predefined incident and news data for development and testing.

## Tech Stack
- **Framework**: Next.js 15.3.4 with TypeScript
- **Styling**: Tailwind CSS 3.4.14 (dark theme)
- **Map Visualization**: Mapbox GL JS 3.7.0
- **Icons**: Lucide React 0.453.0
- **Deployment**: Vercel
- **Other Libraries**:
  - `react-map-gl` for Mapbox integration
  - `clsx` and `tailwind-merge` for class management
  - `class-variance-authority` for component variants

## Design Specifications
- **Brand Colors**:
  - Gold: `#FD5D00`
  - Neutral Dark: `#121212`
  - Neutral Light: `#E0E0E0`
  - Secure Teal: `#00BFA6`
  - Threat Blue: `#2C84D8`
  - Alert Amber: `#FC6000`
  - Adversary Red: `#E63946`
- **Font**: Inter (via Google Fonts)
- **Theme**: Dark theme by default
- **Layout**: Responsive grid system for all screen sizes

## Project Structure
```
attacked-ai/
├── src/
│   ├── app/
│   │   ├── globals.css           # Global styles with Tailwind CSS
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   └── incident/[id]/page.tsx # Dynamic incident detail page
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   ├── layout/               # Header, Footer, Navigation
│   │   ├── map/                  # Mapbox components (AttackMap, MiniMap)
│   │   ├── incidents/            # Incident-related components
│   │   └── news/                 # News-related components
│   ├── lib/
│   │   ├── constants.ts          # Constants (e.g., Mapbox style)
│   │   ├── mock-data.ts          # Mock incident and news data
│   │   └── utils.ts              # Utility functions
│   ├── types/                    # TypeScript type definitions
│   └── styles/
│       └── mapbox.css            # Custom Mapbox styles
├── public/
│   ├── favicon.ico               # Site favicon
│   └── images/                   # Static images
├── README.md                     # Project documentation
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## Getting Started

### Prerequisites
- **Node.js**: Version 18.x or later
- **npm**: Version 8.x or later
- **Git**: For cloning the repository
- **Mapbox Account**: To obtain an access token for Mapbox GL JS

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/viswanathr73/Attacked.AI-News.git
   cd Attacked.AI-News
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env.local` file in the root directory and add your Mapbox access token:
```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```
To get a Mapbox token:
1. Sign up at [mapbox.com](https://www.mapbox.com).
2. Create an access token in your Mapbox dashboard.
3. Add it to `.env.local`.

### Running the Project
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. To build for production:
   ```bash
   npm run build
   npm run start
   ```

## Deployment
The project is configured for deployment on Vercel:
1. Push the repository to GitHub.
2. Connect your repository to Vercel via the Vercel dashboard.
3. Set the `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` environment variable in Vercel:
   - Go to Project Settings > Environment Variables.
   - Add `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` with your Mapbox token.
4. Deploy the project. Vercel will handle the build and deployment automatically.

## Debugging Common Issues
- **Tailwind CSS Not Applied**:
  - Ensure `globals.css` is imported in `layout.tsx`.
  - Verify `tailwind.config.js` includes all source paths (`src/**/*`).
  - Clear the Next.js cache: `rm -rf .next` and restart `npm run dev`.
- **Mapbox Not Rendering**:
  - Check that `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is set correctly.
  - Ensure `@import 'mapbox-gl/dist/mapbox-gl.css'` is in `globals.css`.
- **Lucide React Icon Errors**:
  - If you encounter `Failed to read source code from .../lucide-react/...`:
    - Delete `node_modules` and `package-lock.json`: `rm -rf node_modules package-lock.json`.
    - Reinstall dependencies: `npm install`.
    - Try a different version of `lucide-react` (e.g., `npm install lucide-react@0.453.0`).
- **Build Errors**:
  - Run `npm run build -- --debug` for detailed logs.
  - Check for module resolution issues in `next.config.js`.
  - On Windows, move the project to a shorter path (e.g., `D:\attacked-ai`) to avoid path length issues.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request on GitHub.

Please ensure your code follows the project's coding standards:
- Use TypeScript for type safety.
- Follow Tailwind CSS conventions for styling.
- Add unit tests for new components (if applicable).
- Update documentation for new features.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.