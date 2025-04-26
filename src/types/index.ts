
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  college: string;
  department: string;
  year: number;
  role: "student" | "admin" | "clubAdmin";
  joinedClubs: string[];
  achievements: Achievement[];
}

export interface Club {
  id: string;
  name: string;
  description: string;
  category: "technical" | "cultural" | "sports" | "academic" | "social";
  logo: string;
  coverImage?: string;
  memberCount: number;
  adminId: string;
  events: string[];
  isActive: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  clubId: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  points: number;
  attendees: string[];
  qrCode?: string;
  otp?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  dateEarned: string;
  points: number;
  clubId?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  clubId: string;
  title: string;
  dateIssued: string;
  signature: string;
  template: "participation" | "achievement" | "leadership";
}

export interface Attendance {
  userId: string;
  eventId: string;
  timestamp: string;
  method: "qr" | "otp";
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  userAvatar?: string;
  points: number;
  badges: number;
  rank: number;
}
