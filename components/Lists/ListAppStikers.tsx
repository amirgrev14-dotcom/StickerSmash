import { stickersData } from "@/assets/stikers";
import { ImageSticker } from "@/types";
import { Image } from "expo-image";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

interface props {
  onEmojiSelected: (stickersSource: ImageSticker) => void;
}

const ListEmoji = ({ onEmojiSelected }: props) => {
  const stickerItem = (item: any, index: number) => (
    <View>
      <Pressable onPress={() => onEmojiSelected(item)}>
        <Image source={item.source} key={index} style={styles.stikerImage} />
      </Pressable>
    </View>
  );

  return (
    <View>
      <FlatList
        data={stickersData}
        renderItem={({ item, index }: any) => stickerItem(item, index)}
        keyExtractor={(item: any) => item.name}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stikerImage: {
    width: 60,
    height: 60,
    marginRight: 20,
  },

  buttonText: {
    marginTop: 10,
    fontFamily: " Bebas Neue",
    fontSize: 20,
    padding: 8,
    backgroundColor: "#493bca",
    borderRadius: 10,
  },
});

export default ListEmoji;
