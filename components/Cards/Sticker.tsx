import { useGesture } from "@/hooks/useGesture";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type Props = {
  type: "image" | "emoji";
  defaultSize: number;
  defaultCordinates: { x: number; y: number };
  stickerValue: ImageSourcePropType | string;
};

export default function EmojiSticker({
  defaultSize,
  type,
  stickerValue,
  defaultCordinates,
}: Props) {
  const { scaleImage, onDrag, onDoubleTap, translateX, translateY } =
    useGesture(defaultSize, defaultCordinates);

  const containerStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),

      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const emojiStyle = useAnimatedStyle(() => {
    return {
      fontSize: withSpring(scaleImage.value),
    };
  });

  return (
    <GestureDetector gesture={onDrag}>
      <Animated.View style={[styles.container, containerStyle]}>
        <GestureDetector gesture={onDoubleTap}>
          {type === "image" ? (
            <Animated.Image
              source={stickerValue as ImageSourcePropType}
              resizeMode="contain"
              style={[{ width: "100%", height: "100%" }]}
            />
          ) : (
            <Animated.Text style={[emojiStyle]}>
              {stickerValue as string}
            </Animated.Text>
          )}
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
