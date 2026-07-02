import { useGesture } from "@/hooks/useGesture";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type Props = {
  defaultSize: number;
  defaultCordinates: { x: number; y: number };
  stickerValue: string;
};

export default function EmojiSticker({
  defaultSize,
  stickerValue,
  defaultCordinates,
}: Props) {
  const { scaleImage, onDrag, onDoubleTap, translateX, translateY } =
    useGesture(defaultSize, defaultCordinates);

  const TextStyle = useAnimatedStyle(() => {
    return {
      fontSize: withSpring(scaleImage.value),
    };
  });

  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        // { scale: scaleImage.value / },
      ],
    };
  });

  return (
    <GestureDetector gesture={onDrag}>
      <Animated.View style={[transformStyle, { position: "absolute" }]}>
        <GestureDetector gesture={onDoubleTap}>
          <Animated.Text style={[TextStyle]}>{stickerValue}</Animated.Text>
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
