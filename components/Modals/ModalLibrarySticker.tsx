import { Sticker } from "@/types";
import React from "react";
import { Modal, View } from "react-native";
import EmojiPicker from "rn-emoji-keyboard";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelectSticker: (item: Sticker) => void;
}

const ModalEmoji = ({ isVisible, onClose, onSelectSticker }: Props) => {
  return (
    <View>
      {/* This modal for Emoji Sticker from library rn-emoji-keyboard */}
      {/* thanks for library rn-emoji-keyboard */}
      <Modal visible={isVisible} animationType="slide" transparent={true}>
        <EmojiPicker
          onEmojiSelected={(item: any): void =>
            onSelectSticker({ type: "emoji", ...item })
          }
          onClose={onClose}
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

export default ModalEmoji;
