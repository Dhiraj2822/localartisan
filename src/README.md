# ArtisanHub Dashboard

A comprehensive digital platform that empowers artisans and crafters to efficiently manage, promote, and scale their creative businesses.

## Features

- **Product Management**: Upload and manage artwork with detailed descriptions and pricing
- **AI-Powered Ad Generation**: Automatically create professional social media advertisements
- **Analytics Dashboard**: Track business performance with detailed metrics
- **Customer Management**: Handle inquiries, commissions, and customer relationships
- **AI Business Advisor**: Get personalized business advice and growth strategies
- **Mobile Responsive**: Optimized for both desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Supabase (optional)
- **Build Tool**: Vite

## Local Development Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Clone or download the project files**
   ```bash
   # If using git
   git clone <your-repo-url>
   cd artisanhub-dashboard
   
   # Or extract the project files to a folder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or  
   yarn dev
   ```

4. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, manually navigate to the URL

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Mobile Responsiveness

The app is fully responsive and includes:

- **Mobile Navigation**: Hamburger menu for small screens
- **Responsive Layouts**: All components adapt to different screen sizes
- **Touch-Friendly**: Optimized for mobile interactions
- **Mobile-First Design**: Built with mobile users in mind

## Project Structure

```
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── figma/           # Figma-specific components
│   └── *.tsx           # Main application components
├── styles/             # CSS styles
├── utils/              # Utility functions
├── supabase/           # Backend configuration (optional)
└── guidelines/         # Project documentation
```

## Key Components

- **Sidebar**: Responsive navigation with mobile menu
- **Home Dashboard**: Overview with stats and quick actions
- **Upload Product**: Product management interface
- **Ad Generator**: AI-powered marketing content creation
- **Analytics Dashboard**: Business metrics and charts
- **Customer Management**: CRM functionality
- **Chatbot Widget**: AI business advisor

## Deployment

To deploy the application:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting platform:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service

## Customization

- **Colors**: Modify the gradient colors in Tailwind classes
- **Branding**: Update the logo and company name in the sidebar
- **Features**: Add or remove sections by updating the menu items
- **Styling**: Customize the design system in `styles/globals.css`

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `vite.config.ts`
2. **Dependencies not installing**: Clear cache with `npm cache clean --force`
3. **Build errors**: Ensure all TypeScript types are correctly defined

### Getting Help

- Check the browser console for error messages
- Ensure all required dependencies are installed
- Verify Node.js version is 18 or higher

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both desktop and mobile
5. Submit a pull request

## License

This project is open source and available under the MIT License.