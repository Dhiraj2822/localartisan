import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Megaphone, Sparkles, Share2, Hash, Wand2, Image as ImageIcon, AlertCircle } from 'lucide-react';
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

interface AdGeneratorProps {
  products: Product[];
}

export function AdGenerator({ products }: AdGeneratorProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [adData, setAdData] = useState({
    hashtags: '#art #handmade #original #painting #artist',
    caption: ''
  });
  const [generatedAds, setGeneratedAds] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const generateAds = () => {
    if (!selectedProduct) return;

    setIsGenerating(true);

    // Simulate ad generation with local data
    const contextualAds = [
      {
        id: 1,
        type: 'poster',
        image: selectedProduct.images[0] || '',
        caption: `🎨 "${selectedProduct.title}" - ${selectedProduct.description.slice(0, 100)}... ✨ Perfect for art lovers! ${adData.hashtags}`,
        hashtags: adData.hashtags.split(' ').filter((tag: string) => tag.startsWith('#')),
        price: selectedProduct.price
      },
      {
        id: 2,
        type: 'story',
        image: selectedProduct.images[0] || '',
        caption: `Behind every masterpiece is a story 📖 "${selectedProduct.title}" captures ${selectedProduct.description.slice(0, 80)}... Available now for ${selectedProduct.price} ${adData.hashtags}`,
        hashtags: adData.hashtags.split(' ').filter((tag: string) => tag.startsWith('#')),
        price: selectedProduct.price
      }
    ];

    setTimeout(() => {
      setGeneratedAds(contextualAds);
      setIsGenerating(false);
    }, 1000); // Simulate a delay for ad generation
  };

  const runAd = (adId: number) => {
    console.log('Running ad:', adId);
    alert('Ad campaign started! This is a prototype.');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center">
            <Megaphone className="w-6 h-6 mr-2" />
            AI Ad Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {products.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-4">You need to upload at least one product before creating ads.</p>
              <Button variant="outline" onClick={() => window.location.hash = '#upload'}>
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Your First Product
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Label htmlFor="product-select">Select Product for Ad</Label>
                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose a product to create an ad for..." />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        <div className="flex items-center space-x-2">
                          <span>{product.title}</span>
                          <span className="text-sm text-gray-500">${product.price}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProduct && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Selected Product Preview</h4>
                  <div className="flex space-x-4">
                    <ImageWithFallback
                      src={selectedProduct.images[0] || ''}
                      alt={selectedProduct.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h5 className="font-medium text-lg">{selectedProduct.title}</h5>
                      <p className="text-sm text-gray-600">{selectedProduct.description}</p>
                      <p className="text-sm text-gray-600 font-medium mt-2">${selectedProduct.price}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <Label htmlFor="hashtags">Custom Hashtags</Label>
                <Textarea
                  id="hashtags"
                  value={adData.hashtags}
                  onChange={(e) => setAdData({ ...adData, hashtags: e.target.value })}
                  placeholder="#art #handmade #original"
                  className="mt-1"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="caption">Custom Caption</Label>
                <Textarea
                  id="caption"
                  value={adData.caption}
                  onChange={(e) => setAdData({ ...adData, caption: e.target.value })}
                  placeholder="Write a catchy caption for your ad..."
                  className="mt-1"
                />
              </div>

              <Button
                onClick={generateAds}
                disabled={isGenerating || !selectedProductId}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white disabled:opacity-50"
              >
                {isGenerating ? 'Generating Ads...' : 'Generate Ads'}
              </Button>

              {generatedAds.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Generated Ads</h4>
                  {generatedAds.map((ad) => (
                    <div key={ad.id} className="p-4 bg-white rounded-lg shadow">
                      <div className="flex items-center space-x-4">
                        <ImageWithFallback
                          src={ad.image}
                          alt={ad.caption}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-sm text-gray-600">{ad.caption}</p>
                          <div className="mt-2 space-x-2">
                            {ad.hashtags.map((tag: string) => (
                              <Badge key={tag}>{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => runAd(ad.id)}
                        className="mt-4 w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white"
                      >
                        Run Ad
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}