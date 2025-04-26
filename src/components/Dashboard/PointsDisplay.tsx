
import { Trophy, Award, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { User, Achievement } from "@/types";
import { mockUsers } from "@/utils/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tiers = [
  { name: "Bronze", minPoints: 0, maxPoints: 300, color: "bg-amber-600" },
  { name: "Silver", minPoints: 300, maxPoints: 700, color: "bg-slate-400" },
  { name: "Gold", minPoints: 700, maxPoints: 1200, color: "bg-amber-400" },
  { name: "Platinum", minPoints: 1200, maxPoints: 2000, color: "bg-cyan-400" },
  { name: "Diamond", minPoints: 2000, maxPoints: 3000, color: "bg-purple-400" }
];

interface PointsDisplayProps {
  userId: string;
}

const PointsDisplay = ({ userId }: PointsDisplayProps) => {
  // Get user data (in a real app, this would come from your auth context)
  const user = mockUsers.find(u => u.id === userId) || mockUsers[0];
  
  // Calculate user's tier
  const currentTier = tiers.find(tier => 
    user.points >= tier.minPoints && user.points < tier.maxPoints
  ) || tiers[tiers.length - 1];
  
  const nextTier = tiers[tiers.findIndex(t => t.name === currentTier.name) + 1];
  
  // Calculate progress to next tier
  const pointsInCurrentTier = user.points - currentTier.minPoints;
  const currentTierRange = currentTier.maxPoints - currentTier.minPoints;
  const progressPercent = Math.min((pointsInCurrentTier / currentTierRange) * 100, 100);
  
  // Recent achievements (last 3)
  const recentAchievements = [...user.achievements].sort(
    (a, b) => new Date(b.dateEarned).getTime() - new Date(a.dateEarned).getTime()
  ).slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Trophy className="h-12 w-12 text-campus-primary" />
              <div className="ml-4">
                <div className="text-3xl font-bold">{user.points}</div>
                <div className="text-sm text-muted-foreground">total points</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Tier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`h-12 w-12 rounded-full ${currentTier.color} flex items-center justify-center text-white`}>
                <Award className="h-7 w-7" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold">{currentTier.name}</div>
                <div className="text-sm text-muted-foreground">
                  {nextTier 
                    ? `${pointsInCurrentTier} / ${currentTierRange} points to ${nextTier.name}`
                    : "Highest tier reached!"}
                </div>
              </div>
            </div>
            
            {nextTier && (
              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{currentTier.name}</span>
                  <span>{nextTier.name}</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Achievements</CardTitle>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 text-campus-accent" />
              <div className="ml-2 text-xl font-semibold">{user.achievements.length}</div>
              <div className="text-sm text-muted-foreground ml-2">earned so far</div>
            </div>
            
            <div className="space-y-2">
              {recentAchievements.map(achievement => (
                <AchievementItem key={achievement.id} achievement={achievement} />
              ))}
              
              {user.achievements.length > 3 && (
                <div className="text-xs text-center text-muted-foreground pt-2 pb-3">
                  <a href="/profile" className="text-campus-primary hover:underline">
                    View all achievements
                  </a>
                </div>
              )}
              
              {user.achievements.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-4">
                  Participate in events to earn achievements!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AchievementItem = ({ achievement }: { achievement: Achievement }) => {
  return (
    <div className="flex items-center p-2 rounded-md bg-muted/50">
      <div className="flex-shrink-0 w-8 h-8 bg-campus-secondary/10 rounded-full flex items-center justify-center">
        <span role="img" aria-label={achievement.title}>
          {achievement.icon}
        </span>
      </div>
      <div className="ml-3 flex-grow">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-medium">{achievement.title}</h4>
          <Badge variant="outline" className="bg-campus-accent/10 text-campus-accent text-xs ml-1">
            +{achievement.points}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{achievement.description}</p>
      </div>
    </div>
  );
};

export default PointsDisplay;
