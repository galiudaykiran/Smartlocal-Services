import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LocationHeaderProps {
  currentLocation: string;
  onLocationChange: (location: string) => void;
}

const nearbyLocations = [
  'Current Location (GPS)',
  'Downtown',
  'Uptown',
  'Midtown',
  'East Side',
  'West End',
  'Suburbs'
];

export function LocationHeader({ currentLocation, onLocationChange }: LocationHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-card rounded-xl shadow-soft mb-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Your Location</p>
          <p className="font-semibold">{currentLocation}</p>
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="transition-fast">
            Change
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {nearbyLocations.map((location) => (
            <DropdownMenuItem
              key={location}
              onClick={() => onLocationChange(location)}
              className="cursor-pointer"
            >
              <MapPin className="h-4 w-4 mr-2" />
              {location}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}