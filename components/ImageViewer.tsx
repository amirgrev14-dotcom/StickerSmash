import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
  imageSource: string;
  selectedImage?: string | null;
};

const ImageViewer = ({ imageSource, selectedImage }: Props) => {
  const uriImage = selectedImage ? { uri: selectedImage } : imageSource;

  return <Image source={uriImage} style={style.photo} />;
};

const style = StyleSheet.create({
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
});

export default ImageViewer;
