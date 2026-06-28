import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export const usePickerImg = () => {
  
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      console.log("Picker image");
    }
  };

  return {
    pickImageAync,
    selectedImage,
  };
};
