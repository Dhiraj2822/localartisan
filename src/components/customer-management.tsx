import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Search, Plus, Mail, Phone, MapPin, Calendar, DollarSign, MessageSquare, Star } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalPurchases: number;
  lastPurchase: string;
  status: 'Active' | 'Inactive' | 'VIP';
  avatar?: string;
  notes: string;
}

interface Inquiry {
  id: string;
  customerName: string;
  email: string;
  subject: string;
  message: string;
  status: 'New' | 'Replied' | 'Resolved';
  date: string;
  priority: 'Low' | 'Medium' | 'High';
}

interface Commission {
  id: string;
  customerName: string;
  artworkTitle: string;
  price: number;
  status: 'Requested' | 'In Progress' | 'Completed' | 'Delivered';
  deadline: string;
  description: string;
}

export function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - in real app this would come from your database
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      totalPurchases: 1250,
      lastPurchase: '2024-01-15',
      status: 'VIP',
      notes: 'Loves abstract paintings, prefers blue tones'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 987-6543',
      location: 'San Francisco, CA',
      totalPurchases: 450,
      lastPurchase: '2024-01-10',
      status: 'Active',
      notes: 'Interested in landscape art, collector'
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      totalPurchases: 180,
      lastPurchase: '2023-12-20',
      status: 'Inactive',
      notes: 'First-time buyer, interested in small pieces'
    }
  ]);

  const [inquiries] = useState<Inquiry[]>([
    {
      id: '1',
      customerName: 'Alex Rodriguez',
      email: 'alex.r@email.com',
      subject: 'Custom Portrait Commission',
      message: 'Hi! I\'m interested in commissioning a custom portrait of my family. Could you please let me know your rates and timeline?',
      status: 'New',
      date: '2024-01-20',
      priority: 'High'
    },
    {
      id: '2',
      customerName: 'Lisa Park',
      email: 'lisa.park@email.com',
      subject: 'Shipping Question',
      message: 'When will my recent purchase be shipped? Order #12345',
      status: 'Replied',
      date: '2024-01-19',
      priority: 'Medium'
    }
  ]);

  const [commissions] = useState<Commission[]>([
    {
      id: '1',
      customerName: 'David Wilson',
      artworkTitle: 'Custom Wedding Portrait',
      price: 800,
      status: 'In Progress',
      deadline: '2024-02-15',
      description: 'Oil painting of couple, 16x20 inches, romantic style'
    },
    {
      id: '2',
      customerName: 'Jennifer Adams',
      artworkTitle: 'Pet Portrait - Golden Retriever',
      price: 350,
      status: 'Requested',
      deadline: '2024-02-28',
      description: 'Acrylic painting of beloved dog, 12x16 inches'
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-yellow-100 text-yellow-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Replied': return 'bg-purple-100 text-purple-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Requested': return 'bg-orange-100 text-orange-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Customer Directory</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCustomers.map((customer) => (
                  <div key={customer.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={customer.avatar} />
                          <AvatarFallback>
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium">{customer.name}</h3>
                            <Badge className={getStatusColor(customer.status)}>
                              {customer.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {customer.email}
                            </span>
                            <span className="flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {customer.phone}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {customer.location}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                            <span className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              Total: ${customer.totalPurchases}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Last: {customer.lastPurchase}
                            </span>
                          </div>
                          {customer.notes && (
                            <p className="text-sm text-gray-600 mt-2 italic">{customer.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm">
                          View Orders
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium">{inquiry.subject}</h3>
                          <Badge className={getStatusColor(inquiry.status)}>
                            {inquiry.status}
                          </Badge>
                          <Badge className={getPriorityColor(inquiry.priority)}>
                            {inquiry.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          From: {inquiry.customerName} ({inquiry.email})
                        </p>
                        <p className="text-sm text-gray-500">{inquiry.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Reply</Button>
                        <Button variant="outline" size="sm">Mark Resolved</Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {inquiry.message}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commissions.map((commission) => (
                  <div key={commission.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{commission.artworkTitle}</h3>
                          <Badge className={getStatusColor(commission.status)}>
                            {commission.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p><span className="font-medium">Customer:</span> {commission.customerName}</p>
                            <p><span className="font-medium">Price:</span> ${commission.price}</p>
                          </div>
                          <div>
                            <p><span className="font-medium">Deadline:</span> {commission.deadline}</p>
                            <p><span className="font-medium">Status:</span> {commission.status}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">{commission.description}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">Update Status</Button>
                        <Button variant="outline" size="sm">Contact</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">VIP Customers</p>
                <p className="text-2xl font-bold">{customers.filter(c => c.status === 'VIP').length}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Inquiries</p>
                <p className="text-2xl font-bold">{inquiries.filter(i => i.status === 'New').length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Commissions</p>
                <p className="text-2xl font-bold">{commissions.filter(c => c.status === 'In Progress').length}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}