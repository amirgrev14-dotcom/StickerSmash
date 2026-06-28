import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  isVisible: boolean;
  // title + message
  title: string;
  message: string;
  // buttons 2
  button?: {
    text: string;
    onPress: () => void;
  }[];
}

const CustomDialog = ({ title, message, button, isVisible }: Props) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.containerButton}>
            {button &&
              button.map((item, index) => {
                return (
                  <View key={index} style={styles.button}>
                    <Pressable key={index} onPress={item.onPress}>
                      <Text style={styles.textButton}>{item.text}</Text>
                    </Pressable>
                  </View>
                );
              })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContent: {
    width: 365,
    padding: 24,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#262c33",
  },

  containerButton: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1b1f24",
    alignItems: "center",
    borderRadius: 5,
    padding: 15,
    marginTop: 25,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 18,
    color: "#666",
    fontWeight: "bold",
    marginBottom: 25,
  },

  message: {
    color: "#666",
    textAlign: "center",
    fontFamily: "Open Sans",
    fontSize: 14,
    marginBottom: 2,
  },

  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#262c33",
  },

  textButton: {
    color: "#ffffffd7",
    fontFamily: "Open Sans",
    fontWeight: "600",
  },
});

export default CustomDialog;
