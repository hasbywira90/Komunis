import { StickyNote, MapPin, MatchmakingItem, SocialImpactStats, ChartData } from '../types';

export const initialStickyNotes: StickyNote[] = [
  {
    id: 'note-1',
    category: 'ENVIRONMENT',
    title: 'Cikapundung River Cleanup',
    description: 'Join us this Sunday at 7 AM near Teras Cikapundung. Tools provided!',
    comments: 12,
    views: '1.2k',
    bgColor: '#FFEBEE', // Soft light red
    textColor: '#880E4F',
    tagBg: '#FFCDD2',
    tagText: '#B71C1C',
    rotation: 2.2,
    pinColor: '#E53935'
  },
  {
    id: 'note-2',
    category: 'EDUCATION',
    title: 'Free Coding Class',
    description: 'Mentors needed for Python basics workshop near Bandung Creative Hub.',
    comments: 8,
    views: '850',
    bgColor: '#E3F2FD', // Soft light blue
    textColor: '#0D47A1',
    tagBg: '#BBDEFB',
    tagText: '#1565C0',
    rotation: -1.5,
    pinColor: '#1E88E5'
  },
  {
    id: 'note-3',
    category: 'INFRASTRUCTURE',
    title: 'Solar Street Lamps',
    description: "Let's install 10 solar lamps in Cibaduyut alley area. Budget plan ready.",
    comments: 24,
    views: '2.4k',
    bgColor: '#F1F8E9', // Soft light olive green
    textColor: '#33691E',
    tagBg: '#DCEDC8',
    tagText: '#558B2F',
    rotation: 1.8,
    pinColor: '#43A047'
  },
  {
    id: 'note-4',
    category: 'SOCIAL',
    title: 'Soup Kitchen Sunday',
    description: 'Preparing meals for elderly residents around Cicendo. Donations welcome.',
    comments: 15,
    views: '1.1k',
    bgColor: '#FFF3E0', // Soft light orange
    textColor: '#E65100',
    tagBg: '#FFE0B2',
    tagText: '#EF6C00',
    rotation: -2.5,
    pinColor: '#FB8C00'
  }
];

export const initialMapPins: MapPin[] = [
  {
    id: 'pin-1',
    type: 'warning',
    label: 'Cikapundung',
    x: 42,
    y: 28,
    description: 'Cikapundung water levels alert - cleanup and reinforcement teams requested.'
  },
  {
    id: 'pin-2',
    type: 'park',
    label: 'Taman Renew',
    x: 32,
    y: 52,
    description: 'Community park tree planting and eco-benches assembly location near Taman Lansia.'
  },
  {
    id: 'pin-3',
    type: 'school',
    label: 'Kelas BCH',
    x: 65,
    y: 64,
    description: 'Free basic education and technology tutoring for Bandung high-school students.'
  }
];

export const initialMatchmakingItems: MatchmakingItem[] = [
  {
    id: 'match-1',
    title: 'Digital Literacy Bandung',
    matchPercentage: 90,
    matchTerm: 'Matches your skill: Teaching',
    requiredSkill: 'Teaching',
    category: 'EDUCATION',
    members: 65,
    joined: false
  },
  {
    id: 'match-2',
    title: 'Sustainable Urban Gardening',
    matchPercentage: 80,
    matchTerm: 'Matches your focus: Environment & Green Spaces',
    requiredSkill: 'Design',
    category: 'ECO-SYSTEM',
    members: 120,
    joined: false
  },
  {
    id: 'match-3',
    title: 'Visual Identity for Local Cooperatives',
    matchPercentage: 95,
    matchTerm: 'Matches your skill: Design',
    requiredSkill: 'Design',
    category: 'MARKETING',
    members: 14,
    joined: false
  },
  {
    id: 'match-4',
    title: 'Youth Coding Initiative',
    matchPercentage: 85,
    matchTerm: 'Matches your skill: Coding',
    requiredSkill: 'Coding',
    category: 'TECHNOLOGY',
    members: 42,
    joined: false
  },
  {
    id: 'match-5',
    title: 'Civic Legal Awareness Caravan',
    matchPercentage: 75,
    matchTerm: 'Matches your skill: Legal advice',
    requiredSkill: 'Legal',
    category: 'ADVOCACY',
    members: 23,
    joined: false
  },
  {
    id: 'match-6',
    title: 'Micro-Business Strategy Camp',
    matchPercentage: 80,
    matchTerm: 'Matches your skill: Marketing',
    requiredSkill: 'Marketing',
    category: 'BUSINESS',
    members: 31,
    joined: false
  }
];

export const initialSocialStats: SocialImpactStats = {
  activeVolunteers: 8432,
  skillDonations: 1245,
  projectsDone: 450,
  totalHours: 12500,
  solutionsSolved: 320,
  peopleReached: '50k+'
};

export const initialChartData: ChartData[] = [
  { month: 'Jan', hours: 4500 },
  { month: 'Feb', hours: 6700 },
  { month: 'Mar', hours: 5100 },
  { month: 'Apr', hours: 8900 },
  { month: 'May', hours: 7400 },
  { month: 'Jun', hours: 9800 }
];
