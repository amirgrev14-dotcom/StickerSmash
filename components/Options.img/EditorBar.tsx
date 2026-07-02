import React from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import CircleButton from "../Buttons/CircleButton";
import IconButton from "../Buttons/IconButton";

import type { Sticker } from "@/types";
import type { StickerModals } from "@/types/modal";
import CustomDialog from "../Modals/CustomDialog";
import ModalAppSticker from "../Modals/ModalAppSticker";
import ModalLibrarySticker from "../Modals/ModalLibrarySticker";

interface Props {
  onReset: () => void;
  onSavePhoto: () => void;
  onAddSticker: (emoji: Sticker, usedModalSticker: StickerModals) => void;
}

const ChangeStateOptions = ({ onReset, onAddSticker, onSavePhoto }: Props) => {
  const [isOpenMainEmoji, setIsOpenMainEmoji] = React.useState(false);
  const [isOpenGlobalEmoji, setIsOpenGlobalEmoji] = React.useState(false);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  // functions for useState ()
  const closeModal = (variant: StickerModals) => {
    if (variant === "Modal_library") {
      return setIsOpenGlobalEmoji(false);
    }

    if (variant === "Modal_app") {
      return setIsOpenMainEmoji(false);
    }

    Alert.alert("error SELECT CLOSE MODAL");
    console.log("error SELECT CLOSE MODAL", variant);
  };

  // Alerts
  const alertSelectEmoji = () => {
    if (Platform.OS === "web") {
      setIsOpenDialog(true);
      return;
    }

    if (Platform.OS === "android" || "ios") {
      Alert.alert(
        "Select sticker format",
        "You need to select an model stickers",
        [
          { text: "Libray Sticker", onPress: () => setIsOpenGlobalEmoji(true) },
          { text: "App Sticker", onPress: () => setIsOpenMainEmoji(true) },
        ],
      );
    }
  };

  return (
    <View style={styles.positionCantainer}>
      <View style={styles.container}>
        <View style={styles.IconButton}>
          <IconButton
            icon="refresh"
            label="Reset"
            onPress={onReset}
            size={25}
            color="#fff"
          />
        </View>

        <CircleButton onPress={() => setIsOpenDialog(true)} />

        <View style={styles.IconButton}>
          <IconButton
            icon="save-alt"
            label="Save"
            onPress={onSavePhoto}
            size={25}
            color="#fff"
          />
        </View>
      </View>

      {/* Modal */}

      <CustomDialog
        title="Select sticker format"
        isVisible={isOpenDialog}
        message="You need to select an model stickers"
        button={[
          {
            text: "Libray Sticker",
            onPress: () => {
              setIsOpenDialog(false);
              setIsOpenGlobalEmoji(true);
            },
          },
          {
            text: "App Sticker",
            onPress: () => {
              setIsOpenDialog(false);
              setIsOpenMainEmoji(true);
            },
          },
        ]}
      />

      <ModalAppSticker
        isVisible={isOpenMainEmoji}
        onClose={() => closeModal("Modal_app")}
        onSelectSticker={(item: Sticker) => {
          onAddSticker(item, "Modal_app");
        }}
      />

      <ModalLibrarySticker
        isVisible={isOpenGlobalEmoji}
        onClose={() => closeModal("Modal_library")}
        onSelectSticker={(item: Sticker) => {
          onAddSticker(item, "Modal_library");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  positionCantainer: {
    position: "absolute",
    top: 20,
    bottom: 40,
    width: "100%",
  },

  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  IconButton: {
    paddingTop: 10,
  },
});

export default ChangeStateOptions;
