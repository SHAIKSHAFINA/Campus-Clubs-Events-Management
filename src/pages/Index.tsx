
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Calendar, Check, QrCode, Trophy, User } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-campus-primary to-campus-secondary text-white py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to CampusClubs
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Join, participate and grow with student clubs on your campus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-campus-primary hover:bg-white/90">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Club Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline your club activities with our comprehensive features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<User className="h-10 w-10 text-campus-primary" />}
              title="Easy Registration"
              description="Simple one-click registration for clubs that match your interests."
            />
            <FeatureCard 
              icon={<Calendar className="h-10 w-10 text-campus-primary" />}
              title="Event Management"
              description="Create, promote, and manage club events with ease."
            />
            <FeatureCard 
              icon={<QrCode className="h-10 w-10 text-campus-primary" />}
              title="QR Attendance"
              description="Automated attendance tracking using QR codes or OTP verification."
            />
            <FeatureCard 
              icon={<Trophy className="h-10 w-10 text-campus-primary" />}
              title="Points System"
              description="Earn points for participation and achievements in club activities."
            />
            <FeatureCard 
              icon={<Award className="h-10 w-10 text-campus-primary" />}
              title="Certificates"
              description="Generate and share digital certificates for your accomplishments."
            />
            <FeatureCard 
              icon={<Check className="h-10 w-10 text-campus-primary" />}
              title="Progress Tracking"
              description="Track your growth and contributions across different clubs."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Campus Experience?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Join CampusClubs today and be part of a thriving community of student clubs.
          </p>
          <Button asChild size="lg" className="bg-campus-accent hover:bg-campus-accent/90 text-white">
            <Link to="/register">Join Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-campus-accent" />
                <span className="ml-2 text-xl font-bold">CampusClubs</span>
              </div>
              <p className="mt-4 max-w-xs text-gray-400">
                Empowering students through club participation and achievement tracking.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Platform</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                  <li><Link to="/clubs" className="text-gray-400 hover:text-white">Clubs</Link></li>
                  <li><Link to="/events" className="text-gray-400 hover:text-white">Events</Link></li>
                  <li><Link to="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CampusClubs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
