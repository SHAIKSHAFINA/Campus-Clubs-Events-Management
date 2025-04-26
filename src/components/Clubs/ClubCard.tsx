
import { Club } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ClubCardProps {
  club: Club;
  isJoined?: boolean;
}

const ClubCard = ({ club, isJoined = false }: ClubCardProps) => {
  const [joined, setJoined] = useState(isJoined);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleJoinClub = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setJoined(!joined);
      setIsLoading(false);
      
      toast({
        title: joined ? "Left club" : "Joined club",
        description: joined 
          ? `You have successfully left ${club.name}.`
          : `Welcome to ${club.name}! You can now participate in events.`,
        duration: 3000
      });
    }, 500);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-blue-100 text-blue-800";
      case "cultural":
        return "bg-purple-100 text-purple-800";
      case "sports":
        return "bg-green-100 text-green-800";
      case "academic":
        return "bg-amber-100 text-amber-800";
      case "social":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden card-hover">
      <div className="h-32 bg-cover bg-center" style={{ 
        backgroundImage: `url(${club.coverImage || "/placeholder.svg"})` 
      }}/>
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 border-2 border-white -mt-8 bg-white">
              <AvatarImage src={club.logo} alt={club.name} />
              <AvatarFallback>
                {club.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h3 className="font-bold text-lg">{club.name}</h3>
              <div>
                <Badge 
                  variant="outline" 
                  className={`font-normal text-xs ${getCategoryColor(club.category)}`}
                >
                  {club.category.charAt(0).toUpperCase() + club.category.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {club.description}
        </p>
        <div className="flex items-center mt-3 text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          <span>{club.memberCount} members</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button 
          variant={joined ? "outline" : "default"}
          className={joined ? "" : "bg-campus-primary hover:bg-campus-primary/90"}
          onClick={handleJoinClub}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : (joined ? "Leave Club" : "Join Club")}
        </Button>
        <Button 
          variant="outline" 
          asChild
        >
          <Link to={`/clubs/${club.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClubCard;
