
import React from "react";
import { Link } from "react-router-dom";
import { Award, Calendar, ChevronDown, Home, LogOut, Menu, Trophy, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/utils/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const user = getCurrentUser();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Trophy className="h-8 w-8 text-campus-primary" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-campus-primary to-campus-secondary bg-clip-text text-transparent">
                CampusClubs
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8 md:items-center">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-campus-primary font-medium flex items-center"
            >
              <Home className="mr-1 h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/clubs"
              className="text-gray-700 hover:text-campus-primary font-medium flex items-center"
            >
              <Award className="mr-1 h-4 w-4" />
              Clubs
            </Link>
            <Link
              to="/events"
              className="text-gray-700 hover:text-campus-primary font-medium flex items-center"
            >
              <Calendar className="mr-1 h-4 w-4" />
              Events
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-1">
                    <p>{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <div className="points-tag mt-1">
                      <Trophy className="h-3 w-3" /> {user.points} Points
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full flex items-center">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/certificates" className="w-full flex items-center">
                    <Award className="mr-2 h-4 w-4" /> Certificates
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-campus-primary hover:bg-gray-100 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg border-t">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-campus-primary hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </div>
            </Link>
            <Link
              to="/clubs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-campus-primary hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Award className="mr-3 h-5 w-5" />
                Clubs
              </div>
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-campus-primary hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Calendar className="mr-3 h-5 w-5" />
                Events
              </div>
            </Link>

            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-3">
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-campus-primary hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <User className="mr-3 h-5 w-5" />
                    Profile
                  </div>
                </Link>
                <Link
                  to="/certificates"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-campus-primary hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Award className="mr-3 h-5 w-5" />
                    Certificates
                  </div>
                </Link>
                <button
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-500 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
