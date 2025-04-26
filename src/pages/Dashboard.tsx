
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChevronRight, QrCode, Clock, Trophy } from "lucide-react";
import { getCurrentUser, getUserClubs, getUserEvents } from "@/utils/mockData";
import PointsDisplay from "@/components/Dashboard/PointsDisplay";
import QRScanner from "@/components/Events/QRScanner";
import Leaderboard from "@/components/Dashboard/Leaderboard";
import { format } from "date-fns";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const user = getCurrentUser();
  const userClubs = getUserClubs(user.id);
  const upcomingEvents = getUserEvents(user.id);

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-campus-primary hover:bg-campus-primary/90">
              <QrCode className="mr-2 h-4 w-4" /> Mark Attendance
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <PointsDisplay userId={user.id} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* My Clubs Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 text-campus-primary mr-2" />
                    My Clubs
                  </CardTitle>
                  <CardDescription>
                    Clubs you've joined
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    {userClubs.length > 0 ? (
                      userClubs.slice(0, 3).map((club) => (
                        <div key={club.id} className="flex items-center justify-between p-2 border rounded-md group hover:bg-muted/50">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-campus-primary to-campus-secondary flex items-center justify-center text-white">
                              {club.name.substring(0, 1)}
                            </div>
                            <div className="ml-3">
                              <p className="font-medium text-sm">{club.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {club.memberCount} members
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <p>You haven't joined any clubs yet.</p>
                      </div>
                    )}
                  </div>
                  {userClubs.length > 0 && (
                    <div className="mt-4 text-center">
                      <Button variant="ghost" size="sm" asChild>
                        <a href="/clubs">View all clubs</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Upcoming Events Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 text-campus-primary mr-2" />
                    Upcoming Events
                  </CardTitle>
                  <CardDescription>
                    Events from your clubs
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    {upcomingEvents.length > 0 ? (
                      upcomingEvents.slice(0, 3).map((event) => (
                        <div key={event.id} className="p-2 border rounded-md group hover:bg-muted/50">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm">{event.title}</h4>
                            <span className="text-xs bg-campus-secondary/10 text-campus-secondary px-2 py-0.5 rounded-full">
                              +{event.points} pts
                            </span>
                          </div>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{format(new Date(event.date), "MMM d")} • {event.startTime}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <p>No upcoming events.</p>
                      </div>
                    )}
                  </div>
                  {upcomingEvents.length > 0 && (
                    <div className="mt-4 text-center">
                      <Button variant="ghost" size="sm" asChild>
                        <a href="/events">View all events</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Mini Leaderboard Card */}
              <Leaderboard />
            </div>
          </TabsContent>
          
          <TabsContent value="attendance">
            <div className="max-w-md mx-auto">
              <QRScanner />
            </div>
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <div className="max-w-3xl mx-auto">
              <Leaderboard />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
