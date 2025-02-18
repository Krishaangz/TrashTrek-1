declare module 'emoji-picker-react' {
  interface EmojiClickData {
    emoji: string;
    names: string[];
    unified: string;
    originalUnified: string;
    activeSkinTone: string;
  }

  interface EmojiPickerProps {
    onEmojiClick: (emojiData: EmojiClickData) => void;
    width?: number;
    height?: number;
    theme?: 'light' | 'dark';
    searchPlaceholder?: string;
    preload?: boolean;
  }

  const EmojiPicker: React.FC<EmojiPickerProps>;
  export default EmojiPicker;
} 