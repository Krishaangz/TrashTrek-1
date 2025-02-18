import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types for all settings
interface NotificationSettings {
  email: boolean;
  push: boolean;
  updates: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  biometricLogin: boolean;
  rememberDevice: boolean;
  autoLogout: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  onlineStatus: boolean;
  activityFeed: boolean;
  friendRequests: boolean;
  dataCollection: boolean;
}

interface GameSettings {
  crossPlatformPlay: boolean;
  autoMatchmaking: boolean;
  voiceChat: boolean;
  pushNotifications: boolean;
  soundEffects: boolean;
  vibration: boolean;
}

interface UserSettings {
  notifications: NotificationSettings;
  security: SecuritySettings;
  privacy: PrivacySettings;
  game: GameSettings;
}

// Define a structure for tracking daily eco points
interface DailyEcoData {
  date: string; // ISO format date string
  ecoPoints: number;
  treesPlanted: number;
  trashCollected: number;
}

interface User {
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
}

interface Notification {
  id: string;
  type: 'achievement' | 'leaderboard' | 'points' | 'reminder' | 'rank-up' | 'regular';
  message: string;
  timestamp: Date;
  read: boolean;
}

interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
}

interface SyncError {
  id: string;
  actionId: string;
  error: string;
  timestamp: Date;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  notifications: Notification[];
  messages: ChatMessage[];
  offlineQueue: QueuedAction[];
  lastSync: Date | null;
  syncErrors: SyncError[];
  setAuth: (isAuth: boolean, user?: User) => void;
  logout: () => void;
  addEcoPoints: (points: number, trashItems?: number) => void;
  updateUser: (userData: Partial<Omit<User, 'id'>>) => Promise<void>;
  updateUserSettings: (settings: Partial<UserSettings>) => Promise<void>;
  getFormattedJoinDate: () => string;
  getDaysActive: () => number;
  getFormattedDaysActive: () => string;
  addNotification: (notification: Pick<Notification, 'type' | 'message'>) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  queueAction: (action: QueuedAction) => void;
  processQueue: () => Promise<void>;
  syncData: () => Promise<void>;
  clearSyncErrors: () => void;
  retryFailedSync: () => Promise<void>;
}

interface QueuedAction {
  id: string;
  type: 'ADD_POINTS' | 'UPDATE_USER' | 'ADD_MESSAGE' | 'ADD_NOTIFICATION';
  payload: unknown;
  timestamp: Date;
  processed: boolean;
}

// Default settings values
const defaultSettings: UserSettings = {
  notifications: {
    email: true,
    push: true,
    updates: true,
  },
  security: {
    twoFactorAuth: false,
    biometricLogin: true,
    rememberDevice: true,
    autoLogout: false,
  },
  privacy: {
    profileVisibility: 'friends',
    onlineStatus: true,
    activityFeed: true,
    friendRequests: true,
    dataCollection: true,
  },
  game: {
    crossPlatformPlay: true,
    autoMatchmaking: true,
    voiceChat: true,
    pushNotifications: true,
    soundEffects: true,
    vibration: true,
  },
};

