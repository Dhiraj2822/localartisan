import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Eye, MousePointer, ShoppingCart, Heart } from 'lucide-react';

export function AnalyticsDashboard() {
  const reachData = [
    { name: 'Mon', reach: 1200, clicks: 45, sales: 3 },
    { name: 'Tue', reach: 1800, clicks: 62, sales: 5 },
    { name: 'Wed', reach: 2200, clicks: 78, sales: 8 },
    { name: 'Thu', reach: 1900, clicks: 55, sales: 4 },
    { name: 'Fri', reach: 2800, clicks: 95, sales: 12 },
    { name: 'Sat', reach: 3200, clicks: 120, sales: 15 },
    { name: 'Sun', reach: 2600, clicks: 85, sales: 9 }
  ];

  const engagementData = [
    { name: 'Likes', value: 45, color: '#ff6b6b' },
    { name: 'Comments', value: 23, color: '#4ecdc4' },
    { name: 'Shares', value: 18, color: '#45b7d1' },
    { name: 'Saves', value: 14, color: '#96ceb4' }
  ];

  const stats = [
    { label: 'Total Reach', value: '15.8K', change: '+12%', icon: Eye, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Clicks', value: '540', change: '+8%', icon: MousePointer, color: 'from-green-500 to-emerald-500' },
    { label: 'Total Sales', value: '56', change: '+23%', icon: ShoppingCart, color: 'from-purple-500 to-violet-500' },
    { label: 'Engagement', value: '7.2%', change: '+15%', icon: Heart, color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className={`bg-gradient-to-r ${stat.color} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-white/90 text-sm flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <Icon className="w-8 h-8 text-white/80" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ad Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reachData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="reach" 
                  stroke="#8884d8" 
                  strokeWidth={3}
                  dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#82ca9d" 
                  strokeWidth={3}
                  dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales & Clicks Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={reachData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#8884d8" name="Clicks" />
              <Bar dataKey="sales" fill="#82ca9d" name="Sales" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}