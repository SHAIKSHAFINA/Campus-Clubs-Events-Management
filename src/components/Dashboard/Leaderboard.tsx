
import { useState } from "react";
import { LeaderboardEntry } from "@/types";
import { mockLeaderboard } from "@/utils/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal } from "lucide-react";

const Leaderboard = () => {
  const [scope, setScope] = useState<"campus" | "club">("campus");

  // In a real app, this would be filtered based on club selection
  const leaderboardData = mockLeaderboard;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="h-5 w-5 text-campus-primary mr-2" />
          Leaderboard
        </CardTitle>
        <CardDescription>Top performers based on points earned</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="campus" onValueChange={(value) => setScope(value as "campus" | "club")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="campus">Campus-wide</TabsTrigger>
            <TabsTrigger value="club">By Club</TabsTrigger>
          </TabsList>
          
          <TabsContent value="campus">
            <LeaderboardTable entries={leaderboardData} />
          </TabsContent>
          
          <TabsContent value="club">
            <div className="mb-4">
              <select 
                className="w-full p-2 rounded-md border border-border"
                defaultValue="all"
              >
                <option value="all">All Clubs</option>
                <option value="c1">TechGeeks</option>
                <option value="c2">Cultural Fusion</option>
                <option value="c3">CodeCrafters</option>
              </select>
            </div>
            <LeaderboardTable entries={leaderboardData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const LeaderboardTable = ({ entries }: { entries: LeaderboardEntry[] }) => {
  // Sort entries by points (descending)
  const sortedEntries = [...entries].sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-4">
      {sortedEntries.map((entry, index) => (
        <LeaderboardRow key={entry.userId} entry={entry} position={index + 1} />
      ))}
    </div>
  );
};

const LeaderboardRow = ({ entry, position }: { entry: LeaderboardEntry; position: number }) => {
  const getPositionStyle = (pos: number) => {
    switch (pos) {
      case 1:
        return "bg-yellow-100 border-yellow-300 text-yellow-700";
      case 2:
        return "bg-gray-100 border-gray-300 text-gray-700";
      case 3:
        return "bg-amber-100 border-amber-300 text-amber-700";
      default:
        return "bg-white border-border text-muted-foreground";
    }
  };

  const getPositionIcon = (pos: number) => {
    switch (pos) {
      case 1:
        return <Medal className="h-4 w-4 text-yellow-500" />;
      case 2:
        return <Medal className="h-4 w-4 text-slate-400" />;
      case 3:
        return <Medal className="h-4 w-4 text-amber-700" />;
      default:
        return <span className="text-xs text-muted-foreground">{pos}</span>;
    }
  };

  return (
    <div className={`flex items-center p-3 rounded-lg border ${getPositionStyle(position)} transition-all hover:translate-x-1`}>
      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3">
        {getPositionIcon(position)}
      </div>
      
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={entry.userAvatar} alt={entry.userName} />
        <AvatarFallback>
          {entry.userName.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="ml-3 flex-grow">
        <div className="font-medium">{entry.userName}</div>
        <div className="text-xs text-muted-foreground">
          {entry.badges} {entry.badges === 1 ? 'badge' : 'badges'} earned
        </div>
      </div>
      
      <div className="points-tag ml-2">
        <Trophy className="h-3 w-3" /> {entry.points}
      </div>
    </div>
  );
};

export default Leaderboard;
