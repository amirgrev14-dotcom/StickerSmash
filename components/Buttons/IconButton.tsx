import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  // icon
  icon: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
  // button
  label?  : string;
  onPress: () => void;
}

const IconButton = ({
  icon,
  label = "Text",
  size = 18,
  color = "black",
  onPress = () => {},
}: Props) => {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={size} color={color} />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});

export default IconButton;
