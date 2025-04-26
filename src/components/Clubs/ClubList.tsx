
import { useState } from "react";
import { Club } from "@/types";
import { mockClubs, getUserClubs, getCurrentUser } from "@/utils/mockData";
import ClubCard from "./ClubCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const ClubList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const currentUser = getCurrentUser();
  const userClubs = getUserClubs(currentUser.id);
  const userClubIds = userClubs.map(club => club.id);
  
  // Filter clubs based on search and category
  const filteredClubs = mockClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          club.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || club.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Separate joined and available clubs
  const joinedClubs = filteredClubs.filter(club => userClubIds.includes(club.id));
  const availableClubs = filteredClubs.filter(club => !userClubIds.includes(club.id));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Explore Clubs</h2>
        <p className="text-muted-foreground">
          Browse and join clubs that match your interests
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clubs..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="cultural">Cultural</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="social">Social</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Clubs</TabsTrigger>
          <TabsTrigger value="joined" className="flex items-center">
            My Clubs
            {joinedClubs.length > 0 && (
              <span className="ml-1.5 bg-campus-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {joinedClubs.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.length > 0 ? (
              filteredClubs.map(club => (
                <ClubCard 
                  key={club.id} 
                  club={club} 
                  isJoined={userClubIds.includes(club.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No clubs found matching your criteria.</p>
                <button 
                  className="text-campus-primary hover:underline mt-2" 
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="joined" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedClubs.length > 0 ? (
              joinedClubs.map(club => (
                <ClubCard 
                  key={club.id} 
                  club={club} 
                  isJoined={true}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">You haven't joined any clubs yet.</p>
                <button 
                  className="text-campus-primary hover:underline mt-2"
                  onClick={() => document.querySelector('button[value="all"]')?.click()}
                >
                  Browse clubs
                </button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClubList;
