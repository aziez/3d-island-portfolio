# 3D Island Portfolio

A creative and interactive 3D portfolio built with Next.js, React Three Fiber, and Framer Motion. Experience a floating island in the ocean with different portfolio sections represented as 3D landmarks.

## Features

- **Interactive 3D Environment**: Navigate around a floating island with portfolio sections
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern Tech Stack**: Built with Next.js 14, React Three Fiber, and TypeScript
- **Smooth Animations**: Framer Motion animations for UI components
- **Multiple Navigation**: Mouse/touch controls, keyboard (WASD) support
- **Portfolio Sections**:
  - 🏠 **About Me**: Personal information and introduction
  - 🗼 **Projects**: Interactive project showcase with links
  - 💻 **Resume**: Timeline-based experience and education
  - 🔧 **Skills**: Technology skills organized by category
  - 📮 **Contact**: Contact form and information

## Navigation Controls

### Desktop
- **Mouse**: Drag to rotate camera, scroll to zoom
- **Keyboard**: WASD keys to move around the island
- **Click**: Interact with 3D elements to open portfolio sections

### Mobile
- **Touch**: Drag to rotate camera
- **Pinch**: Zoom in/out
- **Tap**: Interact with 3D elements

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **3D Rendering**: React Three Fiber (@react-three/fiber)
- **3D Utilities**: React Three Drei (@react-three/drei)
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd 3d-island-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Add your island 3D model (optional)**:
   Place your `island.glb` file in the `public` folder. If no GLB file is provided, a fallback geometric island will be used.

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Customization

### Personal Information
Update the portfolio content in `src/components/UI.tsx`:
- Personal details in the 'about' section
- Project information in the 'projects' section
- Work experience in the 'resume' section
- Skills and technologies in the 'skills' section
- Contact information in the 'contact' section

### 3D Scene
Modify the island and interactive elements in:
- `src/components/Island.tsx`: 3D models and positioning
- `src/components/Ocean.tsx`: Water effects and animations
- `src/components/AtmosphericEffects.tsx`: Particles and environmental effects

### Island 3D Model
- **GLB Support**: Place your custom `island.glb` file in the `public` folder
- **Fallback**: If no GLB file exists, a procedural geometric island is used
- **Centered Box**: A prominent orange box sits in the center of the island
- **Interactive Elements**: Portfolio sections are represented as 3D landmarks around the island

### Styling
Customize the appearance using Tailwind CSS classes throughout the components.

## Performance Optimizations

- **Lazy Loading**: Components are dynamically imported
- **Efficient Rendering**: Optimized 3D scene with proper LOD
- **Mobile Optimizations**: Touch-friendly controls and responsive UI
- **Shader Optimizations**: Custom shaders for water and particle effects

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Requirements**: WebGL support required

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
npm run start
```

## File Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── AtmosphericEffects.tsx  # Particles and fog effects
    ├── Controls.tsx            # Camera controls with WASD
    ├── Island.tsx              # Main 3D island with landmarks
    ├── LoadingScreen.tsx       # Loading animation
    ├── Ocean.tsx               # Animated water shader
    ├── Scene.tsx               # Main 3D scene setup
    └── UI.tsx                  # Portfolio content modals
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own portfolio!

## Inspiration

Inspired by creative 3D portfolio websites like [3d-island.pages.dev](https://3d-island.pages.dev), this project combines modern web technologies with creative 3D design to create an engaging portfolio experience.
#   3 d - i s l a n d - p o r t f o l i o  
 