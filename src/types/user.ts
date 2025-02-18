export interface User {
  id: string;
  username: string;
  email: string;
  ecoPoints: number;
  rank: string;
  joinedDate: Date;
  achievements: string[];
  profileImage?: string;
  settings: UserSettings;
  dailyEcoHistory: DailyEcoData[];
  treesPlanted: number;
  lastSync?: Date;
  offlineActions?: Array<{
    id: string;
    type: string;
    payload: any;
    timestamp: Date;
  }>;
}

export interface UserSettings {
  notifications: NotificationSettings;
  security: SecuritySettings;
  privacy: PrivacySettings;
  game: GameSettings;
}

// ... rest of the interfaces from authStore.ts 