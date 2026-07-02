import { Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";



export const useGesture = (defaultSize, defaultCordinates) => {
  const translateX = useSharedValue(defaultCordinates.x);
  const translateY = useSharedValue(defaultCordinates.y);
  const scaleImage = useSharedValue(defaultSize);

  const onDoubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== defaultSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const onDrag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  return {
    translateX,
    translateY,
    scaleImage,
    onDoubleTap,
    onDrag,
  };
};
