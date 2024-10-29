import { Image, useWindowDimensions } from "react-native";

export function PlantlyImage({
  size,
  imageUri,
  styles,
}: {
  size?: number;
  imageUri?: string;
  styles?: any;
}) {
  const { width } = useWindowDimensions();

  const imageSize = size || Math.min(width / 1.5, 400);

  return (
    <Image
      source={imageUri ? { uri: imageUri } : require("../assets/plantly.png")}
      style={{
        width: imageSize,
        height: imageSize,
        borderRadius: 6,
        ...styles,
      }}
    />
  );
}
