import { Star, MapPin, Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  id: string;
  name: string;
  category: string;
  provider: string;
  rating: number;
  reviewCount: number;
  price: string;
  location: string;
  distance: string;
  availability: string;
  image?: string;
  featured?: boolean;
  onClick?: () => void;
}

export function ServiceCard({
  name,
  category,
  provider,
  rating,
  reviewCount,
  price,
  location,
  distance,
  availability,
  image,
  featured = false,
  onClick
}: ServiceCardProps) {
  return (
    <Card 
      className={cn(
        "service-card cursor-pointer overflow-hidden",
        featured && "ring-2 ring-primary shadow-medium"
      )}
      onClick={onClick}
    >
      <div className="relative">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 gradient-card flex items-center justify-center">
            <User className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
        {featured && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-2 right-2">
          {category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{name}</h3>
            <p className="text-muted-foreground text-sm">by {provider}</p>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{distance}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{availability}</span>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-lg font-bold text-primary">{price}</span>
              <p className="text-xs text-muted-foreground">{location}</p>
            </div>
            <Button size="sm" className="transition-fast">
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}