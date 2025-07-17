import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import { ServiceCard } from '@/components/ui/service-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    availability: 'Available this week'
  },
  {
    id: '4',
    name: 'Premium Hair Styling',
    category: 'Beauty',
    provider: 'Bella Beauty Salon',
    rating: 4.9,
    reviewCount: 156,
    price: '$65/session',
    location: 'East Side',
    distance: '3.2 km',
    availability: 'Available next week'
  },
  {
    id: '5',
    name: 'Car Diagnostic & Repair',
    category: 'Automotive',
    provider: 'AutoFix Pro',
    rating: 4.6,
    reviewCount: 98,
    price: '$95/hour',
    location: 'West End',
    distance: '4.1 km',
    availability: 'Available today'
  }
];

export default function Services() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [services, setServices] = useState(mockServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [filterCategory, setFilterCategory] = useState(searchParams.get('category') || 'all');

  useEffect(() => {
    // Filter and sort services based on current filters
    let filteredServices = mockServices;
    
    if (filterCategory !== 'all') {
      filteredServices = filteredServices.filter(service => 
        service.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }
    
    if (searchQuery) {
      filteredServices = filteredServices.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort services
    filteredServices.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
        case 'distance':
        default:
          return parseFloat(a.distance) - parseFloat(b.distance);
      }
    });
    
    setServices(filteredServices);
  }, [searchQuery, sortBy, filterCategory]);

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            Local Services
          </h1>
          <p className="text-muted-foreground">
            Find and book trusted service providers in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search services, providers, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 shadow-soft"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electrician">Electrician</SelectItem>
                <SelectItem value="tutoring">Tutoring</SelectItem>
                <SelectItem value="beauty">Beauty & Spa</SelectItem>
                <SelectItem value="cleaning">Home Cleaning</SelectItem>
                <SelectItem value="automotive">Auto Repair</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {services.length} services found
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Downtown, Main Street</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                onClick={() => handleServiceClick(service.id)}
              />
            ))}
          </div>
          
          {services.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No services found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}