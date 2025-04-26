
import Navigation from "@/components/Navigation";
import ClubList from "@/components/Clubs/ClubList";

const ClubsPage = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Explore Clubs</h1>
          <p className="text-muted-foreground">
            Discover and join clubs that match your interests
          </p>
        </div>
        
        <ClubList />
      </div>
    </div>
  );
};

export default ClubsPage;
