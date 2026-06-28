import { ImageSourcePropType } from "react-native";

interface convasSticker {
  id: string;
  x: number;
  y: number;
}

export interface ImageSticker extends convasSticker {
  type: "image";
  source: ImageSourcePropType;
}

export interface EmojiSticker extends convasSticker {
  type: "emoji";
  emoji: string;
  name: string;
  slug: string;
}

// for library rn-emoji-keyboard
export interface EmojiPickerType {
  emoji: string // Visual representation of emoji
  name: string
  slug: string
  unicode_version: string
  toneEnabled: boolean
  alreadySelected?: boolean
}


export type Sticker = ImageSticker | EmojiSticker;
