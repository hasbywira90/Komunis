/**
 * Types definition for SUSI Community Dashboard.
 */

export type CategoryType = 'ENVIRONMENT' | 'EDUCATION' | 'INFRASTRUCTURE' | 'SOCIAL';

export interface StickyNote {
  id: string;
  category: CategoryType;
  title: string;
  description: string;
  comments: number;
  views: string;
  bgColor: string; // Background hex or CSS classes
  textColor: string;
  tagBg: string;
  tagText: string;
  rotation: number;
  pinColor: string;
  dateCreated?: string;
}

export type PinType = 'warning' | 'park' | 'school' | 'other';

export interface MapPin {
  id: string;
  type: PinType;
  label: string;
  x: number; // Percent from left (0 to 100)
  y: number; // Percent from top (0 to 100)
  description?: string;
}

export interface MatchmakingItem {
  id: string;
  title: string;
  matchPercentage: number;
  matchTerm: string;
  requiredSkill: string;
  category: string;
  members: number;
  joined: boolean;
}

export interface SocialImpactStats {
  activeVolunteers: number;
  skillDonations: number;
  projectsDone: number;
  totalHours: number;
  solutionsSolved: number;
  peopleReached: string;
}

export interface ChartData {
  month: string;
  hours: number;
}
