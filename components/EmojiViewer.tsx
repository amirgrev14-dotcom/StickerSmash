import React from "react";

// import ListScreenStikers from "./Lists/ListScreenStikers";
import { Sticker } from "@/types";

import { StyleSheet, View } from "react-native";

import ImgSticker from "./Cards/ImgSticker";
import TextSticker from "./Cards/TextSticker";

interface Props {
  defaultSize: number;
  modalName?: string;
  stickers: Sticker[];
}

const EmojiViewer = ({ defaultSize, stickers }: Props) => {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      {stickers.map((item: Sticker, index) => {
        return item.type === "emoji" ? (
          <TextSticker
            key={index}
            defaultSize={defaultSize}
            stickerValue={item.emoji}
            defaultCordinates={{ x: item.x, y: item.y }}
          />
        ) : (
          <ImgSticker
            key={index}
            defaultSize={defaultSize}
            stickerValue={item.source}
            defaultCordinates={{ x: item.x, y: item.y }}
          />
        );
      })}
    </View>
  );
};

export default EmojiViewer;
