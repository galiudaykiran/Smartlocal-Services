import { useState } from 'react';
import { MapPin, Navigation, Search, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const popularLocations = [
  { id: '1', name: 'Downtown', distance: '1.2 km', address: 'Main Street Area' },
  { id: '2', name: 'Uptown', distance: '2.5 km', address: 'Business District' },
  { id: '3', name: 'Midtown', distance: '1.8 km', address: 'Residential Area' },
  { id: '4', name: 'East Side', distance: '3.2 km', address: 'Shopping Center' },
  { id: '5', name: 'West End', distance: '4.1 km', address: 'University Area' },
  { id: '6', name: 'Suburbs', distance: '6.5 km', address: 'Suburban Community' }
];

export default function LocationPicker() {
  const [selectedLocation, setSelectedLocation] = useState('Downtown');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          setCurrentLocation('Current Location (GPS)');
          setSelectedLocation('Current Location (GPS)');
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const filteredLocations = popularLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">Choose Your Location</h1>
          <p className="text-muted-foreground">
            Select your location to find services in your area
          </p>
        </div>

        {/* Current Location */}
        <Card>
          <CardContent className="p-6">
            <Button
              onClick={handleUseCurrentLocation}
              className="w-full h-auto py-4 flex items-center justify-center space-x-3"
              variant="outline"
            >
              <Navigation className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-medium">Use Current Location</div>
                <div className="text-sm text-muted-foreground">
                  {currentLocation || 'Enable GPS for precise location'}
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Popular Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Locations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-fast hover:bg-muted ${
                  selectedLocation === location.name ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedLocation(location.name)}
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-muted-foreground">{location.address}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{location.distance}</span>
                  {selectedLocation === location.name && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Confirm Button */}
        <Button className="w-full h-12" size="lg">
          Confirm Location: {selectedLocation}
        </Button>
      </div>
    </div>
  );
}