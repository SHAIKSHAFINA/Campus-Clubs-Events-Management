
import { useState } from "react";
import Navigation from "@/components/Navigation";
import EventCard from "@/components/Events/EventCard";
import { mockEvents, getCurrentUser } from "@/utils/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Search } from "lucide-react";

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = getCurrentUser();
  
  // For demo purposes, assume user is registered for events with IDs e1 and e4
  const registeredEventIds = ["e1", "e4"];
  
  // Split events into upcoming and past
  const today = new Date();
  const upcomingEvents = mockEvents.filter(event => new Date(event.date) >= today);
  const pastEvents = mockEvents.filter(event => new Date(event.date) < today);
  
  // Filter events based on search
  const filteredUpcoming = upcomingEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredPast = pastEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-muted-foreground">
              Browse upcoming and past events from your clubs
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-campus-primary hover:bg-campus-primary/90">
              <Calendar className="mr-2 h-4 w-4" /> Create Event
            </Button>
          </div>
        </div>
        
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="upcoming" className="space-y-8">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="animate-fade-in">
            {filteredUpcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUpcoming.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    isRegistered={registeredEventIds.includes(event.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No upcoming events found</h3>
                <p className="text-muted-foreground mt-2">
                  {searchQuery 
                    ? "Try a different search term or check back later"
                    : "Join more clubs to see their events here"}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="animate-fade-in">
            {filteredPast.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPast.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    isRegistered={registeredEventIds.includes(event.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No past events found</h3>
                <p className="text-muted-foreground mt-2">
                  Events you've attended will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventsPage;
