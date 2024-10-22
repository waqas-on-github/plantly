import { Image, useWindowDimensions } from "react-native";

export function PlantlyImage({
  size,
  imageUri,
}: {
  size?: number;
  imageUri?: string;
}) {
  const { width } = useWindowDimensions();

  const imageSize = size || Math.min(width / 1.5, 400);
  console.log(imageUri);

  return (
    <Image
      source={imageUri ? { uri: imageUri } : require("../assets/plantly.png")}
      style={{ width: imageSize, height: imageSize, borderRadius: 6 }}
    />
  );
}
