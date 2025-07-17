import { useState } from 'react';
import { Bell, Calendar, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockNotifications = {
  all: [
    {
      id: '1',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your electrical repair service with Mike\'s Electric Solutions is confirmed for Jan 20, 2:00 PM',
      time: '2 hours ago',
      read: false,
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Service Reminder',
      message: 'Your home cleaning service is scheduled for tomorrow at 10:00 AM',
      time: '1 day ago',
      read: true,
      icon: Calendar,
      color: 'text-primary'
    },
    {
      id: '3',
      type: 'system',
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated',
      time: '3 days ago',
      read: true,
      icon: Info,
      color: 'text-muted-foreground'
    }
  ]
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications.all);
  const [activeTab, setActiveTab] = useState('all');

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const NotificationCard = ({ notification }: { notification: any }) => (
    <Card className={`transition-smooth hover:shadow-soft ${!notification.read ? 'bg-primary/5' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg bg-muted ${notification.color}`}>
            <notification.icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className={`font-medium truncate ${!notification.read ? 'font-semibold' : ''}`}>
                {notification.title}
              </h3>
              <div className="flex items-center space-x-2 ml-2">
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-2 leading-relaxed">
              {notification.message}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{notification.time}</span>
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center space-x-2">
              <Bell className="h-8 w-8" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground">
              Stay updated with your bookings and account activity
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    You're all caught up! New notifications will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4 mt-6">
            {unreadCount > 0 ? (
              <div className="space-y-3">
                {notifications.filter(n => !n.read).map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">
                    You have no unread notifications.
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