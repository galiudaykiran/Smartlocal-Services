import { 
  Wrench, 
  GraduationCap, 
  Scissors, 
  Home, 
  Car, 
  Utensils,
  Laptop,
  Heart
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ServiceCategoriesProps {
  onCategorySelect: (category: string) => void;
}

const categories = [
  {
    id: 'electrician',
    name: 'Electrician',
    icon: Wrench,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    count: '24 services'
  },
  {
    id: 'tutoring',
    name: 'Tutoring',
    icon: GraduationCap,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    count: '18 services'
  },
  {
    id: 'beauty',
    name: 'Beauty & Spa',
    icon: Scissors,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    count: '31 services'
  },
  {
    id: 'cleaning',
    name: 'Home Cleaning',
    icon: Home,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    count: '15 services'
  },
  {
    id: 'automotive',
    name: 'Auto Repair',
    icon: Car,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    count: '12 services'
  },
  {
    id: 'catering',
    name: 'Catering',
    icon: Utensils,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    count: '22 services'
  },
  {
    id: 'tech',
    name: 'Tech Support',
    icon: Laptop,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    count: '9 services'
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    icon: Heart,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    count: '16 services'
  }
];

export function ServiceCategories({ onCategorySelect }: ServiceCategoriesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Browse Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="service-card cursor-pointer"
            onClick={() => onCategorySelect(category.id)}
          >
            <CardContent className="p-4 text-center">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3",
                category.bgColor
              )}>
                <category.icon className={cn("h-6 w-6", category.color)} />
              </div>
              <h3 className="font-medium text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}