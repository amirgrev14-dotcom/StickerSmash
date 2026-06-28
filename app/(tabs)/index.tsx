// components
import ImageViewer from "@/components/ImageViewer";
// react-native
import { Alert, Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// hooks
import EmojiViewer from "@/components/EmojiViewer";
import ChangeStateOptions from "@/components/Options.img/ChangeStateOptions";
import SelectionActionOptions from "@/components/Options.img/SelectionActionOptions";
import { usePickerImg } from "@/hooks/usePickerImg";
import { EmojiSticker, ImageSticker, Sticker } from "@/types";
import { generateUniquePosition } from "@/utils/randomCordinatScreen";

import { useEffect, useRef, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

// for screen shot + save on device
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

// for Platform web
import { captureRef } from "react-native-view-shot";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  // State + variable
  // for photo
  const { pickImageAync, selectedImage } = usePickerImg();
  const [ImageWidthHeight, setImageWidthHeight] = useState({
    width: 0,
    height: 0,
  });
  const [defaultPhoto, setDefaultPhoto] = useState(PlaceholderImage);

  // for options
  const [showOptions, setShowOptions] = useState<
    "selectAction" | "changeState"
  >("selectAction");

  // for stickers
  const [pickedEmojis, setPickedEmojis] = useState<Sticker[]>([]);
  const [currentUseModal, setCurrentUseModal] = useState("");

  // for screen shot + save on device
  const imageRef = useRef(null);
  const [permissionResponse, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();

  // ----------------------------------

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    if (selectedImage) {
      setShowOptions("changeState");
    }
  }, [selectedImage]);

  // functions for logical
  const onReset = () => {
    setShowOptions("selectAction");
    setPickedEmojis([]);
  };

  const useWebPlatForm = () => {
    // later code
  };

  const onSaveImageAsync = async () => {
    try {
      if (!permissionResponse?.granted) {
        requestPermission();
      }

      if (Platform.OS === "android" || Platform.OS === "ios") {
        console.log("save on device");
        const localUri = await captureRef(imageRef, {
          height: 450,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);

        if (localUri) {
          Alert.alert("Saved");
        }
      }

      if (Platform.OS === "web") {
        const { domToJpeg } = await import("modern-screenshot");
        const dataUrl = await domToJpeg(imageRef.current!, {
          height: 450,
          width: 350,
          quality: 1,
        });

        console.log(dataUrl);

        const link = document.createElement("a");
        link.download = "SmashScreen.jpeg";
        link.href = dataUrl;
        link.click();

        if (dataUrl) {
          alert("Saved");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addSticker = (
    item: ImageSticker | EmojiSticker,
    useModalSticker: "main" | "global",
  ) => {
    console.log("Canvas:", ImageWidthHeight);

    const { x, y } = generateUniquePosition(
      ImageWidthHeight.width,
      ImageWidthHeight.height,
    );
    console.log("Sticker:", { x, y });

    if (ImageWidthHeight.width === 0 || ImageWidthHeight.height === 0) {
      return;
    }

    if (item.type === "image") {
      setPickedEmojis((prev: Sticker[]) => [
        ...prev,
        {
          type: "image",
          id: uuid(),
          source: item.source,
          x,
          y,
        },
      ]);
      setCurrentUseModal(useModalSticker);
      return;
    }

    if (item.type === "emoji") {
      setPickedEmojis((prev: Sticker[]) => [
        ...prev,
        {
          type: "emoji",
          id: uuid(),
          name: item.name,
          emoji: item.emoji,
          slug: item.slug,
          x,
          y,
        },
      ]);
      setCurrentUseModal(useModalSticker);
      return;
    }
  };

  // -------------------------------------------------

  // functions Items component
  const selectOptions = (isShow: string) => {
    return isShow === "changeState" ? (
      <ChangeStateOptions
        onAddSticker={addSticker}
        onSavePhoto={() => onSaveImageAsync()}
        onReset={onReset}
      />
    ) : (
      <SelectionActionOptions
        onSelectPhoto={() => {
          pickImageAync();
        }}
        useDefaultPhoto={() => {
          setDefaultPhoto(PlaceholderImage);
          setShowOptions("changeState");
        }}
      />
    );
  };
  // ------------------------------------------

  return (
    <GestureHandlerRootView style={style.container}>
      {/* photo */}
      <View style={style.photoContainer}>
        <View
          onLayout={(layout) => {
            // width and height for random coordinates sticker
            const { width, height } = layout.nativeEvent.layout;
            setImageWidthHeight({ width, height });
          }}
          ref={imageRef}
          collapsable={false}
          style={[style.canvasImage]}
        >
          <ImageViewer
            imageSource={defaultPhoto}
            selectedImage={selectedImage}
          />

          {/* emoji is show if exist added */}

          {pickedEmojis && (
            <EmojiViewer
              modalName={currentUseModal}
              defaultSize={30}
              stickers={pickedEmojis}
            />
          )}
        </View>
      </View>

      {/* buttons options */}
      <View style={style.footerContainer}>{selectOptions(showOptions)}</View>
    </GestureHandlerRootView>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 25,
    backgroundColor: "#25292e",
    alignItems: "center",
    flex: 1,
  },

  text: {
    color: "#fff",
  },

  button: {
    marginTop: 10,
    fontFamily: " Bebas Neue",
    fontSize: 20,
    padding: 8,
    backgroundColor: "#493bca",
    borderRadius: 10,
  },

  canvasImage: {
    flex: 1,
  },

  photoContainer: {
    flex: 1,
    paddingBottom: "7%",
    aspectRatio: 10 / 12, // или нужное тебе
    position: "relative",
  },

  footerContainer: {
    flex: 1 / 3,
    width: "75%",
    alignItems: "center",
  },
});
