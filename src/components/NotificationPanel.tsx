import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';

interface Notification {
  id: string;
  type: 'achievement' | 'leaderboard' | 'points' | 'reminder' | 'rank-up' | 'regular';
  message: string;
  timestamp: Date;
  read: boolean;
}

const NotificationPanel = () => {
  const { user, notifications, syncErrors, clearSyncErrors, retryFailedSync } = useAuthStore();

  // Animation variants
  const notificationVariants = {
    initial: { opacity: 0, y: 50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
  };

  const rankUpVariants = {
    initial: { scale: 0.8, rotate: -10 },
    animate: { 
      scale: [0.8, 1.2, 1],
      rotate: [-10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  const achievementVariants = {
    initial: { scale: 0, rotate: 180 },
    animate: { 
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20 
      }
    }
  };

  // Monitor user state changes for notifications
  useEffect(() => {
    if (user) {
      const rankThresholds = [1000, 750, 500, 250, 100, 50, 20, 10, 1];
      const currentRank = user.ecoPoints;
      
      rankThresholds.forEach(threshold => {
        if (currentRank >= threshold) {
          handleNotification({
            type: 'rank-up',
            message: `Congratulations! You've reached rank ${threshold}!`,
          });
        }
      });

      if (user.treesPlanted && user.treesPlanted > 0) {
        handleNotification({
          type: 'achievement',
          message: `You've planted ${user.treesPlanted} trees! Keep going!`,
        });
      }
    }
  }, [user]);

  const handleNotification = ({ type, message }: Pick<Notification, 'type' | 'message'>) => {
    const { addNotification } = useAuthStore.getState();
    addNotification({ type, message });
  };

  const handleClearNotification = (id: string) => {
    const { removeNotification } = useAuthStore.getState();
    removeNotification(id);
  };

  // Handle sync error retry
  const handleRetrySync = async () => {
    await retryFailedSync();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {/* Show sync errors first */}
        {syncErrors.length > 0 && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={notificationVariants}
            className="mb-2 p-4 rounded-lg shadow-lg bg-red-500 text-white"
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span>Sync Error</span>
                <button 
                  onClick={clearSyncErrors}
                  className="text-white hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <div className="mt-2">
                <button
                  onClick={handleRetrySync}
                  className="bg-white text-red-500 px-3 py-1 rounded-md text-sm"
                >
                  Retry Sync
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            variants={
              notification.type === 'rank-up' ? rankUpVariants :
              notification.type === 'achievement' ? achievementVariants :
              notificationVariants
            }
            initial="initial"
            animate="animate"
            exit="exit"
            className={`
              mb-2 p-4 rounded-lg shadow-lg
              ${getNotificationColor(notification.type)}
              text-white
            `}
            onClick={() => handleClearNotification(notification.id)}
          >
            <NotificationContent notification={notification} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'rank-up': return 'bg-purple-600';
    case 'achievement': return 'bg-yellow-500';
    case 'points': return 'bg-green-500';
    case 'leaderboard': return 'bg-blue-600';
    default: return 'bg-blue-500';
  }
};

const NotificationContent = ({ notification }: { notification: Notification }) => {
  switch (notification.type) {
    case 'rank-up':
      return (
        <motion.div className="flex items-center">
          <span className="text-xl mr-2">🏆</span>
          {notification.message}
        </motion.div>
      );
    case 'achievement':
      return (
        <motion.div className="flex items-center">
          <span className="text-xl mr-2">🌟</span>
          {notification.message}
        </motion.div>
      );
    default:
      return <div>{notification.message}</div>;
  }
};

export default NotificationPanel; 