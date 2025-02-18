import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Settings, ShoppingBag, Gift, Trees as Tree, Award, Zap, Leaf, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

interface UserStats {
  streak: number;
  ecoPoints: number;
  dailyEcoHistory: Array<{
    date: string;
    points: number;
  }>;
}

// Add proper type for preprocessUserHistoryData
const preprocessUserHistoryData = (user: User | null) => {
  if (!user?.dailyEcoHistory) return [];
  return user.dailyEcoHistory.map(entry => ({
    date: entry.date,
    points: entry.ecoPoints
  }));
};

// Add proper type for rankThresholds
const rankThresholds: Record<string, number> = {
  'Eco Master': 1000,
  'Eco Warrior': 750,
  'Eco Guardian': 500,
  'Eco Protector': 250,
  'Eco Rookie': 0
};

const Profile = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  // Use the formatted date
  const formattedJoinDate = useMemo(() => {
    if (!user) return '';
    if (user.joinedDate) {
      return new Date(user.joinedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    if (user.dailyEcoHistory?.[0]?.date) {
      return new Date(user.dailyEcoHistory[0].date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [user]);

  // Updated statistics using real-time user data
  const statistics = [
    {
      icon: <Award className="text-[#D0FD3E]" size={28} />,
      title: 'Eco Points',
      value: `${user?.ecoPoints || 0}`,
      subtitle: user?.ecoPoints ? `${calculatePercentile(user.ecoPoints)}% of users` : 'Start earning points!',
      description: 'Your environmental impact score'
    },
    {
      icon: <Zap className="text-[#D0FD3E]" size={28} />,
      title: 'Energy Saved',
      value: `${calculateEnergySaved(user?.ecoPoints || 0)} kWh`,
      subtitle: 'This month',
      description: `Equivalent to ${Math.floor(calculateEnergySaved(user?.ecoPoints || 0) / 2)} hours of TV`
    },
    {
      icon: <Leaf className="text-[#D0FD3E]" size={28} />,
      title: 'Carbon Offset',
      value: `${calculateCarbonOffset(user?.ecoPoints || 0)} kg`,
      subtitle: 'This year',
      description: `That's ${Math.floor(calculateCarbonOffset(user?.ecoPoints || 0) / 4)} trees worth!`
    },
    {
      icon: <TrendingUp className="text-[#D0FD3E]" size={28} />,
      title: 'Activity Streak',
      value: `${user?.dailyEcoHistory?.length || 0} days`,
      subtitle: user?.dailyEcoHistory?.length ? 'Keep it going!' : 'Start your streak!',
      description: 'Your current activity streak'
    }
  ];

  function calculatePercentile(points: number): number {
    return Math.min(Math.floor((points / 1000) * 100), 99);
  }

  function calculateEnergySaved(points: number): number {
    return Math.floor(points * 0.1);
  }

  function calculateCarbonOffset(points: number): number {
    return Number((points * 0.05).toFixed(1));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStatIndex((prevIndex) => (prevIndex + 1) % statistics.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [statistics.length]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header with Picture */}
      <div className="flex items-center space-x-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-[#D0FD3E]"
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-2xl font-bold">
              {user?.username?.[0]?.toUpperCase() || '?'}
            </div>
          )}
        </motion.div>
        
        <div>
          <h1 className="text-2xl font-bold">{user?.username}</h1>
          <p className="text-gray-600">Rank: {user?.rank}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Account Settings */}
        <section>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Settings className="text-[#D0FD3E]" size={24} />
              <h2 className="text-xl font-bold">Account Settings</h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <p className="font-medium">Edit Profile</p>
                <p className="text-sm text-gray-400">Update your profile information and avatar</p>
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <p className="font-medium">Privacy Settings</p>
                <p className="text-sm text-gray-400">Manage your privacy preferences and data</p>
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <p className="font-medium">Security Settings</p>
                <p className="text-sm text-gray-400">Update password and security preferences</p>
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <p className="font-medium">Notification Preferences</p>
                <p className="text-sm text-gray-400">Customize your notification settings</p>
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <p className="font-medium">Connected Accounts</p>
                <p className="text-sm text-gray-400">Manage linked social accounts and devices</p>
              </button>
            </div>
          </div>
        </section>

        {/* Right Column with Marketplace and Eco Impact */}
        <div className="space-y-8">
          {/* Marketplace */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <ShoppingBag className="text-[#D0FD3E]" size={24} />
              <h2 className="text-xl font-bold">Marketplace</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/marketplace')}
                className="p-4 border border-white/10 rounded-lg text-center hover:bg-white/5 transition-colors"
              >
                <Gift className="mx-auto text-[#D0FD3E] mb-2" size={24} />
                <p className="font-medium">Gift Cards</p>
                <p className="text-sm text-gray-300">From 500 points</p>
              </button>
              <button
                onClick={() => navigate('/marketplace')}
                className="p-4 border border-white/10 rounded-lg text-center hover:bg-white/5 transition-colors"
              >
                <Tree className="mx-auto text-[#D0FD3E] mb-2" size={24} />
                <p className="font-medium">Plant a Tree</p>
                <p className="text-sm text-gray-300">100 points</p>
              </button>
            </div>
          </div>
          
          {/* Animated Eco Impact Stats */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 relative overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Your Eco Impact</h2>
            
            {/* Main statistic display with animation */}
            <motion.div
              key={activeStatIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="flex items-start space-x-4">
                {statistics[activeStatIndex].icon}
                <div>
                  <h3 className="text-lg font-medium text-[#D0FD3E]">
                    {statistics[activeStatIndex].title}
                  </h3>
                  <p className="text-3xl font-bold mt-1">
                    {statistics[activeStatIndex].value}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {statistics[activeStatIndex].subtitle}
                  </p>
                  <p className="text-gray-300 mt-2">
                    {statistics[activeStatIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Indicator dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {statistics.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStatIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeStatIndex ? 'bg-[#D0FD3E] w-4' : 'bg-white/30'
                  }`}
                  aria-label={`View ${statistics[index].title} statistic`}
                />
              ))}
            </div>
            
            {/* Background pulse animation */}
            <motion.div
              className="absolute inset-0 bg-[#D0FD3E]/5 rounded-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;