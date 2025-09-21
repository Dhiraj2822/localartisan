import { useState } from 'react';
import { Sidebar } from './components/sidebar';
import { HomeDashboard } from './components/home-dashboard';
import { UploadProduct } from './components/upload-product';
import { AdGenerator } from './components/ad-generator';
import { AnalyticsDashboard } from './components/analytics-dashboard';
import { CustomerManagement } from './components/customer-management';
import { Profile } from './components/profile';
import { ChatbotWidget } from './components/chatbot-widget';

interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  hashtags: string;
  images: string[];
  createdAt: string;
  status: string;
  views: number;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false); // Close mobile menu when section changes
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeDashboard onSectionChange={handleSectionChange} products={products} />;
      case 'upload':
        return <UploadProduct onProductAdded={addProduct} />;
      case 'ads':
        return <AdGenerator products={products} />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'customers':
        return <CustomerManagement />;
      case 'profile':
        return <Profile />;
      default:
        return <HomeDashboard onSectionChange={handleSectionChange} products={products} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <main className="lg:ml-64 transition-all duration-300">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">ArtisanHub</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
        
        <div className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </div>
      </main>

      <ChatbotWidget />
    </div>
  );
}