import { useGesture } from "@/hooks/useGesture";
import React from "react";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface Props {
  stickerText: string;
  defaultCordinates: { x: number; y: number };
  defaultSize: number;
}

const CardGlobalEmojis = ({
  stickerText,
  defaultSize,
  defaultCordinates,
}: Props) => {
  const { scaleImage, onDrag, onDoubleTap, translateX, translateY } =
    useGesture(defaultSize, defaultCordinates);

  const containerStyle = useAnimatedStyle(() => {
    return {
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
      <Animated.View style={[containerStyle]}>
        <GestureDetector gesture={onDoubleTap}>
          <Animated.Text style={[emojiStyle]}>{stickerText}</Animated.Text>
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
};

export default CardGlobalEmojis;
