import { resizeButton } from "@/hooks/useWindowDimesionsButton";
import { MaterialIcons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  // icon
  icon?: ComponentProps<typeof MaterialIcons>["name"];
  size?: number;
  iconColor?: string;
  // button
  bgColor?: string;
  borderColor?: string;
  showBorder?: boolean;
  onPress?: () => void;
}

const CircleButton = ({
  // icon
  icon = "add",
  size = 25,
  iconColor = "#25292e",
  // button
  borderColor = "#ffd33d",
  bgColor = "",
  showBorder = false,
  onPress,
}: Props) => {
  const { buttonSize, buttonCitcle } = resizeButton();

  return (
    // view
    <View
      style={[
        styles.circleButtonContainer,
        true && styles.border,
        true && {
          borderColor: borderColor,
        },
      ]}
    >
      {buttonCitcle(
        <>
          <Pressable style={styles.circleButton} onPress={onPress}>
            <MaterialIcons name={icon} size={size} color={iconColor} />
          </Pressable>
        </>,
        { ...styles },
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  circleButtonContainer: {
    padding: 2,
  },

  border: {
    borderWidth: 3,
    borderRadius: 42,
  },

  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "#fff",
  },
});

export default CircleButton;
