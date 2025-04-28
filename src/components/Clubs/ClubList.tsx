import { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClubs } from "@/utils/mockData";
import { Club } from "@/types";

const ClubList = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    // Fetch clubs data
    const fetchedClubs = getClubs();
    setClubs(fetchedClubs);
    setFilteredClubs(fetchedClubs);
  }, []);

  useEffect(() => {
    // Apply filters when search query or category filter changes
    let results = clubs;
    
    if (searchQuery) {
      results = results.filter(club => 
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (categoryFilter) {
      results = results.filter(club => club.category === categoryFilter);
    }
    
    setFilteredClubs(results);
  }, [searchQuery, categoryFilter, clubs]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category);
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
        return "bg-yellow-100 text-yellow-800";
      case "social":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search clubs..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {categoryFilter ? formatCategoryName(categoryFilter) : "All Categories"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleCategoryFilter(null)}>
              All Categories
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCategoryFilter("technical")}>
              Technical
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCategoryFilter("cultural")}>
              Cultural
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCategoryFilter("sports")}>
              Sports
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCategoryFilter("academic")}>
              Academic
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCategoryFilter("social")}>
              Social
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="grid" className="mb-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">
            Showing {filteredClubs.length} of {clubs.length} clubs
          </div>
        </div>
        
        {/* Grid View */}
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <Card key={club.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div 
                  className="h-32 bg-cover bg-center" 
                  style={{ 
                    backgroundImage: club.coverImage 
                      ? `url(${club.coverImage})` 
                      : "linear-gradient(to right, #4f46e5, #7c3aed)" 
                  }}
                />
                <CardHeader className="pb-2 pt-4 relative">
                  <div className="absolute -top-8 left-4 h-16 w-16 rounded-full bg-white p-1 shadow">
                    <img 
                      src={club.logo} 
                      alt={`${club.name} logo`} 
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-20">
                    <h3 className="font-bold text-lg">{club.name}</h3>
                    <Badge className={`${getCategoryColor(club.category)}`}>
                      {formatCategoryName(club.category)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">
                    {club.description}
                  </p>
                  <div className="flex items-center mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                        />
                      </svg>
                      {club.memberCount} members
                    </div>
                    <div className="flex items-center ml-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      {club.events.length} events
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Club</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* List View */}
        <TabsContent value="list">
          <div className="space-y-4">
            {filteredClubs.map((club) => (
              <Card key={club.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 p-4 flex items-center justify-center">
                    <img 
                      src={club.logo} 
                      alt={`${club.name} logo`} 
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/4 p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{club.name}</h3>
                        <Badge className={`${getCategoryColor(club.category)} mt-1`}>
                          {formatCategoryName(club.category)}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 mr-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                            />
                          </svg>
                          {club.memberCount} members
                        </div>
                        <div className="flex items-center ml-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          {club.events.length} events
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {club.description}
                    </p>
                    <Button>View Club</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {filteredClubs.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No clubs found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filter to find what you're looking for
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter(null);
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClubList;
