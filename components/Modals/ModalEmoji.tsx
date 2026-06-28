import { ImageSticker, Sticker } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import EmojiPicker from "rn-emoji-keyboard";
import ListAppStikers from "../Lists/ListAppStikers";

interface Props {
  isVisibleGlobal: boolean;
  isVisibleMain: boolean;
  onClose: (variant: "Modalglobal" | "Modalmain") => void;
  onSelectSticker: (item: Sticker, useModalSticker: "main" | "global") => void;
}

const ModalEmoji = ({
  isVisibleMain,
  isVisibleGlobal,
  onClose,
  onSelectSticker,
}: Props) => {
  return (
    <View>
      {/* This Main Emoji */}
      <Modal visible={isVisibleMain} animationType="slide" transparent={true}>
        <View style={styles.modalContent}>
          {/* header modal */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Choose a stiker</Text>
            <Pressable onPress={() => onClose("Modalmain")}>
              <MaterialIcons name="close" size={22} color="#fff" />
            </Pressable>
          </View>

          {/* body modal */}
          <View style={styles.containerStikers}>
            <ListAppStikers
              onEmojiSelected={(item: ImageSticker): void => {
                onSelectSticker(item, "main");
                onClose("Modalmain");
              }}
            />
          </View>
        </View>
      </Modal>

      {/* This Global Emoji from library rn-emoji-keyboard */}
      <Modal visible={isVisibleGlobal} animationType="slide" transparent={true}>
        <EmojiPicker
          onEmojiSelected={(item: any): void =>
            onSelectSticker({ type: "emoji", ...item }, "global")
          }
          onClose={() => onClose("Modalglobal")}
          open={true}
          theme={{
            backdrop: "#16161888",
            knob: "#766dfc",
            container: "#282829",
            header: "#fff",
            skinTonesContainer: "#252427",
            category: {
              icon: "#766dfc",
              iconActive: "#fff",
              container: "#252427",
              containerActive: "#766dfc",
            },
          }}
        />
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

export default ModalEmoji;
