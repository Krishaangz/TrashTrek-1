declare module 'framer-motion' {
  export interface AnimatePresenceProps {
    children: React.ReactNode;
    custom?: any;
    initial?: boolean;
    onExitComplete?: () => void;
  }

  export const AnimatePresence: React.FC<AnimatePresenceProps>;
  export const motion: any;
} 