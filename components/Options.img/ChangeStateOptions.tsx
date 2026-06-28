import React from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import CircleButton from "../Buttons/CircleButton";
import IconButton from "../Buttons/IconButton";

import { Sticker } from "@/types";
import CustomDialog from "../Modals/CustomDialog";
import ModalEmoji from "../Modals/ModalEmoji";

interface Props {
  onReset: () => void;
  onSavePhoto: () => void;
  onAddSticker: (emoji: Sticker, useModalSticker: "main" | "global") => void;
}

const ChangeStateOptions = ({ onReset, onAddSticker, onSavePhoto }: Props) => {
  const [isOpenMainEmoji, setIsOpenMainEmoji] = React.useState(false);
  const [isOpenGlobalEmoji, setIsOpenGlobalEmoji] = React.useState(false);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  // functions for useState ()
  const closeModal = (variant: "Modalglobal" | "Modalmain") => {
    if (variant === "Modalglobal") {
      return setIsOpenGlobalEmoji(false);
    }

    if (variant === "Modalmain") {
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

      <ModalEmoji
        isVisibleGlobal={isOpenGlobalEmoji}
        isVisibleMain={isOpenMainEmoji}
        onClose={closeModal}
        onSelectSticker={(item: Sticker, useModalSticker) => {
          useModalSticker === "global" ? onAddSticker(item, "global") : null;
          useModalSticker === "main" ? onAddSticker(item, "main") : null;
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
