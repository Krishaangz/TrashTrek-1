import React from 'react';
import { motion, AnimationProps } from 'framer-motion';

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  size = 'md', 
  color = '#D0FD3E' 
}) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <motion.div
      className="flex justify-center items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div 
        className={`${sizeMap[size]} border-4 rounded-full animate-spin`}
        style={{ 
          borderColor: color,
          borderTopColor: 'transparent' 
        }}
      />
    </motion.div>
  );
};

export default LoadingState; 