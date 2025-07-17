import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Bell, Heart, Clock } from 'lucide-react';
import { LocationHeader } from '@/components/dashboard/LocationHeader';
import { ServiceCategories } from '@/components/dashboard/ServiceCategories';
import { ServiceCard } from '@/components/ui/service-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const mockServices = [
  {
    id: '1',
    name: 'Electrical Repair & Installation',
    category: 'Electrician',
    provider: 'Mike\'s Electric Solutions',
    rating: 4.8,
    reviewCount: 127,
    price: '$80/hour',
    location: 'Downtown',
    distance: '1.2 km',
    availability: 'Available today',
    featured: true
  },
  {
    id: '2',
    name: 'Math & Science Tutoring',
    category: 'Tutoring',
    provider: 'Sarah Johnson',
    rating: 4.9,
    reviewCount: 89,
    price: '$45/hour',
    location: 'Uptown',
    distance: '2.1 km',
    availability: 'Next available: Tomorrow'
  },
  {
    id: '3',
    name: 'Full Home Deep Cleaning',
    category: 'Cleaning',
    provider: 'CleanPro Services',
    rating: 4.7,
    reviewCount: 203,
    price: '$120/visit',
    location: 'Midtown',
    distance: '0.8 km',
    availability: 'Available this week',
    featured: true
  }
];

export default function Dashboard() {
  const [currentLocation, setCurrentLocation] = useState('Downtown, Main Street');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem('smartlocal_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load recent bookings
    const bookings = JSON.parse(localStorage.getItem('smartlocal_bookings') || '[]');
    const recent = bookings.slice(-2); // Get last 2 bookings
    const upcoming = bookings.filter((b: any) => b.status === 'confirmed');
    
    setRecentBookings(recent);
    setUpcomingBookings(upcoming);
  }, []);

  const handleCategorySelect = (category: string) => {
    navigate(`/services?category=${category}`);
  };

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  const handleLocationChange = (location: string) => {
    setCurrentLocation(location);
    // In a real app, this would trigger a location update and refresh services
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold">
            {user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Welcome to'} {!user && <span className="gradient-primary bg-clip-text text-transparent">SmartLocal</span>}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {user 
              ? 'Ready to book your next service? Discover trusted local providers in your area.'
              : 'Discover and book trusted local services in your area. From home repairs to personal care, find the perfect service provider for your needs.'
            }
          </p>
        </div>

        {/* User Status Cards */}
        {user && (upcomingBookings.length > 0 || recentBookings.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Upcoming Booking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingBookings.slice(0, 1).map((booking) => (
                    <div key={booking.id} className="space-y-2">
                      <h4 className="font-medium">{booking.serviceName}</h4>
                      <p className="text-sm text-muted-foreground">by {booking.provider}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => navigate('/bookings')}
                        className="mt-2"
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            {recentBookings.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentBookings.slice(0, 2).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{booking.serviceName}</p>
                          <p className="text-xs text-muted-foreground">{booking.date}</p>
                        </div>
                        <Badge variant={booking.status === 'completed' ? 'secondary' : 'default'}>
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigate('/bookings')}
                      className="w-full"
                    >
                      View All Bookings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Location Header */}
        <LocationHeader 
          currentLocation={currentLocation}
          onLocationChange={handleLocationChange}
        />

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for services, providers, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 h-12 text-base shadow-soft"
            />
            <Button 
              size="icon" 
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Service Categories */}
        <ServiceCategories onCategorySelect={handleCategorySelect} />

        {/* Featured Services */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured Services</h2>
            <Button variant="outline" onClick={() => navigate('/services')}>
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                onClick={() => handleServiceClick(service.id)}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-card rounded-xl p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col space-y-2">
              <span>Emergency</span>
              <span className="text-xs text-muted-foreground">24/7 Services</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col space-y-2">
              <span>Book Again</span>
              <span className="text-xs text-muted-foreground">Previous Services</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col space-y-2">
              <span>Favorites</span>
              <span className="text-xs text-muted-foreground">Saved Providers</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col space-y-2">
              <span>Support</span>
              <span className="text-xs text-muted-foreground">Get Help</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}