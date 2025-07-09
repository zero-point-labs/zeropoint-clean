# Zero Point Labs Website

A modern Next.js website for Zero Point Labs, built with React, TypeScript, and Tailwind CSS.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Three.js** for 3D graphics
- **Radix UI** components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zeropoint-labs-hostinger
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. **Connect to Vercel:**
   - Push your code to GitHub
   - Import the project in Vercel
   - Vercel will automatically detect the Next.js framework

2. **Deploy:**
   - Vercel will automatically build and deploy your application
   - Your app will be available at `https://your-project.vercel.app`

### Manual Build

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable components
├── lib/                 # Utilities and configurations
└── blocks/              # UI blocks and sections
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 