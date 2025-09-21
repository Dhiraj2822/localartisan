import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import { User, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Palette } from 'lucide-react';

export function Profile() {
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah@artisan.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate abstract artist specializing in vibrant colors and emotional expressions. Creating art that speaks to the soul.',
    instagram: '@sarahjohnsonart',
    facebook: 'SarahJohnsonArt',
    twitter: '@sjart',
    notifications: {
      emailMarketing: true,
      smsAlerts: false,
      weeklyReports: true
    }
  });

  const [socialConnections, setSocialConnections] = useState({
    instagram: { connected: true, followers: '2.4K' },
    facebook: { connected: false, followers: '0' },
    twitter: { connected: true, followers: '890' }
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value }
    }));
  };

  const connectSocialMedia = (platform: string) => {
    setSocialConnections(prev => ({
      ...prev,
      [platform]: { ...prev[platform], connected: !prev[platform].connected }
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
                SJ
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.email}</p>
              <p className="text-sm text-gray-500 mt-1">{profileData.location}</p>
            </div>
            <Button variant="outline">
              <User className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Artist Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="mt-1 min-h-[100px]"
                placeholder="Tell people about your art style, inspiration, and journey..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media & Connections */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Connections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Instagram className="w-5 h-5 text-pink-500" />
                  <div>
                    <p className="font-medium">Instagram</p>
                    <p className="text-sm text-gray-600">
                      {socialConnections.instagram.connected 
                        ? `${socialConnections.instagram.followers} followers` 
                        : 'Not connected'}
                    </p>
                  </div>
                </div>
                <Button
                  variant={socialConnections.instagram.connected ? "outline" : "default"}
                  size="sm"
                  onClick={() => connectSocialMedia('instagram')}
                >
                  {socialConnections.instagram.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Facebook className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Facebook</p>
                    <p className="text-sm text-gray-600">
                      {socialConnections.facebook.connected 
                        ? `${socialConnections.facebook.followers} followers` 
                        : 'Not connected'}
                    </p>
                  </div>
                </div>
                <Button
                  variant={socialConnections.facebook.connected ? "outline" : "default"}
                  size="sm"
                  onClick={() => connectSocialMedia('facebook')}
                >
                  {socialConnections.facebook.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Twitter</p>
                    <p className="text-sm text-gray-600">
                      {socialConnections.twitter.connected 
                        ? `${socialConnections.twitter.followers} followers` 
                        : 'Not connected'}
                    </p>
                  </div>
                </div>
                <Button
                  variant={socialConnections.twitter.connected ? "outline" : "default"}
                  size="sm"
                  onClick={() => connectSocialMedia('twitter')}
                >
                  {socialConnections.twitter.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>

            {/* Social Handles */}
            <div className="space-y-3 pt-4 border-t">
              <div>
                <Label htmlFor="instagram">Instagram Handle</Label>
                <Input
                  id="instagram"
                  value={profileData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  className="mt-1"
                  placeholder="@yourusername"
                />
              </div>
              <div>
                <Label htmlFor="facebook">Facebook Page</Label>
                <Input
                  id="facebook"
                  value={profileData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  className="mt-1"
                  placeholder="YourPageName"
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter Handle</Label>
                <Input
                  id="twitter"
                  value={profileData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  className="mt-1"
                  placeholder="@yourusername"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Marketing Updates</p>
              <p className="text-sm text-gray-600">Receive tips and strategies to grow your art business</p>
            </div>
            <Switch
              checked={profileData.notifications.emailMarketing}
              onCheckedChange={(checked) => handleNotificationChange('emailMarketing', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Alerts</p>
              <p className="text-sm text-gray-600">Get instant notifications for sales and important updates</p>
            </div>
            <Switch
              checked={profileData.notifications.smsAlerts}
              onCheckedChange={(checked) => handleNotificationChange('smsAlerts', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Reports</p>
              <p className="text-sm text-gray-600">Receive weekly analytics and performance summaries</p>
            </div>
            <Switch
              checked={profileData.notifications.weeklyReports}
              onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
          <Palette className="w-4 h-4 mr-2" />
          Save Profile
        </Button>
      </div>
    </div>
  );
}