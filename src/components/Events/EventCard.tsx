
import { Event } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, QrCode, Trophy } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { mockClubs } from "@/utils/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface EventCardProps {
  event: Event;
  isRegistered?: boolean;
}

const EventCard = ({ event, isRegistered = false }: EventCardProps) => {
  const [registered, setRegistered] = useState(isRegistered);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const eventDate = new Date(event.date);
  const club = mockClubs.find(c => c.id === event.clubId);

  const handleRegister = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setRegistered(!registered);
      setIsLoading(false);
      
      toast({
        title: registered ? "Registration cancelled" : "Successfully registered",
        description: registered 
          ? `You have cancelled your registration for ${event.title}.`
          : `You are now registered for ${event.title}.`,
        duration: 3000
      });
    }, 500);
  };
  
  const isPastEvent = eventDate < new Date();

  return (
    <Card className={`overflow-hidden card-hover ${isPastEvent ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge 
              variant="outline" 
              className={`mb-2 ${isPastEvent ? 'bg-gray-100 text-gray-600' : 'bg-campus-secondary/10 text-campus-secondary'}`}
            >
              {club?.name || "Club Event"}
            </Badge>
            <CardTitle>{event.title}</CardTitle>
          </div>
          <Badge variant={isPastEvent ? "outline" : "default"} className={isPastEvent ? "bg-gray-100" : "bg-campus-success"}>
            {isPastEvent ? "Past" : "Upcoming"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {event.description}
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{format(eventDate, "EEEE, MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center text-campus-secondary font-medium mt-1">
            <Trophy className="h-4 w-4 mr-2" />
            <span>{event.points} points for attendance</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {isPastEvent ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1" disabled={!isRegistered}>
                <QrCode className="h-4 w-4 mr-2" />
                {isRegistered ? "Show QR Code" : "Event Ended"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Attendance QR Code</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center p-6">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=event-attendance-demo" 
                    alt="QR Code for event attendance" 
                    className="w-48 h-48"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Show this QR code to the event organizer to mark your attendance.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <>
            <Button 
              variant={registered ? "outline" : "default"}
              className={registered ? "" : "bg-campus-primary hover:bg-campus-primary/90 flex-1"}
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : (registered ? "Cancel Registration" : "Register")}
            </Button>
            <Button variant="outline" asChild>
              <a href={`/events/${event.id}`} className="flex-1 text-center">Details</a>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
