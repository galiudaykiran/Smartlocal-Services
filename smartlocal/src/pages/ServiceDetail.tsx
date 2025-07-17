import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Calendar,
  ArrowLeft,
  Heart,
  Share
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock service data
const mockService = {
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
  phone: '+1 (555) 123-4567',
  email: 'mike@electricsolutions.com',
  description: 'Professional electrical services with over 15 years of experience. We specialize in residential and commercial electrical repairs, installations, and maintenance. Our certified electricians ensure safe and reliable electrical work.',
  services: [
    'Electrical repairs and troubleshooting',
    'New outlet and switch installation',
    'Circuit breaker replacement',
    'Ceiling fan installation',
    'Electrical panel upgrades',
    'Emergency electrical services'
  ],
  images: [],
  reviews: [
    {
      id: 1,
      author: 'John Smith',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent service! Mike was punctual, professional, and fixed our electrical issue quickly. Highly recommended!'
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      rating: 4,
      date: '2024-01-10',
      comment: 'Good work on installing new outlets. Fair pricing and clean work area after completion.'
    }
  ]
};

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBookNow = () => {
    navigate(`/book/${id}`);
  };

  const handleContact = (method: 'phone' | 'email') => {
    if (method === 'phone') {
      window.open(`tel:${mockService.phone}`);
    } else {
      window.open(`mailto:${mockService.email}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Service Details</h1>
        </div>

        {/* Service Hero Section */}
        <Card className="overflow-hidden">
          <div className="h-64 gradient-hero flex items-center justify-center">
            <div className="text-center text-white">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                {mockService.category}
              </Badge>
              <h2 className="text-3xl font-bold mb-2">{mockService.name}</h2>
              <p className="text-xl opacity-90">by {mockService.provider}</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rating and Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 fill-warning text-warning" />
                      <span className="text-xl font-bold">{mockService.rating}</span>
                      <span className="text-muted-foreground">({mockService.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{mockService.distance} away</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{mockService.availability}</span>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {mockService.price}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {mockService.description}
                </p>
              </CardContent>
            </Card>

            {/* Services Offered */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockService.services.map((service, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockService.reviews.map((review) => (
                  <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{review.author}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'fill-warning text-warning' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle>Book This Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {mockService.price}
                  </div>
                  <Badge variant="secondary">{mockService.availability}</Badge>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleBookNow}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContact('phone')}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContact('email')}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Provider Info */}
            <Card>
              <CardHeader>
                <CardTitle>Service Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{mockService.provider}</h3>
                    <p className="text-sm text-muted-foreground">{mockService.location}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span>Verified Provider</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>15+ years experience</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}