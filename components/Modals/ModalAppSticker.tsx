import { ImageSticker, Sticker } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import ListAppStikers from "../Lists/ListAppStikers";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelectSticker: (item: Sticker) => void;
}

const ModalAppSticker = ({ isVisible, onClose, onSelectSticker }: Props) => {
  return (
    <View>
      <Modal visible={isVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContent}>
          {/* header modal */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Choose a stiker</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={22} color="#fff" />
            </Pressable>
          </View>

          {/* body modal */}
          <View style={styles.containerStikers}>
            <ListAppStikers
              onEmojiSelected={(item: ImageSticker): void => {
                onSelectSticker(item);
                onClose();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    position: "absolute",
    height: "40%",
    width: "100%",
    bottom: 0,
    backgroundColor: "#262c33",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },

  header: {
    backgroundColor: "#56575a",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  headerTitle: {
    color: "#fff",
  },

  containerStikers: {
    backgroundColor: "#262c33",
    paddingTop: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
  },
});

export default ModalAppSticker;
