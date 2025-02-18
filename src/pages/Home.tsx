import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Trees as Tree, Award, ArrowRight, Star } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Link } from 'react-router-dom';
import { externalArticles } from '../data/articles';
import RankUpOverlay from '../components/RankUpOverlay';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import CountUp from 'react-countup';

const rankThresholds = {
  'TrashTrek Grandmaster': 1000000,
  'Master of Restoration': 900000,
  'Global Eco Leader': 800000,
  'Earthian Visionary': 700000,
  'Supreme Savior': 600000,
  'Zero Waste Hero': 500000,
  'Nature’s Guardian': 400000,
  'Environmental Titan': 300000,
  'Eco Pathfinder': 200000,
  'Earth Trailblazer': 150000,
  'Climate Crusader': 100000,
  'Green Sentinel': 75000,
  'Eco Commander': 50000,
  'Planet Pioneer': 25000,
  'Eco Legend': 10000,
  'Environmental Master': 5000,
  'Sustainability Champion': 2500,
  'Green Warrior': 1000,
  'Eco Guardian': 500,
  'Nature Protector': 250,
  'Earth Defender': 100,
  'Eco Rookie': 0
};

const preprocessUserHistoryData = (user) => {
  if (!user) {
    return [];
  }

  let processedData = [];
  
  if (!user.dailyEcoHistory || user.dailyEcoHistory.length === 0) {
    // If no history exists, use the user's join date as the starting point
    const joinDate = user.joinedDate ? new Date(user.joinedDate) : new Date();
    const today = new Date();
    
    processedData = [{
      date: joinDate.toISOString().split('T')[0],
      dateFormatted: joinDate.toLocaleDateString(),
      points: 0,
      trees: 0,
      trash: 0
    }, {
      date: today.toISOString().split('T')[0],
      dateFormatted: today.toLocaleDateString(),
      points: user.ecoPoints || 0,
      trees: user.treesPlanted || 0,
      trash: user.trashCollected || 0
    }];
  } else {
    const sortedHistory = [...user.dailyEcoHistory].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const joinDate = new Date(user.joinedDate || sortedHistory[0].date);
    const today = new Date();
    const dateRange = [];
    
    for (let d = new Date(joinDate); d <= today; d.setDate(d.getDate() + 1)) {
      dateRange.push(d.toISOString().split('T')[0]);
    }

    let lastPoints = 0;
    let lastTrees = 0;
    let lastTrash = 0;
    
    processedData = dateRange.map(date => {
      const entry = sortedHistory.find(h => h.date === date);
      
      if (entry) {
        lastPoints = entry.ecoPoints;
        lastTrees = entry.treesPlanted;
        lastTrash = entry.trashCollected;
      }
      
      return {
        date: date,
        dateFormatted: new Date(date).toLocaleDateString(),
        points: lastPoints,
        trees: lastTrees,
        trash: lastTrash
      };
    });
  }

  if (processedData.length > 0) {
    const lastEntry = processedData[processedData.length - 1];
    lastEntry.points = user.ecoPoints || lastEntry.points;
    lastEntry.trees = user.treesPlanted || lastEntry.trees;
    lastEntry.trash = user.trashCollected || lastEntry.trash;
  }

  return processedData;
};

