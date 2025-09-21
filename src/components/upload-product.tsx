import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Upload, X, DollarSign, Hash, CheckCircle } from 'lucide-react';
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

interface UploadProductProps {
  onProductAdded: (product: Product) => void;
}

export function UploadProduct({ onProductAdded }: UploadProductProps) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    hashtags: ''
  });
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSampleImage = () => {
    const sampleImages = [
      'https://images.unsplash.com/photo-1567366865504-ffd4cc9ce7bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBhaW50JTIwYnJ1c2hlcyUyMGFydHxlbnwxfHx8fDE3NTc4MzExMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1646846565807-61fd42034c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwYXJ0d29yayUyMGRpc3BsYXl8ZW58MXx8fHwxNzU3ODMxMTM1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ];
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    if (!images.includes(randomImage)) {
      setImages(prev => [...prev, randomImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title,
      price: formData.price,
      description: formData.description,
      hashtags: formData.hashtags,
      images,
      createdAt: new Date().toISOString(),
      status: 'active',
      views: 0
    };

    onProductAdded(newProduct);
    setSubmitSuccess(true);

    // Reset form after successful submission
    setTimeout(() => {
      setFormData({ title: '', price: '', description: '', hashtags: '' });
      setImages([]);
      setSubmitSuccess(false);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center">
          <Upload className="w-6 h-6 mr-2" />
          Upload Product
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Beautiful Abstract Painting"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="299.99"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="hashtags">Hashtags</Label>
                <div className="relative mt-1">
                  <Hash className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <Textarea
                    id="hashtags"
                    value={formData.hashtags}
                    onChange={(e) => handleInputChange('hashtags', e.target.value)}
                    placeholder="#art #painting #abstract #handmade #original"
                    className="pl-10 min-h-[80px]"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>Product Images</Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <ImageWithFallback
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSampleImage}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Add Sample Image
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your artwork, its inspiration, materials used, and what makes it special..."
              className="mt-1 min-h-[120px]"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || !formData.title || !formData.price || images.length === 0}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : submitSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Product Uploaded!
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Product
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}