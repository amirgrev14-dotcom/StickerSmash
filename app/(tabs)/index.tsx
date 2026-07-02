// components
import EmojiViewer from "@/components/EmojiViewer";
import ImageViewer from "@/components/ImageViewer";
import EditorBar from "@/components/Options.img/EditorBar";
import SelectPhotoBar from "@/components/Options.img/SelectPhotoBar";
// react-native
import { useEffect, useRef, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// hooks
import { usePickerImg } from "@/hooks/usePickerImg";
import { generateUniquePosition } from "@/utils/randomCordinatScreen";
// types
import type { EmojiSticker, ImageSticker, Sticker } from "@/types";
import type { BarsApp } from "@/types/bars";
// for unique id sticker
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
// for screen shot + save on device
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
// for Platform web
import { StickerModals } from "@/types/modal";
import { captureRef } from "react-native-view-shot";

const placeholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  // for image picker
  const { pickImageAync, selectedImage } = usePickerImg();
  // for image width and height for random coordinates sticker
  const [ImageWidthHeight, setImageWidthHeight] = useState({
    width: 0,
    height: 0,
  });

  // for select action bar or change state bar (editor bar or select photo bar)
  const [showBar, setShowBar] = useState<BarsApp>("selectPhotoBar");

  // for stickers
  const [pickedEmojis, setPickedEmojis] = useState<Sticker[]>([]);
  const [currentUsedModal, setCurrentUsedModal] =
    useState<StickerModals>(undefined);

  // for screen shot + save on device + please get permission use media app
  const imageRef = useRef(null);
  const [permissionResponse, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();

  // ----------------------------------

  // please get permission use media app
  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    if (selectedImage) {
      setShowBar("editorBar");
    }
  }, [selectedImage]);

  // functions for logical
  const onReset = () => {
    setShowBar("selectPhotoBar");
    setPickedEmojis([]);
  };

  const onSaveImageAsync = async () => {
    try {
      if (!permissionResponse?.granted) {
        requestPermission();
      }

      if (Platform.OS === "android" || Platform.OS === "ios") {
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
    usedModalSticker: StickerModals,
  ) => {
    const { x, y } = generateUniquePosition(
      ImageWidthHeight.width,
      ImageWidthHeight.height,
    );

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
      setCurrentUsedModal(usedModalSticker);
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
      setCurrentUsedModal(usedModalSticker);
      return;
    }
  };
  // -------------------------------------------------

  // functions Items component
  const selectBars = (isShowBar: BarsApp = "selectPhotoBar") => {
    // selectPhotoBar

    if (isShowBar === "selectPhotoBar") {
      return (
        <SelectPhotoBar
          onSelectPhoto={() => {
            pickImageAync();
          }}
          defaultPhoto={() => {
            // we not need to add default photo, because we already have default photo in the app
            setShowBar("editorBar");
          }}
        />
      );
    }

    if (isShowBar === "editorBar") {
      return (
        <EditorBar
          onAddSticker={addSticker}
          onSavePhoto={() => onSaveImageAsync()}
          onReset={onReset}
        />
      );
    }

    return null;
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
            imageSource={selectedImage ? selectedImage : placeholderImage}
            selectedImage={selectedImage}
          />

          {/* sticker if ( pickedEmojis && excurrentUsedModalist ) showed */}
          {pickedEmojis && (
            <EmojiViewer
              modalName={currentUsedModal}
              defaultSize={30}
              stickers={pickedEmojis}
            />
          )}
        </View>
      </View>

      {/* buttons options */}
      <View style={style.footerContainer}>{selectBars(showBar)}</View>
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
