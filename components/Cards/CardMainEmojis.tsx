import { useGesture } from "@/hooks/useGesture";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type Props = {
  defaultSize: number;
  defaultCordinates: { x: number; y: number };
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({
  defaultSize,
  stickerSource,
  defaultCordinates,
}: Props) {
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

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  return (
    <GestureDetector gesture={onDrag}>
      <Animated.View style={[containerStyle]}>
        <GestureDetector gesture={onDoubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[
              StyleSheet.absoluteFillObject,
              imageAnimatedStyle,
              { width: defaultSize, height: defaultSize },
            ]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
