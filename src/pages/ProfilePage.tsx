
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Award, Edit, LogOut, Save, Trophy, User } from "lucide-react";
import { getCurrentUser } from "@/utils/mockData";
import { useToast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  const user = getCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    college: user.college,
    department: user.department,
    year: user.year
  });
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  // Sort achievements by newest first
  const sortedAchievements = [...user.achievements].sort(
    (a, b) => new Date(b.dateEarned).getTime() - new Date(a.dateEarned).getTime()
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-lg">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  
                  <div className="mt-4 points-tag">
                    <Trophy className="h-3 w-3" /> {user.points} Points
                  </div>
                  
                  <div className="w-full mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Department</span>
                      <span className="font-medium">{user.department}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Year</span>
                      <span className="font-medium">{user.year}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">College</span>
                      <span className="font-medium">{user.college}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Role</span>
                      <Badge variant="outline" className="bg-campus-primary/10 text-campus-primary">
                        {user.role === "student" ? "Student" : 
                         user.role === "clubAdmin" ? "Club Admin" : "Admin"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="w-full mt-6 pt-6 border-t flex flex-col gap-2">
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/certificates">
                        <Award className="mr-2 h-4 w-4" /> My Certificates
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Clubs Count Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>My Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">{user.joinedClubs.length}</div>
                    <div className="text-sm text-muted-foreground">Clubs Joined</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">{user.achievements.length}</div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Events Attended</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-sm text-muted-foreground">Certificates</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="info" className="space-y-6">
              <TabsList>
                <TabsTrigger value="info">Personal Info</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="activities">Activity Log</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    {!isEditing ? (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={handleSaveProfile}
                      >
                        <Save className="h-4 w-4 mr-2" /> Save
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          disabled={!isEditing}
                          value={profileData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          disabled={!isEditing}
                          value={profileData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input 
                            id="department" 
                            name="department" 
                            disabled={!isEditing}
                            value={profileData.department}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="year">Year</Label>
                          <Input 
                            id="year" 
                            name="year" 
                            type="number" 
                            disabled={!isEditing}
                            value={profileData.year}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="college">College/University</Label>
                        <Input 
                          id="college" 
                          name="college" 
                          disabled={!isEditing}
                          value={profileData.college}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>My Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {sortedAchievements.length > 0 ? (
                      <div className="space-y-4">
                        {sortedAchievements.map((achievement) => (
                          <div key={achievement.id} className="border rounded-lg p-4 flex">
                            <div className="flex-shrink-0 h-12 w-12 bg-campus-secondary/10 rounded-full flex items-center justify-center text-2xl">
                              <span role="img" aria-label={achievement.title}>
                                {achievement.icon}
                              </span>
                            </div>
                            <div className="ml-4 flex-grow">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium">{achievement.title}</h3>
                                <Badge variant="outline" className="bg-campus-accent/10 text-campus-accent">
                                  +{achievement.points} points
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {achievement.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                          <Award className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">No achievements yet</h3>
                        <p className="text-muted-foreground mt-2">
                          Participate in events and activities to earn achievements
                        </p>
                        <Button variant="outline" className="mt-4" asChild>
                          <a href="/events">Browse Events</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activities">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Activity Log</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Sample activity log - in a real app this would come from the backend */}
                      <ActivityLogItem 
                        title="Joined new club"
                        description="You joined the CodeCrafters club"
                        date="2025-04-15"
                        icon={<User className="h-4 w-4" />}
                      />
                      <ActivityLogItem 
                        title="Event registration"
                        description="Registered for Hackathon 2025"
                        date="2025-04-12"
                        icon={<Calendar className="h-4 w-4" />}
                      />
                      <ActivityLogItem 
                        title="Achievement unlocked"
                        description="Earned the 'Tech Enthusiast' badge"
                        date="2025-04-02"
                        icon={<Award className="h-4 w-4" />}
                      />
                      <ActivityLogItem 
                        title="Attendance marked"
                        description="Attended Intro to AI Workshop"
                        date="2025-03-28"
                        icon={<Check className="h-4 w-4" />}
                      />
                      <ActivityLogItem 
                        title="Points earned"
                        description="Earned 50 points for workshop participation"
                        date="2025-03-28"
                        icon={<Trophy className="h-4 w-4" />}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ActivityLogItemProps {
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
}

const ActivityLogItem = ({ title, description, date, icon }: ActivityLogItemProps) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="mt-0.5">
        <div className="bg-campus-primary/10 h-8 w-8 rounded-full flex items-center justify-center text-campus-primary">
          {icon}
        </div>
      </div>
      <div className="flex-grow">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="text-xs text-muted-foreground whitespace-nowrap">
        {new Date(date).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ProfilePage;
