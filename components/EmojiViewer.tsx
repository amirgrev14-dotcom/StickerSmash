import React from "react";

// import ListScreenStikers from "./Lists/ListScreenStikers";
import { Sticker } from "@/types";

import { StyleSheet, View } from "react-native";
import StickerCard from "./Cards/Sticker";

interface Props {
  defaultSize: number;
  modalName?: string;
  stickers: Sticker[];
}

const EmojiViewer = ({ defaultSize, stickers }: Props) => {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      {stickers.map((item: Sticker, index) => {
        return (
          <StickerCard
            type={item.type}
            key={item.id}
            defaultCordinates={{ x: item.x, y: item.y }}
            defaultSize={defaultSize}
            stickerValue={item.type === "image" ? item.source : item.emoji}
          />
        );
        //   <CardMainEmojis
        //     key={item.id}
        //     defaultCordinates={{ x: item.x, y: item.y }}
        //     defaultSize={defaultSize}
        //     stickerSource={item.source}
        //   />
        // ) : (
        //   <CardGlobalEmojis
        //     key={item.id}
        //     defaultCordinates={{ x: item.x, y: item.y }}
        //     defaultSize={defaultSize}
        //     stickerText={item.emoji}
        //   />
      })}
    </View>
  );
};

export default EmojiViewer;
