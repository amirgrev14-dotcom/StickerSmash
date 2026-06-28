import { useWindowDimensions, View } from "react-native";

export const resizeButton = (btnItems, styles) => {
  const { width, height } = useWindowDimensions();

  const buttonSize = width * 0.18;

  const buttonCitcle = (btnItems, styles) => {
    const primaryResize = (
      <View
        style={[
          styles,
          {
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize / 2,
          },
        ]}
      >
        {btnItems}
      </View>
    );

    const secondaryResize = (
      <View
        style={[
          styles,
          {
            width: buttonSize,
            height: height * 0.05,
            borderRadius: buttonSize / 2,
          },
        ]}
      >
        {btnItems}
      </View>
    );

    if (width < height) {
      return primaryResize;
    } else {
      return secondaryResize;
    }
  };

  return {
    buttonSize,
    buttonCitcle,
  };
};
