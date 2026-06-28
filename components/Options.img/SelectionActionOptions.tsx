import Button from "@/components/Buttons/Button";
import React from "react";

interface Props {
  onSelectPhoto: () => void;
  useDefaultPhoto: () => void;
}

const SelectionActionOptions = ({ onSelectPhoto, useDefaultPhoto }: Props) => {
  return (
    <>
      {/* choose a photo */}
      <Button
        // label
        textLabel="Choose a photo"
        colorLabel="black"
        // icon
        icon="picture-o"
        iconColor="black"
        // button
        onPress={onSelectPhoto}
        bgColor="white"
        showIconLabel={true}
        showBorder={true}
      />
      {/* use this photo */}
      <Button
        textLabel="Use this photo"
        colorLabel="white"
        onPress={useDefaultPhoto}
      />
    </>
  );
};

export default SelectionActionOptions;
