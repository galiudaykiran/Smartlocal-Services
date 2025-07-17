import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, Star, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  confirmed: 'bg-success text-success-foreground',
  completed: 'bg-secondary text-secondary-foreground',
  cancelled: 'bg-destructive text-destructive-foreground'
};

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('active');
  const [bookings, setBookings] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load bookings from localStorage (simulating real-time data)
    const loadBookings = () => {
      const storedBookings = JSON.parse(localStorage.getItem('smartlocal_bookings') || '[]');
      
      // Add some mock completed bookings if none exist
      if (storedBookings.length === 0) {
        const mockCompletedBookings = [
          {
            id: '2',
            serviceName: 'Full Home Deep Cleaning',
            provider: 'CleanPro Services',
            date: '2024-01-15',
            time: '10:00 AM',
            status: 'completed',
            location: 'Midtown',
            price: '$120',
            rating: 5
          },
          {
            id: '3',
            serviceName: 'Math & Science Tutoring',
            provider: 'Sarah Johnson',
            date: '2024-01-10',
            time: '4:00 PM',
            status: 'completed',
            location: 'Uptown',
            price: '$90',
            rating: 4
          }
        ];
        localStorage.setItem('smartlocal_bookings', JSON.stringify(mockCompletedBookings));
        setBookings(mockCompletedBookings);
      } else {
        setBookings(storedBookings);
      }
    };

    loadBookings();

    // Listen for storage changes to update bookings in real-time
    const handleStorageChange = () => {
      loadBookings();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const activeBookings = bookings.filter(booking => booking.status === 'confirmed');
  const completedBookings = bookings.filter(booking => booking.status === 'completed');

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="transition-smooth hover:shadow-medium">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{booking.serviceName}</h3>
            <p className="text-muted-foreground">by {booking.provider}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={statusColors[booking.status]}>
              {booking.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Contact Provider</DropdownMenuItem>
                {booking.status === 'confirmed' && (
                  <DropdownMenuItem className="text-destructive">
                    Cancel Booking
                  </DropdownMenuItem>
                )}
                {booking.status === 'completed' && !booking.rating && (
                  <DropdownMenuItem>Leave Review</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{booking.location}</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-primary">{booking.price}</span>
          </div>
        </div>

        {booking.rating && (
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm text-muted-foreground">Your rating:</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < booking.rating ? 'fill-warning text-warning' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          {booking.status === 'confirmed' && (
            <>
              <Button variant="outline" size="sm" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Contact Provider
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Reschedule
              </Button>
            </>
          )}
          {booking.status === 'completed' && (
            <>
              <Button variant="outline" size="sm" className="flex-1">
                Book Again
              </Button>
              {!booking.rating && (
                <Button size="sm" className="flex-1">
                  Leave Review
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">
            Manage your current and past service bookings
          </p>
        </div>

        {/* Bookings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">
              Active Bookings ({activeBookings.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 mt-6">
            {activeBookings.length > 0 ? (
              <div className="space-y-4">
                {activeBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No active bookings</h3>
                  <p className="text-muted-foreground mb-4">
                    Book a service to see your appointments here.
                  </p>
                  <Button onClick={() => navigate('/services')}>Browse Services</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedBookings.length > 0 ? (
              <div className="space-y-4">
                {completedBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No completed bookings</h3>
                  <p className="text-muted-foreground">
                    Your booking history will appear here after completing services.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}