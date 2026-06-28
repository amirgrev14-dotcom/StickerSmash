import { FontAwesome } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  // label
  textLabel: string;
  colorLabel?: string;
  // icon
  icon?: ComponentProps<typeof FontAwesome>["name"];
  size?: number;
  iconColor?: string;
  // button
  bgColor?: string;
  borderColor?: string;
  showBorder?: boolean;
  showIconLabel?: boolean;
  onPress?: () => void;
}

const Button = ({
  // label
  textLabel,
  colorLabel = "black",
  // icon
  icon = "picture-o",
  size = 18,
  iconColor = "yellow",
  // button
  borderColor = "#ffd33d",
  bgColor = "",
  showBorder = false,
  showIconLabel = false,
  onPress,
}: Props) => {
  return (
    <View
      style={[
        style.buttonContainer,
        showBorder && style.border,
        showBorder && {
          borderColor: borderColor,
        },
      ]}
    >
      <Pressable
        style={[style.button, { backgroundColor: bgColor }]}
        onPress={onPress}
      >
        {showIconLabel && (
          <FontAwesome
            name={icon}
            size={size}
            color={iconColor}
            style={style.buttonIcon}
          />
        )}
        <Text style={{ color: colorLabel }}>{textLabel}</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },

  button: {
    borderRadius: 10,
    gap: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  buttonLabel: {
    fontSize: 16,
  },

  buttonIcon: {
    paddingRight: 10,
  },

  border: {
    borderWidth: 4,
    borderRadius: 18,
  },
});

export default Button;
