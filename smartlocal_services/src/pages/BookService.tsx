import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CreditCard, 
  ArrowLeft,
  CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

// Mock service data - in real app this would come from API
const mockService = {
  id: '1',
  name: 'Electrical Repair & Installation',
  provider: 'Mike\'s Electric Solutions',
  price: '$80/hour',
  estimatedDuration: '2-3 hours'
};

const timeSlots = [
  { id: '1', time: '9:00 AM', available: true },
  { id: '2', time: '11:00 AM', available: true },
  { id: '3', time: '2:00 PM', available: true },
  { id: '4', time: '4:00 PM', available: false },
  { id: '5', time: '6:00 PM', available: true }
];

export default function BookService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: '2',
    instructions: '',
    contactName: 'John Smith',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Main Street, Downtown',
    paymentMethod: 'card'
  });

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirmBooking = () => {
    // Simulate booking creation
    const newBooking = {
      id: Date.now().toString(),
      serviceName: mockService.name,
      provider: mockService.provider,
      date: bookingData.date,
      time: bookingData.time,
      status: 'confirmed',
      location: 'Downtown',
      price: `$${parseInt(mockService.price.replace(/\D/g, '')) * parseInt(bookingData.duration)}`,
      rating: null
    };

    // Store in localStorage for demo (in real app, this would go to backend)
    const existingBookings = JSON.parse(localStorage.getItem('smartlocal_bookings') || '[]');
    existingBookings.push(newBooking);
    localStorage.setItem('smartlocal_bookings', JSON.stringify(existingBookings));

    toast({
      title: "Booking Confirmed!",
      description: "Your service has been successfully booked. Check your bookings page for details.",
    });

    // Navigate to bookings page
    setTimeout(() => {
      navigate('/bookings');
    }, 1500);
  };

  const totalPrice = parseInt(mockService.price.replace(/\D/g, '')) * parseInt(bookingData.duration);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Book Service</h1>
            <p className="text-muted-foreground">Step {step} of 3</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Service Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{mockService.name}</h3>
                <p className="text-sm text-muted-foreground">by {mockService.provider}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">{mockService.price}</p>
                <p className="text-sm text-muted-foreground">{mockService.estimatedDuration}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Select Date & Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label>Available Time Slots</Label>
                <RadioGroup
                  value={bookingData.time}
                  onValueChange={(value) => handleInputChange('time', value)}
                >
                  {timeSlots.map((slot) => (
                    <div key={slot.id} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={slot.time} 
                        id={slot.time}
                        disabled={!slot.available}
                      />
                      <Label 
                        htmlFor={slot.time}
                        className={`flex-1 ${!slot.available ? 'text-muted-foreground line-through' : ''}`}
                      >
                        {slot.time} {!slot.available && '(Unavailable)'}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Estimated Duration (hours)</Label>
                <RadioGroup
                  value={bookingData.duration}
                  onValueChange={(value) => handleInputChange('duration', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="1hour" />
                    <Label htmlFor="1hour">1 hour - ${parseInt(mockService.price.replace(/\D/g, ''))}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="2hour" />
                    <Label htmlFor="2hour">2 hours - ${parseInt(mockService.price.replace(/\D/g, '')) * 2}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="3hour" />
                    <Label htmlFor="3hour">3 hours - ${parseInt(mockService.price.replace(/\D/g, '')) * 3}</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Contact & Location Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={bookingData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    value={bookingData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Service Address</Label>
                <Input
                  id="address"
                  value={bookingData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any specific requirements or instructions for the service provider..."
                  value={bookingData.instructions}
                  onChange={(e) => handleInputChange('instructions', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Review & Payment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Booking Summary */}
              <div className="space-y-4 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span>{mockService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Provider:</span>
                    <span>{mockService.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span>{bookingData.date} at {bookingData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{bookingData.duration} hour(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Address:</span>
                    <span>{bookingData.address}</span>
                  </div>
                  <div className="border-t pt-2 font-semibold flex justify-between">
                    <span>Total:</span>
                    <span className="text-primary">${totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={bookingData.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Pay on Service</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Booking Protection</p>
                    <p className="text-muted-foreground">
                      Your booking is protected. Cancel up to 24 hours before the service for a full refund.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
          >
            Previous
          </Button>
          
          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && (!bookingData.date || !bookingData.time)) ||
                (step === 2 && (!bookingData.contactName || !bookingData.contactPhone || !bookingData.address))
              }
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleConfirmBooking} className="bg-success hover:bg-success/90">
              Confirm Booking - ${totalPrice}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}