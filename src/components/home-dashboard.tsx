import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TrendingUp, Upload, Megaphone, BarChart3, Star, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface HomeDashboardProps {
  onSectionChange: (section: string) => void;
  products: Product[];
}

export function HomeDashboard({ onSectionChange, products }: HomeDashboardProps) {
  const recentProducts = products.length > 0 ? products.slice(0, 2) : [
    {
      id: '1',
      title: 'Sample Abstract Art',
      price: '299',
      status: 'Sample',
      views: 0,
      images: ['https://images.unsplash.com/photo-1567366865504-ffd4cc9ce7bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBhaW50JTIwYnJ1c2hlcyUyMGFydHxlbnwxfHx8fDE3NTc4MzExMzN8MA&ixlib=rb-4.1.0&q=80&w=1080'],
      description: '',
      hashtags: '',
      createdAt: ''
    }
  ];

  const quickStats = [
    { label: 'Total Products', value: products.length.toString(), icon: Upload },
    { label: 'Active Ads', value: '3', icon: Megaphone },
    { label: 'This Month Sales', value: '$1,247', icon: TrendingUp },
    { label: 'Total Views', value: products.reduce((total, product) => total + product.views, 0).toString(), icon: BarChart3 }
  ];

  const quickActions = [
    { label: 'Upload New Product', action: () => onSectionChange('upload'), icon: Upload, color: 'from-blue-500 to-cyan-500' },
    { label: 'Create New Ad', action: () => onSectionChange('ads'), icon: Megaphone, color: 'from-pink-500 to-purple-500' },
    { label: 'View Analytics', action: () => onSectionChange('analytics'), icon: BarChart3, color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Artist! 🎨</h1>
        <p className="text-white/90">Ready to showcase and promote your amazing artwork?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  onClick={action.action}
                  className={`h-auto p-4 bg-gradient-to-r ${action.color} hover:opacity-90 text-white flex flex-col items-center space-y-2`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Products
            <Button variant="outline" onClick={() => onSectionChange('upload')}>
              <Upload className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {recentProducts.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={product.images[0] || 'https://images.unsplash.com/photo-1567366865504-ffd4cc9ce7bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBhaW50JTIwYnJ1c2hlcyUyMGFydHxlbnwxfHx8fDE3NTc4MzExMzN8MA&ixlib=rb-4.1.0&q=80&w=1080'}
                  alt={product.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{product.title}</h3>
                    <Badge variant={product.status === 'Sold' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                  </div>
                  <p className="text-lg font-bold text-green-600">${product.price}</p>
                  <p className="text-sm text-gray-600">{product.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Star className="w-6 h-6 text-blue-500 mr-3" />
              <div>
                <h4 className="font-medium">Commission Requests</h4>
                <p className="text-sm text-gray-600">Manage custom art orders</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <Star className="w-6 h-6 text-green-500 mr-3" />
              <div>
                <h4 className="font-medium">Art Marketplace</h4>
                <p className="text-sm text-gray-600">Sell on integrated platforms</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}