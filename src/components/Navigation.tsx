import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Rocket, 
  Brain, 
  Trophy, 
  User, 
  Info
} from 'lucide-react';

interface NavigationProps {
  onClose: () => void;
}

const Navigation = ({ onClose }: NavigationProps) => {
  const location = useLocation();

  const menuItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/deploy', icon: Rocket, label: 'Get Started' },
    { path: '/trivia', icon: Brain, label: 'Trivia' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/about', icon: Info, label: 'About Us' },
  ];

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 left-0 w-64 bg-[#0A1A2F] shadow-lg z-50"
    >
      <div className="p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#D0FD3E]">TrashTrek</h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === path
                  ? 'bg-[#D0FD3E] text-[#0A1A2F]'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Navigation;