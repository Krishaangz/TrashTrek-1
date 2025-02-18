import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles } from 'lucide-react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles';
import { Engine } from '@tsparticles/engine';

interface RankUpOverlayProps {
  show: boolean;
  newRank: string;
  onClose: () => void;
}

const RankUpOverlay: React.FC<RankUpOverlayProps> = ({ show, newRank, onClose }) => {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Particles Background */}
          <Particles
            id="rankUpParticles"
            init={particlesInit}
            options={{
              fullScreen: false,
              background: {
                color: {
                  value: "transparent",
                },
              },
              particles: {
                color: {
                  value: ["#D0FD3E", "#2ECC71", "#ffffff"],
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: true,
                  speed: 3,
                  straight: false,
                },
                number: {
                  value: 50,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
            }}
            className="absolute inset-0"
          />

          {/* Overlay Content */}
          <motion.div
            initial={{ scale: 0.5, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 100 }}
            className="relative bg-gradient-to-br from-[#0A1A2F]/95 to-[#1A2F4F]/95 p-8 rounded-2xl shadow-2xl backdrop-blur-lg border border-[#D0FD3E]/20 max-w-md w-full mx-4"
          >
            {/* Animated Trophy Icon */}
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <Trophy className="w-24 h-24 text-[#D0FD3E]" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#D0FD3E]/20 rounded-full blur-xl"
                />
              </div>
            </motion.div>

            {/* Rank Up Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-[#D0FD3E] mb-2 flex items-center justify-center gap-2">
                <Star className="w-6 h-6" />
                Rank Up!
                <Star className="w-6 h-6" />
              </h2>
              <p className="text-gray-300 mb-4">Congratulations! You've reached</p>
              <div className="relative inline-block">
                <motion.p
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-2xl font-bold bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-transparent bg-clip-text"
                >
                  {newRank}
                </motion.p>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-4"
                >
                  <Sparkles className="w-6 h-6 text-[#D0FD3E] absolute top-0 right-0" />
                </motion.div>
              </div>
            </motion.div>

            {/* Continue Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={onClose}
              className="mt-8 w-full py-3 px-6 bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
            >
              Continue Your Journey
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RankUpOverlay;