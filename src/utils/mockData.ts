
import { User, Club, Event, Achievement, Certificate, LeaderboardEntry } from "../types";

// Sample users
export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    points: 450,
    college: "State University",
    department: "Computer Science",
    year: 3,
    role: "student",
    joinedClubs: ["c1", "c3"],
    achievements: [
      {
        id: "a1",
        title: "First Event",
        description: "Attended your first event",
        icon: "🎯",
        dateEarned: "2025-03-10",
        points: 50,
      },
      {
        id: "a2",
        title: "Tech Enthusiast",
        description: "Attended 5 technical workshops",
        icon: "💻",
        dateEarned: "2025-04-02",
        points: 100,
        clubId: "c1"
      }
    ]
  },
  {
    id: "u2",
    name: "Priya Sharma",
    email: "priya@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    points: 720,
    college: "State University",
    department: "Electrical Engineering",
    year: 2,
    role: "clubAdmin",
    joinedClubs: ["c1", "c2"],
    achievements: [
      {
        id: "a3",
        title: "Event Organizer",
        description: "Successfully organized a club event",
        icon: "🏆",
        dateEarned: "2025-04-01",
        points: 150,
        clubId: "c1"
      }
    ]
  },
  {
    id: "u3",
    name: "David Wilson",
    email: "david@example.com",
    avatar: "https://i.pravatar.cc/150?img=8",
    points: 290,
    college: "State University",
    department: "Mechanical Engineering",
    year: 1,
    role: "student",
    joinedClubs: ["c2"],
    achievements: []
  }
];

// Sample clubs
export const mockClubs: Club[] = [
  {
    id: "c1",
    name: "TechGeeks",
    description: "A club for technology enthusiasts interested in latest tech trends and innovations.",
    category: "technical",
    logo: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1581092921461-eab10d86d6e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    memberCount: 120,
    adminId: "u2",
    events: ["e1", "e2"],
    isActive: true
  },
  {
    id: "c2",
    name: "Cultural Fusion",
    description: "Celebrating diversity through various cultural activities and performances.",
    category: "cultural",
    logo: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    memberCount: 85,
    adminId: "u3",
    events: ["e3"],
    isActive: true
  },
  {
    id: "c3",
    name: "CodeCrafters",
    description: "For passionate programmers who want to improve their coding skills through projects and competitions.",
    category: "technical",
    logo: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    memberCount: 65,
    adminId: "u1",
    events: ["e4"],
    isActive: true
  },
  {
    id: "c4",
    name: "Robotics Club",
    description: "Design, build and program robots for various competitions and research projects.",
    category: "technical",
    logo: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    memberCount: 42,
    adminId: "u2",
    events: [],
    isActive: true
  },
  {
    id: "c5",
    name: "Public Speaking",
    description: "Enhance your oratory skills and become a confident public speaker.",
    category: "academic",
    logo: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    memberCount: 38,
    adminId: "u1",
    events: [],
    isActive: true
  }
];

// Sample events
export const mockEvents: Event[] = [
  {
    id: "e1",
    title: "Intro to AI Workshop",
    description: "Learn the basics of Artificial Intelligence and its applications in modern technology.",
    clubId: "c1",
    date: "2025-05-15",
    startTime: "10:00",
    endTime: "12:00",
    venue: "Tech Lab 101",
    points: 50,
    attendees: ["u1", "u2"],
    qrCode: "event-e1-qr"
  },
  {
    id: "e2",
    title: "Hackathon 2025",
    description: "Annual 24-hour coding competition to solve real-world problems with technology.",
    clubId: "c1",
    date: "2025-05-25",
    startTime: "09:00",
    endTime: "09:00",
    venue: "Engineering Building, Hall 3",
    points: 200,
    attendees: [],
    qrCode: "event-e2-qr"
  },
  {
    id: "e3",
    title: "Cultural Fest Auditions",
    description: "Showcase your talent and get a chance to perform at the annual cultural festival.",
    clubId: "c2",
    date: "2025-05-10",
    startTime: "14:00",
    endTime: "18:00",
    venue: "Auditorium",
    points: 30,
    attendees: ["u3"],
    qrCode: "event-e3-qr"
  },
  {
    id: "e4",
    title: "Competitive Coding Challenge",
    description: "Test your programming skills with challenging problems and compete with peers.",
    clubId: "c3",
    date: "2025-05-20",
    startTime: "16:00",
    endTime: "18:00",
    venue: "Computer Lab 2",
    points: 100,
    attendees: ["u1"],
    qrCode: "event-e4-qr"
  }
];

// Sample certificates
export const mockCertificates: Certificate[] = [
  {
    id: "cert1",
    userId: "u1",
    clubId: "c1",
    title: "Workshop Participation Certificate",
    dateIssued: "2025-04-10",
    signature: "Dr. Smith",
    template: "participation"
  },
  {
    id: "cert2",
    userId: "u2",
    clubId: "c1",
    title: "Club Leadership Certificate",
    dateIssued: "2025-04-15",
    signature: "Prof. Johnson",
    template: "leadership"
  }
];

// Sample leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    userId: "u2",
    userName: "Priya Sharma",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    points: 720,
    badges: 3,
    rank: 1
  },
  {
    userId: "u1",
    userName: "Alex Johnson",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    points: 450,
    badges: 2,
    rank: 2
  },
  {
    userId: "u3",
    userName: "David Wilson",
    userAvatar: "https://i.pravatar.cc/150?img=8",
    points: 290,
    badges: 0,
    rank: 3
  }
];

// Get initial user for demo
export const getCurrentUser = (): User => {
  return mockUsers[0];
};

// Get clubs that user has joined
export const getUserClubs = (userId: string): Club[] => {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) return [];
  return mockClubs.filter(club => user.joinedClubs.includes(club.id));
};

// Get upcoming events for user
export const getUserEvents = (userId: string): Event[] => {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) return [];
  const userClubIds = user.joinedClubs;
  return mockEvents.filter(event => 
    userClubIds.includes(event.clubId) && 
    new Date(event.date) >= new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Get certificates for user
export const getUserCertificates = (userId: string): Certificate[] => {
  return mockCertificates.filter(cert => cert.userId === userId);
};