// Helper functions
const formatJoinDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const calculateDaysActive = (joinDate: Date): number => {
  const now = new Date();
  const joined = new Date(joinDate);
  const diffTime = Math.abs(now.getTime() - joined.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatDaysActive = (days: number): string => {
  if (days === 0) return 'Just joined today!';
  if (days === 1) return '1 day';
  if (days < 30) return `${days} days`;
  const months = Math.floor(days / 30);
  const remainingDays = days % 30;
  if (months === 1) {
    return remainingDays > 0 ? `1 month, ${remainingDays} days` : '1 month';
  }
  return remainingDays > 0 ? `${months} months, ${remainingDays} days` : `${months} months`;
};

// Ranking system
export const calculateRank = (points: number): string => {
  if (points >= 1000000) return 'TrashTrek Grandmaster';
  if (points >= 900000) return 'Master of Restoration';
  if (points >= 800000) return 'Global Eco Leader';
  if (points >= 700000) return 'Earthian Visionary';
  if (points >= 600000) return 'Supreme Savior';
  if (points >= 500000) return 'Zero Waste Hero';
  if (points >= 400000) return 'Nature's Guardian';
  if (points >= 300000) return 'Environmental Titan';
  if (points >= 200000) return 'Eco Pathfinder';
  if (points >= 150000) return 'Earth Trailblazer';
  if (points >= 100000) return 'Climate Crusader';
  if (points >= 75000) return 'Green Sentinel';
  if (points >= 50000) return 'Eco Commander';
  if (points >= 25000) return 'Planet Pioneer';
  if (points >= 10000) return 'Eco Legend';
  if (points >= 5000) return 'Environmental Master';
  if (points >= 2500) return 'Sustainability Champion';
  if (points >= 1000) return 'Green Warrior';
  if (points >= 500) return 'Eco Guardian';
  if (points >= 250) return 'Nature Protector';
  if (points >= 100) return 'Earth Defender';
  return 'Eco Rookie';
};

// Function to get current date in ISO format (YYYY-MM-DD)
const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

const withRetry = async (fn: () => Promise<void>, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await fn();
      return;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
};

// Create store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      notifications: [],
      messages: [],
      offlineQueue: [],
      lastSync: null,
      syncErrors: [],
      
      setAuth: (isAuth, user = null) => {
        // If we're setting a new user, ensure they have the default settings and initialize dailyEcoHistory
        if (user) {
          if (!user.settings) {
            user.settings = defaultSettings;
          }
          
          // Ensure joinedDate is a proper Date object
          if (!(user.joinedDate instanceof Date)) {
            user.joinedDate = new Date(user.joinedDate || new Date());
          }
          
          if (!user.dailyEcoHistory) {
            user.dailyEcoHistory = [{
              date: user.joinedDate.toISOString().split('T')[0],
              ecoPoints: user.ecoPoints || 0,
              treesPlanted: Math.floor((user.ecoPoints || 0) / 100),
              trashCollected: Math.floor((user.ecoPoints || 0) / 10)
            }];
          }
        }
        set({ isAuthenticated: isAuth, user });
      },
      
      logout: () => set({ isAuthenticated: false, user: null }),
      
      addEcoPoints: (points: number, trashItems: number = 0) => {
        try {
          const currentDate = getCurrentDate();
          set((state) => {
            if (!state.user) return state;

            const newPoints = state.user.ecoPoints + points;
            const newRank = calculateRank(newPoints);
            
            // Update daily eco history
            const dailyHistory = [...state.user.dailyEcoHistory];
            const todayIndex = dailyHistory.findIndex(d => d.date === currentDate);
            
            if (todayIndex >= 0) {
              dailyHistory[todayIndex] = {
                ...dailyHistory[todayIndex],
                ecoPoints: dailyHistory[todayIndex].ecoPoints + points,
                trashCollected: dailyHistory[todayIndex].trashCollected + (trashItems || 0)
              };
            } else {
              dailyHistory.push({
                date: currentDate,
                ecoPoints: points,
                treesPlanted: Math.floor(points / 100),
                trashCollected: trashItems || 0
              });
            }

            // Queue for offline sync
            if (!navigator.onLine) {
              get().queueAction({
                id: Date.now().toString(),
                type: 'ADD_POINTS',
                payload: { points, trashItems },
                timestamp: new Date(),
                processed: false
              });
            }

            return {
              user: {
                ...state.user,
                ecoPoints: newPoints,
                rank: newRank,
                dailyEcoHistory: dailyHistory
              }
            };
          });
        } catch (error) {
          console.error('Error adding eco points:', error);
          // Add to sync queue if offline
          if (!navigator.onLine) {
            get().queueAction({
              id: Date.now().toString(),
              type: 'ADD_POINTS',
              payload: { points, trashItems },
              timestamp: new Date(),
              processed: false
            });
          }
        }
      },
      
      updateUser: async (userData: Partial<Omit<User, 'id'>>) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            ...userData,
            joinedDate: userData.joinedDate ? new Date(userData.joinedDate) : state.user.joinedDate
          } : null
        }));
      },
      
      updateUserSettings: async (newSettings) => {
        set((state) => {
          if (!state.user) return state;
          
          return {
            user: {
              ...state.user,
              settings: {
                ...state.user.settings,
                notifications: {
                  ...state.user.settings.notifications,
                  ...(newSettings.notifications || {})
                },
                security: {
                  ...state.user.settings.security,
                  ...(newSettings.security || {})
                },
                privacy: {
                  ...state.user.settings.privacy,
                  ...(newSettings.privacy || {})
                },
                game: {
                  ...state.user.settings.game,
                  ...(newSettings.game || {})
                }
              }
            }
          };
        });
      },

      getFormattedJoinDate: () => {
        const state = get();
        if (!state.user?.joinedDate) return 'N/A';
        return formatJoinDate(state.user.joinedDate);
      },
      
      getDaysActive: () => {
        const state = get();
        if (!state.user?.joinedDate) return 0;
        return calculateDaysActive(state.user.joinedDate);
      },

      getFormattedDaysActive: () => {
        const state = get();
        if (!state.user?.joinedDate) return 'N/A';
        const days = calculateDaysActive(state.user.joinedDate);
        return formatDaysActive(days);
      },

      addNotification: (notification) => {
        const newNotification = {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date(),
          read: false,
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications.slice(0, 49)] // Keep last 50
        }));

        // Queue for sync if offline
        if (!navigator.onLine) {
          get().queueAction({
            id: Date.now().toString(),
            type: 'ADD_NOTIFICATION',
            payload: newNotification,
            timestamp: new Date(),
            processed: false
          });
        }
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        }));
      },

      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      addMessage: (message) => {
        set((state) => ({
          messages: [...state.messages, message]
        }));

        // Queue for sync if offline
        if (!navigator.onLine) {
          get().queueAction({
            id: Date.now().toString(),
            type: 'ADD_MESSAGE',
            payload: message,
            timestamp: new Date(),
            processed: false
          });
        }
      },

      queueAction: (action) => {
        set((state) => ({
          offlineQueue: [...state.offlineQueue, action]
        }));
      },

      processQueue: async () => {
        const state = get();
        if (!navigator.onLine || !state.offlineQueue.length) return;

        const unprocessedActions = state.offlineQueue.filter(action => !action.processed);

        for (const action of unprocessedActions) {
          try {
            await withRetry(async () => {
              switch (action.type) {
                case 'ADD_POINTS':
                  const { points, trashItems } = action.payload as { points: number; trashItems: number };
                  set((state) => ({
                    user: state.user ? {
                      ...state.user,
                      ecoPoints: state.user.ecoPoints + points,
                      rank: calculateRank(state.user.ecoPoints + points)
                    } : null
                  }));
                  break;

                case 'UPDATE_USER':
                  const userData = action.payload as Partial<User>;
                  await get().updateUser(userData);
                  break;

                case 'ADD_MESSAGE':
                  const message = action.payload as ChatMessage;
                  if (!state.messages.some(m => m.id === message.id)) {
                    set((state) => ({
                      messages: [...state.messages, message]
                    }));
                  }
                  break;

                case 'ADD_NOTIFICATION':
                  const notification = action.payload as Notification;
                  if (!state.notifications.some(n => n.id === notification.id)) {
                    set((state) => ({
                      notifications: [notification, ...state.notifications.slice(0, 49)]
                    }));
                  }
                  break;
              }
            });

            set((state) => ({
              offlineQueue: state.offlineQueue.map(qa => 
                qa.id === action.id ? { ...qa, processed: true } : qa
              )
            }));
          } catch (error) {
            // Add to sync errors
            set((state) => ({
              syncErrors: [...state.syncErrors, {
                id: Date.now().toString(),
                actionId: action.id,
                error: error.message,
                timestamp: new Date()
              }]
            }));
          }
        }

        // Cleanup old processed actions
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        set((state) => ({
          offlineQueue: state.offlineQueue.filter(action => 
            !action.processed || action.timestamp > yesterday
          )
        }));
      },

      clearSyncErrors: () => {
        set({ syncErrors: [] });
      },

      retryFailedSync: async () => {
        const state = get();
        const failedActionIds = state.syncErrors.map(error => error.actionId);
        
        // Reset processed status for failed actions
        set((state) => ({
          offlineQueue: state.offlineQueue.map(action => 
            failedActionIds.includes(action.id) ? { ...action, processed: false } : action
          ),
          syncErrors: [] // Clear errors before retry
        }));

        // Retry processing
        await get().processQueue();
      },

      syncData: async () => {
        if (!navigator.onLine) return;

        const state = get();
        try {
          await state.processQueue();
          set({ lastSync: new Date() });
        } catch (error) {
          console.error('Sync failed:', error);
          // Add global sync error
          set((state) => ({
            syncErrors: [...state.syncErrors, {
              id: Date.now().toString(),
              actionId: 'global-sync',
              error: error.message,
              timestamp: new Date()
            }]
          }));
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        notifications: state.notifications,
        messages: state.messages,
        offlineQueue: state.offlineQueue,
        lastSync: state.lastSync,
        syncErrors: state.syncErrors
      })
    }
  )
);

// Add online/offline listeners
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    useAuthStore.getState().syncData();
  });

  window.addEventListener('offline', () => {
    // Optionally notify user they're offline
    useAuthStore.getState().addNotification({
      type: 'regular',
      message: 'You are offline. Changes will be synced when connection is restored.'
    });
  });
}