import React from "react";

// import ListScreenStikers from "./Lists/ListScreenStikers";
import { Sticker } from "@/types";

import { StyleSheet, View } from "react-native";
import CardGlobalEmojis from "./Cards/CardGlobalEmojis";
import CardMainEmojis from "./Cards/CardMainEmojis";

interface Props {
  defaultSize: number;
  modalName?: string;
  stickers: Sticker[];
}

const EmojiViewer = ({ defaultSize, stickers }: Props) => {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      {stickers.map((item: Sticker, index) => {
        return item.type === "image" ? (
          <CardMainEmojis
            key={item.id}
            defaultCordinates={{ x: item.x, y: item.y }}
            defaultSize={defaultSize}
            stickerSource={item.source}
          />
        ) : (
          <CardGlobalEmojis
            key={item.id}
            defaultCordinates={{ x: item.x, y: item.y }}
            defaultSize={defaultSize}
            stickerText={item.emoji}
          />
        );
      })}
    </View>
  );
};

export default EmojiViewer;
