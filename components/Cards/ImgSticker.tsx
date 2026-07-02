import { useGesture } from "@/hooks/useGesture";
import React from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type Props = {
  defaultSize: number;
  defaultCordinates: { x: number; y: number };
  stickerValue: ImageSourcePropType;
};

const ImageSticker = ({
  defaultSize,
  defaultCordinates,
  stickerValue,
}: Props) => {
  const { scaleImage, onDrag, onDoubleTap, translateX, translateY } =
    useGesture(defaultSize, defaultCordinates);

  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const ImageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  return (
    <GestureDetector gesture={onDrag}>
      <Animated.View style={[transformStyle, ImageStyle, styles.container]}>
        <GestureDetector gesture={onDoubleTap}>
          <Animated.Image
            source={stickerValue as ImageSourcePropType}
            resizeMode="contain"
            style={[
              {
                width: "100%",
                height: "100%",
              },
            ]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
};

export default ImageSticker;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
