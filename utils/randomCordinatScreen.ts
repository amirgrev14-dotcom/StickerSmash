export const generateUniquePosition = (
  imageWidth: number,
  imageHeight: number,
) => {
  const padding = 10;
  const stickerSize = 60;

  const x = Math.random() * (imageWidth - stickerSize) - padding;
  const y = Math.random() * (imageHeight - stickerSize) - padding;
  return { x, y };  60;
};