const Home = () => {
  const { user } = useAuthStore();
  const [showRankUp, setShowRankUp] = useState(false);
  const [newRank, setNewRank] = useState('');
  const [prevPoints, setPrevPoints] = useState(user?.ecoPoints || 0);
  const [graphData, setGraphData] = useState([]);
  const [globalRank, setGlobalRank] = useState(1234);

  useEffect(() => {
    if (user) {
      const processedData = preprocessUserHistoryData(user);
      setGraphData(processedData);
    }
  }, [user, user?.ecoPoints, user?.treesPlanted, user?.trashCollected]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalRank(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.max(1, prev + change);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user?.ecoPoints && user.ecoPoints > prevPoints) {
      const currentRank = Object.entries(rankThresholds).find(
        ([_, threshold]) => user.ecoPoints >= threshold
      )?.[0];
      
      const previousRank = Object.entries(rankThresholds).find(
        ([_, threshold]) => prevPoints >= threshold
      )?.[0];

      if (currentRank && currentRank !== previousRank) {
        setNewRank(currentRank);
        setShowRankUp(true);
      }
    }
    setPrevPoints(user?.ecoPoints || 0);
  }, [user?.ecoPoints]);

  const currentRankEntry = Object.entries(rankThresholds).find(
    ([_, threshold]) => (user?.ecoPoints || 0) >= threshold
  );

  const nextRankEntry = Object.entries(rankThresholds)
    .reverse()
    .find(([_, threshold]) => (user?.ecoPoints || 0) < threshold);

  const pointsToNextRank = nextRankEntry 
    ? nextRankEntry[1] - (user?.ecoPoints || 0)
    : 0;

  const progressToNextRank = nextRankEntry
    ? ((user?.ecoPoints || 0) - (currentRankEntry?.[1] || 0)) / 
      (nextRankEntry[1] - (currentRankEntry?.[1] || 0)) * 100
    : 100;

  // Get the join date from the first entry in history or user.joinedDate
  const getFormattedJoinDate = () => {
    if (user?.joinedDate) {
      return new Date(user.joinedDate).toLocaleDateString();
    }
    if (user?.dailyEcoHistory?.length > 0) {
      const sortedHistory = [...user.dailyEcoHistory].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      return new Date(sortedHistory[0].date).toLocaleDateString();
    }
    return new Date().toLocaleDateString(); // Fallback to today's date
  };

  const formattedJoinDate = getFormattedJoinDate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <RankUpOverlay 
        show={showRankUp} 
        newRank={newRank} 
        onClose={() => setShowRankUp(false)} 
      />

      {/* Rest of the component remains exactly the same... */}
      {/* Dashboard Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-[#D0FD3E]">Dashboard</h2>
        
        {/* Rank Progress Card */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-[#D0FD3E] flex items-center gap-2">
                <Star className="w-5 h-5" />
                Current Rank
              </h3>
              <p className="text-2xl font-bold text-white mt-1">
                {currentRankEntry?.[0] || 'Eco Rookie'}
              </p>
              <p className="text-sm text-gray-300">
                Member since: {formattedJoinDate}
              </p>
            </div>
            {nextRankEntry && (
              <div className="text-right">
                <p className="text-sm text-gray-300">Next Rank</p>
                <p className="text-lg font-semibold text-[#D0FD3E]">{nextRankEntry[0]}</p>
                <p className="text-sm text-gray-300">
                  {pointsToNextRank} points to go
                </p>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="h-4 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextRank}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] relative"
            >
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white/20"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center space-x-4">
              <Trophy className="text-[#D0FD3E]" size={24} />
              <div>
                <p className="text-sm text-gray-300">Eco Points</p>
                <CountUp
                  end={user?.ecoPoints || 0}
                  duration={2}
                  className="text-2xl font-bold"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center space-x-4">
              <Tree className="text-[#D0FD3E]" size={24} />
              <div>
                <p className="text-sm text-gray-300">Trees Planted</p>
                <CountUp
                  end={user?.treesPlanted || 0}
                  duration={2}
                  className="text-2xl font-bold"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center space-x-4">
              <Award className="text-[#D0FD3E]" size={24} />
              <div>
                <p className="text-sm text-gray-300">Global Rank</p>
                <motion.p
                  key={globalRank}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold"
                >
                  #{globalRank}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Analytics Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Eco Points Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-[#D0FD3E] mb-4">Your Eco-Point Progress</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D0FD3E" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#D0FD3E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="dateFormatted" 
                    stroke="#D0FD3E"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    interval="preserveStartEnd"
                    tickFormatter={(value, index) => {
                      // Show first, last, and some points in between to avoid overcrowding
                      if (index === 0 || index === graphData.length - 1 || index % Math.ceil(graphData.length / 5) === 0) {
                        return value;
                      }
                      return '';
                    }}
                  />
                  <YAxis stroke="#D0FD3E" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10, 26, 47, 0.9)',
                      border: '1px solid rgba(208, 253, 62, 0.2)',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [value, name === 'points' ? 'Eco Points' : name]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="points" 
                    stroke="#D0FD3E" 
                    fillOpacity={1}
                    fill="url(#colorPoints)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Trees Planted Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-[#D0FD3E] mb-4">Your Trees Planted Progress</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="dateFormatted"
                    stroke="#D0FD3E"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    interval="preserveStartEnd" 
                    tickFormatter={(value, index) => {
                      if (index === 0 || index === graphData.length - 1 || index % Math.ceil(graphData.length / 5) === 0) {
                        return value;
                      }
                      return '';
                    }}
                  />
                  <YAxis stroke="#D0FD3E" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10, 26, 47, 0.9)',
                      border: '1px solid rgba(208, 253, 62, 0.2)',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [value, name === 'trees' ? 'Trees Planted' : name]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="trees" 
                    stroke="#2ECC71" 
                    strokeWidth={2}
                    dot={{ fill: '#2ECC71' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Trash Collection Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-[#D0FD3E] mb-4">Your Trash Collection Progress</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
                <defs>
                  <linearGradient id="colorTrash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2ECC71" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="dateFormatted" 
                  stroke="#D0FD3E"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval="preserveStartEnd"
                  tickFormatter={(value, index) => {
                    if (index === 0 || index === graphData.length - 1 || index % Math.ceil(graphData.length / 5) === 0) {
                      return value;
                    }
                    return '';
                  }}
                />
                <YAxis stroke="#D0FD3E" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 26, 47, 0.9)',
                    border: '1px solid rgba(208, 253, 62, 0.2)',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [value, name === 'trash' ? 'Trash Items Collected' : name]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="trash" 
                  stroke="#2ECC71" 
                  fillOpacity={1}
                  fill="url(#colorTrash)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </section>

      {/* Trashpedia Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#D0FD3E]">Trashpedia</h2>
          <Link 
            to="/trashpedia"
            className="text-[#D0FD3E] hover:underline"
          >
            Learn More →
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
          {externalArticles.slice(0, 10).map(article => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[300px] border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-300 line-clamp-3">{article.preview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.keywords.slice(0, 2).map(keyword => (
                  <span 
                    key={keyword}
                    className="px-3 py-1 bg-white/5 rounded-full text-sm"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;